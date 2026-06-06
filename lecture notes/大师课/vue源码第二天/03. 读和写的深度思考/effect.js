import { TrackOpTypes } from './operations.js';

// 依赖收集
export function track(target, type, key) {
  if (type === TrackOpTypes.ITERATE) {
    console.log(`%c【${type}】`, 'color: #f00');
    return;
  }
  console.log(`%c【${type}】${key}`, 'color: #f00');
}

export function trigger(target, type, key) {
  console.log(`%c【${type}】${key}`, 'color: #00f');
}
