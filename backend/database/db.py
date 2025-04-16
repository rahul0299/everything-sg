import mysql.connector
from mysql.connector import Error
from mysql.connector.pooling import MySQLConnectionPool


pool=pooling.MySQLConnectionPool(
    pool_name="test_pool",
    pool_size=5,
    pool_reset_session=True,
    hose='localhost',
    user='root',
    database='users',
    port=3306
)

def get_connection():
    
    return pool.get_connection()