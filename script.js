// We use linked lists to help with collisions
class Node {
  constructor(key = null, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

// Assignment : Start by creating a HashMap class or factory function. It’s up to you which you want to use.
// Then proceed to create the following methods:
class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
  }

  // 1 - hash(key) takes a key and produces a hash code with it.
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    hashCode = hashCode % 16;

    if (hashCode < 0 || hashCode >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    return hashCode;
  }

  // 2 - set(key, value) takes two arguments, the first is a key
  // and the second is a value that is assigned to this key.
  // If a key already exists, then the old value is overwritten

  // REFACTOR THIS
  set(key, value) {
    let index = this.hash(key);

    // merely for testing
    this.buckets[index] = new Node(key, value, null);
    this.buckets[index].next = new Node("Oswald", "eita carai", null);

    this.buckets[index + 1] = new Node("Janaina", "safada", null);
    this.buckets[index + 1].next = new Node("Padilha", "ihh", null);
  }

  // Helper function to traverse the hash map
  // Used to help with the following tasks
  traverse(callback) {
    const filteredBucket = this.buckets.filter((bucket) => bucket);

    for (let i = 0; i < filteredBucket.length; i++) {
      let list = filteredBucket[i];
      let node = list;
      let nodeIndex = this.hash(node.key);

      while (node) {
        callback(node, nodeIndex);
        node = node.next;
      }
    }
  }

  // 3 - get(key) takes one argument as a key and returns the value that is assigned to this key.
  // If a key is not found, return null.
  get(key) {
    let value = null;

    this.traverse((node) => {
      if (node.key === key) value = node.key;
    });

    return value;
  }

  // 4 - has(key) takes a key as an argument and returns true or false
  // based on whether or not the key is in the hash map.
  has(key) {
    return this.get(key) !== null;
  }

  // 5 - remove(key) takes a key as an argument. If the given key is in the hash map,
  // it should remove the entry with that key and return true.
  // If the key isn’t in the hash map, it should return false.

  // REFACTOR THIS - IT STOPS WORKING WHEN YOU REMOVE ALL NODES
  remove(key) {
    this.traverse((node, nodeIndex) => {
      if (node.key === key) {
        let node = this.buckets[nodeIndex];
        let previous = null;

        while (node) {
          if (node.key === key) {
            if (previous) {
              previous.next = node.next;
            } else {
              this.buckets[nodeIndex] = node.next;
            }

            return true;
          }

          previous = node;
          node = node.next;
        }
      }
    });

    return false;
  }

  // 6 - length() returns the number of stored keys in the hash map.
  length() {
    let length = 0;

    this.traverse(() => {
      length += 1;
    });

    return length;
  }

  // 7 - clear() removes all entries in the hash map.
  clear() {
    this.buckets = new Array(16).fill(null);
  }

  // 8 - keys() returns an array containing all the keys inside the hash map.
  keys() {
    let keys = [];

    this.traverse((node) => {
      keys.push(node.key);
    });

    return keys;
  }

  // 9 - values() returns an array containing all the values.
  values() {
    let values = [];

    this.traverse((node) => {
      values.push(node.value);
    });

    return values;
  }

  // 10 - entries() returns an array that contains each key, value pair.
  entries() {
    let entries = [];

    this.traverse((node) => {
      entries.push([node.key, node.value]);
    });

    return entries;
  }
}

const map = new HashMap();

map.set("Sara", "Sara's key");
console.log(map.buckets);

// map.remove("Sara");
map.remove("Oswald");

console.log(map.buckets);
// console.log(map.length());
// console.log(map.keys());
// console.log(map.values());
// console.log(map.entries());
