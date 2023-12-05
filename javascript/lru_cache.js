class Node {
  constructor(data = null, key = null, next = null, prev = null) {
    this.data = data;
    this.key = key;
    this.next = next;
    this.prev = prev;
  }
  
}

class DoublyLinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
  }

  print(){
    const nodes = [];
    let node = this.head;
    while (node){
      nodes.push(node);
      node = node.next;
    }
    console.log(nodes.map(n => n.data).join('->'))
  }
  // ADD THE NODE TO THE HEAD OF THE LIST
  addHead(node) {

    if (!this.head){
      this.head = node;
      this.tail = node;
    }
    else{
      node.next = this.head;
      node.next.prev = node;
      this.head = node;      
    }

  }

  // REMOVE THE TAIL NODE FROM THE LIST
  // AND RETURN IT
  removeTail() {

    // no tail
    if (!this.tail) return null 

    const oldTail = this.tail;

    // head == tail
    if (!this.tail.prev){
      this.head = null;
      this.tail = null;
      return oldTail;  
    }

    // all other
    this.tail.prev.next = null;
    this.tail = oldTail.prev;

    return oldTail;
  }

  // REMOVE THE GIVEN NODE FROM THE LIST
  // AND THEN RETURN IT
  removeNode(node) {

    //remove tail / head == tail
    if (this.tail === node) return this.removeTail()
    //remove head
    if (this.head === node){
      this.head = node.next;
      this.head.prev = null;
    }
    //remove middle
    else{
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    return node;

  }

  // MOVE THE GIVEN NODE FROM ITS LOCATION TO THE HEAD
  // OF THE LIST
  moveNodeToHead(node) {
    this.removeNode(node);
    this.addHead(node);
  }
}

class LRUCache {
  constructor(limit = 10) {
    this.limit = limit;
    this.size = 0;
    this.hash = {};
    this.list = new DoublyLinkedList();
  }

  // RETRIEVE THE NODE FROM THE CACHE USING THE KEY
  // IF THE NODE IS IN THE CACHE, MOVE IT TO THE HEAD OF THE LIST AND RETURN IT
  // OTHERWISE RETURN -1
  get(key) {
    if (!this.hash[key]) return -1

    this.list.moveNodeToHead(this.hash[key])
    return this.hash[key]

  }

  // ADD THE GIVEN KEY AND VALUE TO THE CACHE
  // IF THE CACHE ALREADY CONTAINS THE KEY, UPDATE ITS VALUE AND MOVE IT TO 
  // THE HEAD OF THE LIST
  // IF THE CACHE DOESN'T CONTAIN THE KEY, ADD IT TO THE CACHE AND PLACE IT
  // AT THE HEAD OF THE LIST
  // IF THE CACHE IS FULL, REMOVE THE LEAST RECENTLY USED ITEM BEFORE ADDING
  // THE NEW DATA TO THE CACHE
  put(key, value) {
    //cache doesn't contain key
    if (!this.hash[key]){

      const node = new Node(value, key);
      //cache full
      if (this.size === this.limit){
        const removedNode = this.list.removeTail();
        delete this.hash[removedNode.key];
      }
      //cache has space
      if (this.size < this.limit){
        this.size++;
      }
      this.list.addHead(node) 
      this.hash[key] = node;

    }
    //cache contains key
    else{
      this.hash[key].data = value;
    }

  }
}

if (require.main === module) {
  const one = new Node(1, 'one');
  const two = new Node(2, 'two');
  const three = new Node(3, 'three');

  const l = new DoublyLinkedList();
  

  // add 
  l.addHead(one);
  // console.log(l)
  // l.moveNodeToHead(one);
  // console.log(l)
  // console.log(l);
  // add again
  // l.addHead(two);
  // console.log(l);

  // l.addHead(three);
  // l.print()

  // // remove tail
  // l.print()
  // console.log(l.removeTail());
  // l.print()
  // // remove tail again
  // console.log(l.removeTail());
  // l.print()
  // // remove tail again
  // console.log(l.removeTail());
  // l.print()
  

  // remove node
  // console.log(l.removeNode(two).data);
  // l.print()

  //Move to head
  // l.moveNodeToHead(three);

  // l.print()

  const c = new LRUCache(1);
  c.put('one', 1);
  console.log(c);
  console.log(c.get('one'));
  c.put('two', 2);
  console.log(c);
  console.log(c.get('one'));

}

module.exports = {
  Node,
  DoublyLinkedList,
  LRUCache
};

// Please add your pseudocode to this file
// And a written explanation of your solution
