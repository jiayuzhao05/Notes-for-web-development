import { track, trigger } from './effect.js';
import { hasChanged, isObject } from './utils.js';
import { reactive } from './reactive.js';
import { TrackOpTypes, TriggerOpTypes } from './operations.js';

function get(target, key, receiver) {
  // 依赖收集
  track(target, TrackOpTypes.GET, key);
  const result = Reflect.get(target, key, receiver); // 返回对象的相应属性值
  if (isObject(result)) {
    return reactive(result);
  }
  return result;
}

function set(target, key, value, receiver) {
  const type = target.hasOwnProperty(key)
    ? TriggerOpTypes.SET
    : TriggerOpTypes.ADD;
  const oldValue = target[key];
  const result = Reflect.set(target, key, value, receiver);
  if (!result) {
    return result;
  }
  // 派发更新
  if (hasChanged(oldValue, value) || type === TriggerOpTypes.ADD) {
    trigger(target, type, key);
  }
  return result; // 设置对象的相应属性值
}

function deleteProperty(target, key) {
  const hadKey = target.hasOwnProperty(key);
  const result = Reflect.deleteProperty(target, key); // 删除对象的相应属性值
  if (hadKey && result) {
    trigger(target, TriggerOpTypes.DELETE, key);
  }
  return result;
}

function has(target, key) {
  // 依赖收集
  track(target, TrackOpTypes.HAS, key);
  return Reflect.has(target, key); // 判断对象是否有相应属性值
}

function ownKeys(target) {
  // 依赖收集
  track(target, TrackOpTypes.ITERATE);
  return Reflect.ownKeys(target); // 返回对象的所有属性名
}

export const handlers = {
  get,
  set,
  has,
  ownKeys,
  deleteProperty,
};
