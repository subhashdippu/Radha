const channel = new BroadcastChannel("patient-db-sync");

export function broadcastChange() {
  channel.postMessage("data-updated");
}

export function onDatabaseChange(callback) {
  channel.onmessage = (event) => {
    if (event.data === "data-updated") {
      callback();
    }
  };
}
