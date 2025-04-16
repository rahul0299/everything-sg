import mysql.connector
from mysql.connector import Error, pooling
from mysql.connector.pooling import MySQLConnectionPool


db_connection_pool=pooling.MySQLConnectionPool(
    pool_name="test_pool",
    pool_size=5,
    pool_reset_session=True,
    host='localhost',
    user='root',
    database='users',
    port=3306
)