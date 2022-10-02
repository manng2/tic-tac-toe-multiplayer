import GameService from "./services/game.service.js"
import RealtimeService from "./services/realtime.service.js";

const gameService = new GameService();
const realtimeService = new RealtimeService();

function handleClickCell(e) {
  let characterElement;

  if (e.target.getAttribute('selected')) {
    return;
  }

  realtimeService.socket.emit('connection', gameService.currentUser);
  if (gameService.currentUser === 'x') {
    characterElement = createCharacterElement('x');
    e.target.classList.add('cell-x-selected');
  } else if (gameService.currentUser === 'o') {
    characterElement = createCharacterElement('o');
    e.target.classList.add('cell-o-selected');
  }

  gameService.markSelected(e.target.getAttribute('id'));
  e.target.appendChild(characterElement);

  const isFinishedGame = gameService.isFinishedGame()
  if (isFinishedGame) {
    console.log(`User ${gameService.currentUser} win`);
  }

  realtimeService.selectCell({
    currentUser: gameService.currentUser,
    cellId: e.target.getAttribute('id')
  });
  e.target.setAttribute('selected', true);
  gameService.changeUser();
}

function init() {
  const cellEls = document.getElementsByClassName('cell');

  for (let i = 0; i < cellEls.length; i++) {
    cellEls.item(i).addEventListener('click', handleClickCell)
  }
}

function createCharacterElement(type = 'x') {
  const imgElement = document.createElement('img');
  if (type === 'x') {
    imgElement.src = 'assets/wing.png';
    imgElement.classList.add('wing');
  } else if (type === 'o') {
    imgElement.src = 'assets/meow.png';
    imgElement.classList.add('meow');
  }

  imgElement.classList.add('character');

  return imgElement;
}

init();
