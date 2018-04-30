let elt = document.getElementById('fib');
const worker = new Worker('worker.js');
console.log('created worker');
const { port1, port2 } = new MessageChannel();

worker.postMessage({ port: port2 }, [port2]);
console.log('posted message');

port1.onmessage = ({data}) => {
  let elt = document.createElement('div');
  elt.innerText = data;
  fib.appendChild(elt);
  if (data < 1000)
    port1.postMessage(data);
}
port1.postMessage(1);
port1.postMessage(1);
console.log('finished top-level script');
