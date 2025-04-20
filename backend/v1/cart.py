from flask import Blueprint, jsonify, request, make_response
from database.db import db_connection_pool
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from .utils import get_cart_data

cart = Blueprint("v1/cart", __name__)

@cart.route("/update", methods=["POST"])
@jwt_required()
def add_to_cart():
    user_id=get_jwt_identity()
    data=request.get_json()

    # if not all([item_id, category, item_data]) in data:
    #     return jsonify({"message":"Misisng required fields!!"}),400
    if not data or data["category"] not in ["movies", "events", "dining", "attractions"]:
        return jsonify({"message": "Missing required fields!!"}), 400

    # cart_table_exists()
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM cart WHERE user_id=%s", (user_id,))
    cart_row=cursor.fetchone()
    if not cart_row:
        #create empty cart
        empty_cart={
            "movies": [data] if data["category"] == "movies" else [],
            "events": [data] if data["category"] == "events" else [],
            "dining": [data] if data["category"] == "dining" else [],
            "attractions": [data] if data["category"] == "attractions" else []
        }

        cursor.execute("""
                INSERT INTO cart (user_id, movies, events, dining, attractions)           
                VALUES (%s, %s, %s, %s, %s)    
            """,(
                user_id,
                json.dumps(empty_cart["movies"]),
                json.dumps(empty_cart["events"]),
                json.dumps(empty_cart["dining"]),
                json.dumps(empty_cart["attractions"])
                
            ))
    else:
        
        cart_category_data = json.loads(cart_row[data["category"]])
        new_cart_category_data = []
        for item in cart_category_data:
            if item["id"] != data["id"]:
                new_cart_category_data.append(item)
        
        new_cart_category_data.append(data)

        cursor.execute(f"""
            UPDATE cart SET {data["category"]} = %s WHERE user_id = %s
        """, (json.dumps(new_cart_category_data), user_id))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message":"Item added to cart!!"})

@cart.route("/remove", methods=["POST"])
@jwt_required()
def remove_from_cart():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or data["category"] not in ["movies", "events", "dining", "attractions"]:
        return jsonify({"message": "Missing required fields"}), 400

    conn = db_connection_pool.get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM cart WHERE user_id = %s", (user_id,))
    cart_row = cursor.fetchone()

    if not cart_row or not cart_row[data["category"]]:
        return jsonify({"message": "No cart or category data found for user"}), 404

    cart_category_data = json.loads(cart_row[data["category"]])
    new_cart_category_data = []
    for item in cart_category_data:
        if item["id"] != data["id"]:
            new_cart_category_data.append(item)

    cursor.execute(f"""
        UPDATE cart SET {data["category"]} = %s WHERE user_id = %s
    """, (json.dumps(new_cart_category_data), user_id))

    cursor.close()
    conn.close()
    return jsonify({"message": "Item removed from cart"}), 200


@cart.route("/", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()

    cart_data = get_cart_data(user_id)

    if not cart_data:
        return jsonify({"message":"Cart details not found"})
    

    return jsonify(cart_data), 200



    