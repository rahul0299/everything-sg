from flask import Blueprint, jsonify, request, make_response
from database.db import db_connection_pool
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from .utils import get_cart_data
from datetime import datetime

checkout = Blueprint("v1/checkout", __name__)



@checkout.route("/", methods=["POST"])
@jwt_required()
def checkout_and_book():
    user_id = get_jwt_identity()
    data = request.get_json() or {}

    payment_status = data.get("status")
    if payment_status != "success":
        return jsonify({"message": "Payment failed or cancelled."}), 402

    cart_data = get_cart_data(user_id)
    if not cart_data:
        return jsonify({"message": "Cart is empty. Cannot checkout."}), 400

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = db_connection_pool.get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO bookings (user_id, details, timestamp, payment_status)
        VALUES (%s, %s, %s, %s)
    """, (
        user_id,
        json.dumps(cart_data),
        now,
        payment_status  
    ))

    # Clear the cart
    cursor.execute("""
        UPDATE cart
        SET movies = %s, events = %s, dining = %s, attractions = %s
        WHERE user_id = %s
    """, (json.dumps({}), json.dumps({}), json.dumps({}), json.dumps({}), user_id))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Payment confirmed. Booking successful!"}), 200
