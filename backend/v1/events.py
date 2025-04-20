from flask import Blueprint, jsonify, request, make_response

from database.db import db_connection_pool
from database.cache import cache

import json

events = Blueprint("v1/events", __name__)

@events.route("/",methods=["GET"])
@cache.cached(timeout=50)
def fetch_all_events():
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM events")
    ev_rows=cursor.fetchall()
    cursor.close()
    conn.close()
    if not ev_rows:
        return jsonify({"message":"No events found !!"}),404
    for r in ev_rows:
        r["images"]=json.loads(r["images"])
        r["time_slots"]=json.loads(r["time_slots"])
        r["tags"]=json.loads(r["tags"])
    return jsonify(ev_rows), 200
    # return json.dumps(res_rows), 200

@events.route("/<int:id>", methods=["GET"])
@cache.cached(timeout=50)
def fetch_event_by_id(id):
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * from events WHERE id = %s", (id,))
    event_row=cursor.fetchone()
    cursor.close()
    conn.close()

    if not event_row:
        return jsonify({"message":"Event not found"}), 404
    event_row["images"]=json.loads(event_row["images"])
    event_row["time_slots"]=json.loads(event_row["time_slots"])
    event_row["tags"]=json.loads(event_row["tags"])


    return jsonify(event_row), 200





    