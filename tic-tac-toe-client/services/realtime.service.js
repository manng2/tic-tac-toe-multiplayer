import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

class RealtimeService {
  static instance;

  constructor() {
    if (RealtimeService.instance) {
      return RealtimeService.instance;
    }

    this.socket = io('ws://localhost:3000', {
      reconnectionDelayMax: 10000,
    });

    this.socket.on('select-cell', data => {
      console.log(data);
    })
  }

  joinRoom() {
    this.socket.emit('join', Date.now());
  }

  selectCell(data) {
    this.socket.emit('select-cell', data)
  }
}

export default RealtimeService;
