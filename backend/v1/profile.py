from flask import Blueprint, jsonify, make_response
from database.db import db_connection_pool
import json
from flask_jwt_extended import jwt_required, get_jwt_identity

profile = Blueprint("v1/profile", __name__)

@profile.route("/", methods=["GET"])
@jwt_required()
def send_info_for_profile():
    user_id = get_jwt_identity()

    conn = db_connection_pool.get_connection()
    cursor = conn.cursor(dictionary=True)

    # Fetch user info
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user_record = cursor.fetchone()

    if not user_record:
        cursor.close()
        conn.close()
        return jsonify({"message": "Error fetching profile details"}), 500

    # Fetch user bookings
    cursor.execute("SELECT * FROM bookings WHERE user_id = %s", (user_id,))
    bookings = cursor.fetchall()

    cursor.close()
    conn.close()

    response = make_response(jsonify({
        "profile": {
            "firstname": user_record["firstname"],
            "lastname": user_record["lastname"],
            "email": user_record["email"]
        },
        "bookings": bookings
    }))
    return response
