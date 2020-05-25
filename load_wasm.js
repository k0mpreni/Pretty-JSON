if (!WebAssembly.instantiateStreaming) {
  // polyfill
  WebAssembly.instantiateStreaming = async (resp, importObject) => {
    const source = await (await resp).arrayBuffer();
    console.log("loaded")

    return await WebAssembly.instantiate(source, importObject);
  };
}

const go = new Go();
let mod, inst;
WebAssembly.instantiateStreaming(fetch("lib.wasm"), go.importObject).then(
  async result => {
    console.log("loaded")
    mod = result.module;
    inst = result.instance;
    memoryBytes = new Uint8Array(inst.exports.mem.buffer)
    await go.run(inst);
  }
);