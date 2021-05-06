(() => {
  // editor/build/client/live.js
  var PORT = 1235;
  var first = true;
  function createSocket() {
    const socket = new WebSocket(`ws://localhost:${PORT}`);
    socket.addEventListener("message", () => window.location.reload());
    socket.addEventListener("close", () => {
      setTimeout(createSocket, 0);
    });
    socket.addEventListener("open", () => {
      if (!first) {
        window.location.reload();
      } else {
        first = false;
      }
    });
  }
  window.addEventListener("load", () => {
    createSocket();
    console.log(`Live reload listening on port ${PORT}...`);
  });

  // editor/code/main.ts
  function start() {
    console.log("hi3");
  }
  window.onload = start;
})();
//# sourceMappingURL=index.js.map
