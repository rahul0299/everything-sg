import mysql.connector
from mysql.connector import Error


def get_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password ='',
        database='users',
        port=3306

    )