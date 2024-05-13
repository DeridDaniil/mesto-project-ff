function openModal(popup, value, value2) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => popup.classList.add('popup_is-opened'), 1)
  setEventListeners(popup);
}

function setEventListeners(popup) {
  const popupClose = popup.querySelector('.popup__close');
  popupClose.addEventListener('click', () => {
    closeModal(popup);
  })
  popup.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => popup.classList.remove('popup_is-animated'), 600);
  popup.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closeByEscape);
}

export { openModal, closeModal };