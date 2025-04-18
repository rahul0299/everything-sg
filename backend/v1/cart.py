from flask import Blueprint, jsonify, request, make_response
from database.db import db_connection_pool
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from .utils import get_cart_data

cart = Blueprint("v1/cart", __name__)

CATEGORY_TABLES={
    "movies":"movies",
    "events":"events",
    "dining":"dining",
    "attractions":"attractions"
}


@cart.route("/add", methods=["POST"])
@jwt_required()
def add_to_cart():
    user_id=get_jwt_identity()
    data=request.get_json()
    item_id=data.get("item_id")
    category=data.get("category")
    item_data=data.get("data")

    # if not all([item_id, category, item_data]) in data:
    #     return jsonify({"message":"Misisng required fields!!"}),400
    if not all([item_id, category, item_data]):
        return jsonify({"message": "Missing required fields!!"}), 400

    # cart_table_exists()
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM cart WHERE user_id=%s", (user_id,))
    cart_row=cursor.fetchone()
    if not cart_row:
        #create empty cart
        empty_cart={
            "movies":{},
            "events":{},
            "dining":{},
            "attractions":{}
            
        }
        empty_cart[category][item_id]=item_data
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
        
       

        cart_data = json.loads(cart_row[category]) if cart_row[category] else {}
        cart_data[item_id] = item_data
        cursor.execute(f"""
            UPDATE cart SET {category} = %s WHERE user_id = %s
        """, (json.dumps(cart_data), user_id))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message":"Item added to cart!!"})

@cart.route("/remove", methods=["POST"])
@jwt_required()
def remove_from_cart():
    user_id = get_jwt_identity()
    data = request.get_json()

    item_id = data.get("item_id")
    category = data.get("category")

    if not all([item_id, category]):
        return jsonify({"message": "Missing required fields"}), 400

    conn = db_connection_pool.get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM cart WHERE user_id = %s", (user_id,))
    cart_row = cursor.fetchone()

    if not cart_row or not cart_row[category]:
        return jsonify({"message": "No cart or category data found for user"}), 404

    cart_data = json.loads(cart_row[category])
    if item_id in cart_data:
        del cart_data[item_id]
        cursor.execute(f"""
            UPDATE cart SET {category} = %s WHERE user_id = %s
        """, (json.dumps(cart_data), user_id))
        conn.commit()

    cursor.close()
    conn.close()
    return jsonify({"message": "Item removed from cart"}), 200


@cart.route("/", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()



    cart_data = {}
    cart_data=get_cart_data(user_id)
    if not cart_data:
        return jsonify({"message":"Cart details not found"})
    

    return jsonify(cart_data), 200



    