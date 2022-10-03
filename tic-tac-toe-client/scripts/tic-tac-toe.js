import GameService from "../services/game.service.js";
import RealtimeService from "../services/realtime.service.js";

import { PLAYER } from "../utils/const.js";
import DomElementUtils from "../utils/domElement.js";

const gameService = new GameService();
const realtimeService = new RealtimeService();

function handleClickCell(e) {
  let characterElement;

  if (DomElementUtils.getAttribute(e.target, 'selected')) {
    return;
  }

  // const cellId = e.target.getAttribute('id');

  // drawCharacterOnCell(gameService.currentUser, cellId);
  // if (gameService.currentUser === PLAYER.ONE) {
  //   characterElement = createCharacterElement(PLAYER.ONE);
  //   DomElementUtils.addClass(e.target, 'cell-x-selected');
  // } else if (gameService.currentUser === PLAYER.TWO) {
  //   characterElement = createCharacterElement(PLAYER.TWO);
  //   DomElementUtils.addClass(e.target, 'cell-o-selected');
  // }

  // gameService.markSelected(cellId);
  // DomElementUtils.appendChild(e.target, characterElement);


  realtimeService.selectCell({
    currentUser: gameService.currentUser,
    cellId: e.target.getAttribute('id')
  });

  // if (gameService.isFinishedGame()) {
  //   console.log(`User ${gameService.currentUser} win`);
  // }

  DomElementUtils.setAttribute(e.target, 'selected', true);
  gameService.changeUser();
}

function drawCharacterOnCell(user, cellId) {
  const el = DomElementUtils.getElementsById(cellId);
  let characterElement;

  if (user === PLAYER.ONE) {
    characterElement = createCharacterElement(PLAYER.ONE);
    DomElementUtils.addClass(el, 'cell-x-selected');
  } else if (user === PLAYER.TWO) {
    characterElement = createCharacterElement(PLAYER.TWO);
    DomElementUtils.addClass(el, 'cell-o-selected');
  }

  gameService.markSelected(cellId);
  DomElementUtils.appendChild(el, characterElement);
}

function createCharacterElement(type = PLAYER.ONE) {
  const imgElement = DomElementUtils.createElement('img');

  if (type === PLAYER.ONE) {
    DomElementUtils.updateImageSrc(imgElement, 'assets/wing.png');
    DomElementUtils.addClass(imgElement, 'wing');
  } else if (type === PLAYER.TWO) {
    DomElementUtils.updateImageSrc(imgElement, 'assets/meow.png');
    DomElementUtils.addClass(imgElement, 'meow');
  }

  DomElementUtils.addClass(imgElement, 'character');
  return imgElement;
}

export function init() {
  const cellEls = DomElementUtils.getElementsByClassName('cell');

  for (let i = 0; i < cellEls.length; i++) {
    DomElementUtils.addEventListener(cellEls.item(i), 'click', handleClickCell);
  }

  const selectCellEventListener = realtimeService.listenEventName('select-cell', (value) => {
    const { currentUser, cellId } = value;
    console.log(value);

    drawCharacterOnCell(currentUser, cellId);

    if (gameService.isFinishedGame()) {
      console.log(`User ${gameService.currentUser} win`);
    }
  });

  console.log(selectCellEventListener);
}

