from flask import Flask, request
import json

app = Flask(__name__)


# http://127.0.0.1:5000/indx
# 请求体 xx=123&yy=456
# http://127.0.0.1:5000/index?xx=123&yy=456  执行index  post
@app.route("/index", methods=["GET", "POST"])
def index():
    age = request.args.get("age")
    pwd = request.args.get("pwd")
    print(age, pwd)

    xx = request.form.get("xx")
    yy = request.form.get("yy")
    print(xx, yy)

    print(request.json)
    return "success"

    # 调用核心算法生成sign签名
    import json

    return json.dumps({"status": True, "data": "success"})
    return json.dumps({"status": False, "data": "fail"})


# http://127.0.0.1:5000/home  执行home
@app.route("/home")
def home():
    return "fail"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
