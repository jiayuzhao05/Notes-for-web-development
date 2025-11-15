from flask import Flask, request, jsonify
import hashlib
import pymysql
import dbutils.pooled_db import PooledDB
import redis

app = Flask(__name__)


redis_conn_params = {
    'host': '127.0.0.1',
    'port': 6379,
    'password': '123456',
    'db': 0
}

@app.route("/task", methods=["POST"])
def task():
    """
    请求数据格式要求 {"ordered_string": "1234567890"}
    """

    ordered_string = request.json.get("ordered_string")
    if not ordered_string:
        return jsonify({"status": False, "data": "ordered_string is required"})
    
    # generate a unique task id
    uid = str(uuid,uuid4())
    # 1.放入队列
    info_dict = {
        'uid': uid,
        'data': ordered_string
    }
    redis_conn_params = {}
    conn = redis.Redis(**REDIS_CONN_PARAMS)
    conn.lpush("test_spider_task_list","123")
    conn.rpush("test_spider_task_list","456")

    data = conn.rpop("test_spider_task_list")
    # 用户返回
    return jsonify({"status": True, "data": uid, 'message': 'task created successfully'})
   
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
