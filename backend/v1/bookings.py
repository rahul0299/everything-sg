from flask import Blueprint, jsonify, request, make_response
from database.db import db_connection_pool
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from .utils import get_cart_data
from datetime import datetime

bookings = Blueprint("v1/bookings", __name__)

@bookings.route("/", methods=["POST"])
@jwt_required()
def insert_booking_from_cart():
    user_id = get_jwt_identity()
    details = get_cart_data(user_id)

    if not details:
        return jsonify({"message": "Cart is empty, cannot create booking"}), 400

    now = datetime.now()
    timestamp_str = now.strftime("%Y-%m-%d %H:%M:%S")

    conn = db_connection_pool.get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO bookings (user_id, details, timestamp)
        VALUES (%s, %s, %s)
    """, (
        user_id,
        json.dumps(details),  #dict to string
        timestamp_str
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Booking created successfully"}), 201 #(new resource create code)
