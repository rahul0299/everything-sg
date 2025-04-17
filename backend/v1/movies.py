from flask import Blueprint, jsonify, request, make_response
from database.db import db_connection_pool
import json

movies = Blueprint("v1/movies", __name__)

@movies.route("/",methods=["GET"])
def fetch_all_movies():
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM movies")
    res_rows=cursor.fetchall()
    cursor.close()
    conn.close()
    
    if not res_rows:
        return jsonify({"message":"No movies found !!"}), 404
    
    for r in res_rows:
        r["show_timings"]=json.loads(r["show_timings"])
        r["available_languages"]=json.loads(r["available_languages"])
        r["genres"]=json.loads(r["genres"])

    return jsonify(res_rows), 200

@movies.route("/<int:id>", methods=["GET"])
def fetch_restaurant_by_id(id):
    conn=db_connection_pool.get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * from movies WHERE id = %s", (id,))
    res_row=cursor.fetchone()
    cursor.close()
    conn.close()

    if not res_row:
        return jsonify({"message":"Restaurant not found"}), 404
    
    res_row["show_timings"]=json.loads(res_row["show_timings"])
    res_row["available_languages"]=json.loads(res_row["available_languages"])
    res_row["genres"]=json.loads(res_row["genres"])

    return jsonify(res_row), 200