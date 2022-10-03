import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

class RealtimeService {
  static instance;
  constructor() {
    if (RealtimeService.instance) {
      return RealtimeService.instance;
    }

    this.socket = io('ws://localhost:3000');
  }

  joinRoom() {
    this.socket.emit('join', Date.now());
  }

  selectCell(data) {
    this.socket.emit('select-cell', data)
  }

  listenEventName(eventName, cb) {
    return this.socket.on(eventName, cb);
  }
}

export default RealtimeService;
