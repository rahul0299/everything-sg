from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt
)
import datetime

#mock data

mock_user={
    "username": "test_user_1",
    "email": "test_user_1@example.com",
    "password": "testu1",
    "role":"user",

}

auth = Blueprint('v1/auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data=request.get_json()
    if(data["email"]==mock_user["email"]):
        return jsonify({"message":"User already registered"}), 400
    return jsonify({"message":"User registered successfully"}), 200


@auth.route('/login', methods=["POST"])
def login():
    data=request.get_json()
    if data["email"]==mock_user["email"] and data["password"]==mock_user["password"]:
        access_token = create_access_token(
            identity=mock_user["email"],
            expires_delta=datetime.timedelta(minutes=15),
            additional_claims={"role": mock_user["role"]}
        )

        return jsonify({
            "message":"Login successful !!",
            "access_token":access_token,
            "role":mock_user["role"]
        }), 200
    
    return jsonify({"message":"Invalid credentials"}), 401

@auth.route("/verify", methods=["GET"])
@jwt_required()
def verify():
    jwt_data=get_jwt()
    return jsonify({
        "message":"Token is valid",
        "user_email":jwt_data["sub"],
        "role":jwt_data.get("role","unknown")
    }), 200






