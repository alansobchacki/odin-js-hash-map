// Assignment : Start by creating a HashMap class or factory function. It’s up to you which you want to use.
// Then proceed to create the following methods:

class HashMap {
  constructor() {
    this.mapLength = 0;
    this.buckets = new Array(16).fill(null);
  }

  // 1 - hash(key) takes a key and produces a hash code with it.
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.mapLength; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % 16;
  }

  // 2 - set(key, value) takes two arguments, the first is a key
  // and the second is a value that is assigned to this key.
  // If a key already exists, then the old value is overwritten
  set(key, value) {
    let index = this.hash(key);

    this.buckets[index] = { key: key, value: value };
    this.mapLength += 1;
  }

  // 3 - get(key) takes one argument as a key and returns the value that is assigned to this key.
  // If a key is not found, return null.
  get(key) {
    const index = this.hash(key);

    return this.buckets[index] ? this.buckets[index].value : null;
  }

  // 4 - has(key) takes a key as an argument and returns true or false
  // based on whether or not the key is in the hash map.
  has(key) {
    const index = this.hash(key);

    return this.buckets[index] ? true : false;
  }

  // 5 - remove(key) takes a key as an argument. If the given key is in the hash map,
  // it should remove the entry with that key and return true.
  // If the key isn’t in the hash map, it should return false.
  remove(key) {
    const index = this.hash(key);

    if (this.buckets[index]) {
      this.buckets[index] = null;
      this.mapLength -= 1;
      return true;
    }

    return false;
  }

  // 6 - mapLength() returns the number of stored keys in the hash map.
  length() {
    return this.mapLength;
  }

  // 7 - clear() removes all entries in the hash map.
  clear() {
    //
  }
}

const map = new HashMap();

map.set("alfred", "I am the value");
// console.log(map.get("alfred")); // outputs "I am the value"
// console.log(map.get("janice")); // outputs null
// console.log(map.has("alfred")); // outputs true
// console.log(map.has("janice")); // outputs false
console.log(map.remove("alfred")); // removes "alfred" from hashMap
console.log(map.remove("janice")); // outputs false
console.log(map.length());
