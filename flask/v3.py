from flask import Flask, request, jsonify
import hashlib

app = Flask(__name__)


def get_user_dict():
    info_dict = {}
    with open("db.text", mode="r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            token, name = line.split(",")
            info_dict[token] = name
    return info_dict


@app.route("/bili", methods=["POST"])
def bili():
    """
    请求URL中需要带/bili?
    请求数据格式要求 {"ordered_string": "1234567890"}
    :return:
    """

    token = request.args.get("token")
    if not token:
        return jsonify({"status": False, "data": "token is required"})

    user_dict = get_user_dict()
    if token not in user_dict:
        return jsonify({"status": False, "data": "token is not valid"})

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
