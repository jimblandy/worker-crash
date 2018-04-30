// This is not what Dan Abramov would have written.
const message = (() => {
  const queuesSym = Symbol('message queues');

  return function message(port=self) {
    if (!port[queuesSym]) {
      const queues = { messages: [], fulfills: [] };
      port[queuesSym] = queues;
      port.onmessage = m => {
        if (queues.fulfills.length > 0)
          (queues.fulfills.shift())(m)
        else
          queues.messages.push(m);
      }
    }

    const queues = port[queuesSym];
    return new Promise(fulfill => {
      if (queues.messages.length > 0)
        fulfill(queues.messages.shift());
      else
        queues.fulfills.push(fulfill);
    });
  }
})();
