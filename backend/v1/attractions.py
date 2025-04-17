from flask import Blueprint, jsonify, request, make_response

from database.db import db_connection_pool

import json

attractions = Blueprint("v1/attractions", __name__)

@attractions.route("/",methods=["GET"])
def fetch_all_events():
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM attractions")
    att_rows=cursor.fetchall()
    cursor.close()
    conn.close()
    if not att_rows:
        return jsonify({"message":"No attractions found !!"}),404
    for r in att_rows:
        r["images"]=json.loads(r["images"])
        r["time_slots"]=json.loads(r["time_slots"])
        r["tags"]=json.loads(r["tags"])
    return jsonify(att_rows), 200
    # return json.dumps(res_rows), 200

@attractions.route("/<int:id>", methods=["GET"])
def fetch_event_by_id(id):
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * from attractions WHERE id = %s", (id,))
    att_row=cursor.fetchone()
    cursor.close()
    conn.close()

    if not att_row:
        return jsonify({"message":"Event not found"}), 404
    att_row["images"]=json.loads(att_row["images"])
    att_row["time_slots"]=json.loads(att_row["time_slots"])
    att_row["tags"]=json.loads(att_row["tags"])


    return jsonify(att_row), 200





    