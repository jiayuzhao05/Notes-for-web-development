from flask import Flask, request, jsonify
import hashlib
import pymysql
import dbutils.pooled_db import PooledDB

app = Flask(__name__)

# 连接池DBUtils
POOL = PooledDB(
    creator=pymysql, 
    maxconnections=5, # 最大连接数 0和none为无限制
    miscached=2, #初始化时链接池至少创建的空闲链接，0为不创建
    maxcached=3, #链接池中最多闲置的链接，0和none为不闲置连接，设置闲置链接数，程序退出后，连接随之关闭
    setsession=[], #开始对话前执行命令列表。如["set datestyle to ...", "set time zone ...", ...]
    ping=0,
    host="127.0.0.1", 
    port=3306, 
    user="root", 
    password="123456", 
    database="test",
    # **settings.MYSQL_CONN_PARAMS #  数据库配置
    host="127.0.0.1", port=3306, user="root", password="123456", database="test"
)

def fetch_one(sql, params):
    import pymysql

    # conn = pymysql.connect(
    #     host="127.0.0.1", port=3306, user="root", password="123456", database="test"
    # )
    conn = POOL.connection() # 从连接池中获取一个连接
    cursor = conn.cursor()
    cursor.execute(sql, params)
    result = cursor.fetchone()
    cursor.close()
    conn.close() # 不是关闭链接，而是将连接放回连接池
    return result


# 基于数据库授权
# 每次执行都需要连接数据库 性能损耗大
# 高效一点的做法是提前先做好五个连接，之后的请求等前面的五个连接用完了继续用下一个连接
@app.route("/bili", methods=["POST"])
def bili():
    """
    请求URL中需要带/bili?
    请求数据格式要求 {"ordered_string": "1234567890"}
    :return:
    """
    # token 是否为空
    token = request.args.get("token")
    if not token:
        return jsonify({"status": False, "data": "token is required"})

    # ordered_string 是否为空 连接mysql查询订单号
    import pymysql

    conn = pymysql.connect(
        host="127.0.0.1", port=3306, user="root", password="123456", database="test"
    )
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM user WHERE token = %s", (token,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    if not result:
        return jsonify({"status": False, "data": "token is not valid"})
    user_id = result[0]
    result = cursor.fetchone()
    if not result:
        return jsonify({"status": False, "data": "token is not valid"})
    user_id = result[0]

    ordered_string = request.args.get("ordered_string")
    if not ordered_string:
        return jsonify({"status": False, "data": "ordered_string is required"})

    # 调用核心算法生成sign签名
    encrypt_string = ordered_string + "560c52ccd288fed045859ed18ffd973"
    obj = hashlib.md5(encrypt_string.encode("utf-8"))
    sign = obj.hexdigest()
    return jsonify({"status": True, "data": sign})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
