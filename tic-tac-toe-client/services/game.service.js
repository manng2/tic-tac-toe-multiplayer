import { PLAYER } from "../utils/const.js";

class GameService {
  static instance;
  #currentUser;
  #games;

  constructor() {
    if (GameService.instance) {
      return GameService.instance;
    }

    this.#currentUser = PLAYER.ONE;
    this.#games = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

  get currentUser() {
    return this.#currentUser;
  }

  changeUser() {
    this.#currentUser = this.#currentUser === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE;
  }

  markSelected(pattern) {
    const [x, y] = pattern.split('x');

    this.#games[x - 1][y - 1] = this.#currentUser;
  }

  isFinishedGame() {
    return this.#checkDiagonals() || this.#checkHorizontals() || this.#checkVerticals();
  }

  #checkDiagonals() {
    if ((this.#games[0][0] === this.#currentUser && this.#games[1][1] === this.#currentUser && this.#games[2][2] === this.#currentUser) ||
    (this.#games[0][2] === this.#currentUser && this.#games[1][1] === this.#currentUser && this.#games[2][0] === this.#currentUser)) {
      return true;
    }

    return false;
  }

  #checkVerticals() {
    for (let i = 0; i <= 2; i++) {
      if (this.#games[0][i] === this.#currentUser && this.#games[1][i] === this.#currentUser && this.#games[2][i] === this.#currentUser) {
          return true;
      }
    }
    return false;
  }

  #checkHorizontals() {
    for (let i = 0; i <= 2; i++) {
      if (this.#games[i][0] === this.#currentUser && this.#games[i][1] === this.#currentUser && this.#games[i][2] === this.#currentUser) {
          return true;
      }
    }
    return false;
  }
}

export default GameService;
