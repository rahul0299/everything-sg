from flask import Blueprint, jsonify
from database.db import db_connection_pool
import json

dining = Blueprint("v1/restaurants", __name__)

@dining.route("/",methods=["GET"])
def fetch_all_restaurants():
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM restaurants")
    res_rows=cursor.fetchall()
    cursor.close()
    conn.close()

    if not res_rows:
        return jsonify({"message":"No restaurants found !!"}),404
    
    for r in res_rows:
        r["images"]=json.loads(r["images"])
        r["time_slots"]=json.loads(r["time_slots"])
        r["tags"]=json.loads(r["tags"])

    return jsonify(res_rows), 200

@dining.route("/<int:id>", methods=["GET"])
def fetch_restaurant_by_id(id):
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * from restaurants WHERE id = %s", (id,))
    res_row=cursor.fetchone()
    cursor.close()
    conn.close()

    if not res_row:
        return jsonify({"message":"Restaurant not found"}), 404
    res_row["images"]=json.loads(res_row["images"])
    res_row["time_slots"]=json.loads(res_row["time_slots"])
    res_row["tags"]=json.loads(res_row["tags"])

    return jsonify(res_row), 200