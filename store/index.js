// 全局状态管理
class Store {
  constructor(initData) {
    // 全局state
    this.state = {
      ...initData,
    };
    // 监听store的回掉函数集合
    this.callbackSet = new Set();
  }
  set(key, value) {
    this.state = {
      ...this.state,
      [key]: value,
    };
    this.callbackSet.forEach((cb) => cb(this.state));
  }
  get(key) {
    return this.state[key];
  }
  observe(cb) {
    cb(this.state);
    this.callbackSet.add(cb);
    return () => {
      this.callbackSet.delete(cb);
    };
  }
}

export default Store;
