from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.db import db_connection_pool
import json

def get_cart_data(user_id):
    # user_id = get_jwt_identity()

    conn = db_connection_pool.get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM cart WHERE user_id = %s", (user_id,))
    cart_row = cursor.fetchone()
    cursor.close()
    conn.close()

    if not cart_row:
        return jsonify({"message": "Cart is empty"}), 200

    cart_data = {}
    # for category in ["restaurants", "events", "attractions", "dining"]:
    for category in ["movies", "events", "dining", "attractions"]:
        cart_data[category] = json.loads(cart_row[category]) if cart_row[category] else {}

    return cart_data