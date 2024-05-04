const nameProfile = document.querySelector('.profile__title'); 
const jobProfile = document.querySelector('.profile__description');
const formEditCard = document.querySelector('.popup_type_edit');
const nameInput = formEditCard.querySelector('.popup__input_type_name');
const jobInput = formEditCard.querySelector('.popup__input_type_description');

function handleFormsubmit(evt) {
  evt.preventDefault();

  const nameProfile = document.querySelector('.profile__title'); 
  const jobProfile = document.querySelector('.profile__description'); 

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

function openImageModal(evt) {
  const popup = document.querySelector('.popup_type_image');
  const image = popup.querySelector('.popup__image');
  const caption = popup.querySelector('.popup__caption');

  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.alt;

  openModal(popup);
}

function openModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => popup.classList.add('popup_is-opened'), 1)
  closeModal(popup);
  popup.addEventListener('keydown', closeModalEsc);
}

function removeModal(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => popup.classList.remove('popup_is-animated'), 600);
}

function closeModalEsc(evt) {
  if(evt.key === 'Escape') {
    removeModal(evt.currentTarget);
  }

  evt.currentTarget.removeEventListener('keydown', closeModalEsc);
}

function closeModal(popup) {
  const popupClose = popup.querySelector('.popup__close');
  popupClose.addEventListener('click', () => {
    removeModal(popup);
  })
  popup.addEventListener('click', (evt) => {
    if(evt.target === evt.currentTarget) {
    removeModal(popup);
    }
  })
}

export { nameProfile, jobProfile, nameInput, jobInput, formEditCard, openModal, openImageModal, handleFormsubmit };