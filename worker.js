importScripts('sleep.js', 'message.js');

async function main_loop() {
  const { port } = (await message()).data;

  let i = 0;
  while (true) {
    i += (await message(port)).data;
    await sleep(1000);
    port.postMessage(i);
  }
}

main_loop().catch(e => {
  setTimeout(() => { throw e; }, 0);
});
