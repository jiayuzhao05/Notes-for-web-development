from flask import Flask, request, jsonify
import hashlib
import pymysql

app = Flask(__name__)


def fetch_one(sql, params):
    import pymysql

    conn = pymysql.connect(
        host="127.0.0.1", port=3306, user="root", password="123456", database="test"
    )
    cursor = conn.cursor()
    cursor.execute(sql, params)
    result = cursor.fetchone()
    cursor.close()
    conn.close()
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
