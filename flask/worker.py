"""
在队列中获取任务 执行写入到结果队列
"""

import redis
import json
import hashlib


def get_task():
    # redis中获取任务
    REDIS_CONN_PARAMS = {
        "host": "127.0.0.1",
        "port": 6379,
        "password": "123456",
        "db": 0,
        "encoding": "utf-8",
    }
    conn = redis.Redis(**REDIS_CONN_PARAMS)
    data = conn.rpop("test_spider_task_list", timeout=0)
    return data[1].decode("utf-8")  # 得到value字符串


def set_result(tid, value):
    # pass
    REDIS_CONN_PARAMS = {
        "host": "127.0.0.1",
        "port": 6379,
        "password": "123456",
        "db": 0,
        "encoding": "utf-8",
    }
    conn = redis.Redis(**REDIS_CONN_PARAMS)
    conn.hset("spider_result_dict", tid, value)


def run():
    while True:
        # 获取任务
        task_dict = get_task()
        if not task_dict:
            continue
    # 执行耗时操作
    # {"uid": "123", "data": "1234567890"}
    ordered_string = task_dict["data"]
    encrypt_string = ordered_string + "560c52ccd288fed045859ed18ffd973"
    obj = hashlib.md5(encrypt_string.encode("utf-8"))
    sign = obj.hexdigest()

    # 写入结果队列（redis的hash）
    tid = task_dict["uid"]
    set_result(tid, sign)


if __name__ == "__main__":
    run()
