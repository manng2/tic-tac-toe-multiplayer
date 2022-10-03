function addClass(element, className) {
  element.classList.add(className);
}

function updateImageSrc(imageElement, imageSrc) {
  imageElement.src = imageSrc;
}

function createElement(tag) {
  return document.createElement(tag);
}

// TODO: try to use prototype Document
function getElementsByClassName(className) {
  return document.getElementsByClassName(className);
}

function getElementsById(id) {
  return document.getElementById(id);
}

function addEventListener(el, eventName, callback) {
  el.addEventListener(eventName, callback);
}

function appendChild(parentEl, childEl) {
  parentEl.appendChild(childEl);
}

function getAttribute(el, key) {
  return el.getAttribute(key);
}

function setAttribute(el, key, value) {
  el.setAttribute(key, value);
}

const DomElementUtils = {
  addClass,
  addEventListener,
  appendChild,
  createElement,
  getAttribute,
  getElementsByClassName,
  getElementsById,
  updateImageSrc,
  setAttribute
}

export default DomElementUtils;
