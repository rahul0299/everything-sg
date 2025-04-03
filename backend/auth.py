from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt
)
from database.db import get_connection
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
    data=request.get_json()
    username=data.get('username')
    email=data.get('email')
    plain_password=data.get('password')
    role=data.get('role','user')

    if not (username and email and plain_password):
        return jsonify({"message":"Missing username or email or password"})

    #check if user already exists
    con=get_connection()
    cursor=con.cursor(dictionary=True)
    cursor.execute("SELECT email FROM users WHERE email =%s",(email,))
    existing=cursor.fetchone()
    if existing:
        return jsonify({"message":"User already registered"}), 400
    
    #hash password
    hashed_password=bcrypt.generate_password_hash(plain_password).decode('utf-8')

    #generate otp and insert into db as unverified

    otp=generate_otp(6)
    cursor.execute("""
        INSERT INTO users(username, email, password, role, is_verified, otp_code)
        VALUES(%s,%s,%s,%s,%s,%s)
    """,(username, email, hashed_password,False, role, otp))
    con.commit()
    cursor.close()
    con.close()
    return jsonify({"message":"Enter OTP for verification","otp_demp":otp}),200

    



@auth.route('/login', methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    plain_password = data.get("password")

    if not email or not plain_password:
        return jsonify({"message": "Missing email or password"}), 400

    conn = get_connection()
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
            identity=email,
            additional_claims={"role": user_record["role"]},
            expires_delta=datetime.timedelta(minutes=15)  # optional override
        )
        return jsonify({
            "message": "Login successful!",
            "access_token": access_token,
            "username": user_record["username"],
            "role": user_record["role"]
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


@auth.route("/verify", methods=["GET"])
def verify():
    data = request.get_json() or {}
    email = data.get("email")
    otp_submitted = data.get("otp")

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    # Fetch user by email
    cursor.execute("SELECT otp, is_verified FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if user["is_verified"]:
        return jsonify({"message": "Already verified"}), 400

    # Check OTP
    if user["otp"] == otp_submitted:
        # Mark verified in DB
        cursor.execute("UPDATE users SET is_verified = 1, otp = NULL WHERE email = %s", (email,))
        conn.commit()
        message = "Verified successfully"
        status = 200
    else:
        message = "Invalid OTP"
        status = 400

    cursor.close()
    conn.close()
    return jsonify({"message": message}), status






