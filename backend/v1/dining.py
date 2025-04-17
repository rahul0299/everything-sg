from flask import Blueprint, jsonify, request, make_response
# from flask_jwt_extended import (
#     JWTManager,
#     create_access_token,
#     jwt_required,
#     get_jwt,
#     send_from_directory
# )
from database.db import db_connection_pool
import datetime
import string
import random
import json

dining = Blueprint("v1/restaurants", __name__)

@dining.route("/all",methods=["GET"])
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
    # return json.dumps(res_rows), 200

@dining.route("/<int:res_id>", methods=["GET"])
def fetch_restaurant_by_id(res_id):
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * from restaurants WHERE res_id = %s", (res_id,))
    res_row=cursor.fetchone()
    cursor.close()
    conn.close()

    if not res_row:
        return jsonify({"message":"Restaurant not found"}), 404
    res_row["images"]=json.loads(res_row["images"])
    res_row["time_slots"]=json.loads(res_row["time_slots"])
    res_row["tags"]=json.loads(res_row["tags"])


    return jsonify(res_row), 200

# @dining.route("restaurants/<int:res_id>", methods=["PUT"])
# def update_res_by_id(res_id):
#     data=request.get_json()
#     if not data:
#         return jsonify({"message":"No update data provided."}), 400
    
#     allowed_fields = {
#         "name", "location", "operating_hours", "description", "ratings", "images",
#         "time_slots", "tags", "price", "per_slot_seats", "max_per_booking", "featured_flag"
#     }

#     data = {key: val for key, val in data.items() if key in allowed_fields}

#     for key in ["images", "tags", "time_slots"]:
#         if(key in data and isinstance(data[key],list)):
#             data[key]=json.dumps(data[key])
#     # update_fields=[]
#     # values=[]
#     # for key, value in data.items():
#     #     update_fields.append(f"{key}=%s")
#     #     values.append(values)

#     update_fields=[f"{key}=%s" for key in data]
#     values=list(data.values())
#     values.append(res_id)

#     sql=f"UPDATE restaurants SET {', '.join(update_fields)} WHERE res_id=%s"

#     try:
#         conn=db_connection_pool.get_connection()
#         cursor=conn.cursor()
#         cursor.execute(sql,values)
#         conn.commit()

#         if cursor.rowcount==0:
#             return jsonify({"message":"Restaurant not found !!"}), 404
#         return jsonify({"message":"Restaurant updated successfully !!"}), 200
    
#     except Exception as e:
#         return jsonify({"error":str(e)}),500
#     finally:
#         cursor.close()
#         conn.close()
    



    