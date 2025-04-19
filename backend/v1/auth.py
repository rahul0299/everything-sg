from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt
)
from database.db import db_connection_pool
from flask_bcrypt import Bcrypt
import datetime
import string
import random

#mock data

# mock_user={
#     "username": "test_user_1",
#     "email": "test_user_1@example.com",
#     "password": "testu1",
#     "role":"user",

# }

auth = Blueprint('v1/auth', __name__)

bcrypt=Bcrypt()

def generate_otp(length=6):
    digits=string.digits
    return ''.join(random.choice(digits) for _ in range(length))


@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    firstname = data.get('firstname')
    lastname=data.get('lastname')
    email = data.get('email')
    plain_password = data.get('password')
    role = data.get('role', 'user')

    if not (firstname and email and plain_password):
        return jsonify({"message": "Missing name or email or password"}), 400

    conn = db_connection_pool.get_connection()
    cursor = conn.cursor(dictionary=True)

    # Check if user email already in DB
    cursor.execute("SELECT email, is_verified FROM users WHERE email = %s", (email,))
    existing = cursor.fetchone()

    if existing:
        # User found in DB. Check if verified or not
        if existing["is_verified"]:
            # Already verified
            cursor.close()
            conn.close()
            return jsonify({"message": "User already registered and verified"}), 400
        else:
            # User is in DB but not verified -> re-trigger OTP
            new_otp = generate_otp(6)
            # re-hash password 
            hashed_password = bcrypt.generate_password_hash(plain_password).decode('utf-8')

            cursor.execute("""
                UPDATE users
                SET password_hash = %s,
                    otp_code = %s
                WHERE email = %s
            """, (hashed_password, new_otp, email))
            conn.commit()

            cursor.close()
            conn.close()

            return jsonify({
                "message": "User already registered but not verified. New OTP sent.",
                "otp_demo": new_otp
            }), 200
    else:
        # No existing record -> create new user
        hashed_password = bcrypt.generate_password_hash(plain_password).decode('utf-8')
        otp_code = generate_otp(6)

        insert_query = """
            INSERT INTO users (firstname, lastname, email, password_hash, role, is_verified)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (firstname, lastname, email, hashed_password, role, False))
        conn.commit()

        cursor.close()
        conn.close()

        # Return OTP for demo
        return jsonify({
            "message": "User registered. Please verify with OTP.",
            "otp_demo": otp_code
        }), 200

    



@auth.route('/login', methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    plain_password = data.get("password")

    if not email or not plain_password:
        return jsonify({"message": "Missing email or password"}), 400

    conn = db_connection_pool.get_connection()
    cursor = conn.cursor(dictionary=True)

    # Fetch user record
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user_record = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user_record:
        return jsonify({"message": "User not found"}), 404

    # Check if verified
    if not user_record["is_verified"]:
        return jsonify({"message": "User not verified. Please verify OTP first."}), 403

    # Check password
    if bcrypt.check_password_hash(user_record["password_hash"], plain_password):
        # Create JWT
        access_token = create_access_token(
            identity=user_record["id"],
            additional_claims={
                "firstname":user_record["firstname"],
                "lastname":user_record["lastname"],
                "role": user_record["role"]
                               
            },
            expires_delta=datetime.timedelta(minutes=15)  # optional override
        )
        #already handled in registeration
        # return jsonify({
        #     "message": "Login successful!",
        #     "access_token": access_token,
        #     "username": user_record["username"],
        #     "role": user_record["role"]
        # }), 200
        response=make_response(jsonify({
            "message":"Login Successful!!",
            "firstname":user_record["firstname"],
            "lastname":user_record["lastname"],
            "role":user_record["role"]

        }))
        response.set_cookie(
            "access_token_cookie",access_token,
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=15*60
        )

        return response

    else:
        return jsonify({"message": "Invalid credentials"}), 401


@auth.route("/verify", methods=["POST"])
def verify():
    data = request.get_json() or {}
    email = data.get("email")
    otp_submitted = data.get("otp_code")

    conn = db_connection_pool.get_connection()
    cursor = conn.cursor(dictionary=True)
    # Fetch user by email
    # cursor.execute("SELECT otp_code, is_verified FROM users WHERE email = %s", (email,))
    cursor.execute("""
        SELECT id, firstname, lastname, role, otp_code, is_verified
        FROM users
        WHERE email = %s
    """, (email,))

    user = cursor.fetchone()

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    if not otp_submitted:
        return jsonify({"message": "OTP code is required"}), 400

    if user["otp_code"] is None:
        return jsonify({"message": "No OTP was issued. Please request again."}), 400

   
    # Check OTP
    if user["otp_code"] == otp_submitted:
        # Mark verified in DB
        cursor.execute("UPDATE users SET is_verified = 1, otp_code = NULL WHERE email = %s", (email,))
        conn.commit()
        # message = "Verified successfully"
        # status = 200
        access_token=create_access_token(
            identity=user["id"],
            additional_claims={
                "firstname":user["firstname"],
                "lastname":user["lastname"],                
                "role":user["role"]},
            expires_delta=datetime.timedelta(minutes=15)
        )
        response=make_response(jsonify({
            "message":"Verified Successfully !!",
            
        }))

        response.set_cookie(
            "access_token_cookie", access_token,
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=15*60
        )

        cursor.close()
        conn.close()
        return response

    else:
        cursor.close()
        conn.close()
        return jsonify({"message":"Invalid Otp"}), 400






