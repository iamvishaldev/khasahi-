class MMKV {
  constructor() {
    this.data = new Map();
  }

  getString(key) {
    return this.data.get(key);
  }

  set(key, value) {
    this.data.set(key, value);
  }

  delete(key) {
    this.data.delete(key);
  }
}

module.exports = {MMKV};
