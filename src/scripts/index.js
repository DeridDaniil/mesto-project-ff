// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { initialCards, createCard, deleteCard } from '../components/cards';
import { openModal, closeModal } from '../components/modal';

const cardsContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const formEditCard = document.querySelector('.popup_type_edit');
const nameInput = formEditCard.querySelector('.popup__input_type_name');
const jobInput = formEditCard.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__title'); 
const jobProfile = document.querySelector('.profile__description');

const formAddCard = document.querySelector('.popup_type_new-card');
const cardName = formAddCard.querySelector('.popup__input_type_card-name');
const cardLink = formAddCard.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');

function renderNameProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function renderCard(card) {
  cardsContainer.append(card);
}

function renderInitialCard() {
  initialCards.forEach(card => {
    renderCard(createCard(card, deleteCard, openImageModal));
  })
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal(evt.currentTarget);
}

function openImageModal(evt) {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.alt;

  openModal(popupImage);
}

function addCard(evt) {
  evt.preventDefault();

  const card = {
    name: cardName.value,
    link: cardLink.value
  };

  cardsContainer.prepend(createCard(card, deleteCard, openImageModal));

  evt.target.reset();

  closeModal(evt.currentTarget);
}

formEditCard.addEventListener('submit', handleFormSubmit); 
formAddCard.addEventListener('submit', addCard);

profileEditButton.addEventListener('click', () => { openModal(formEditCard) });
profileAddButton.addEventListener('click', () => { openModal(formAddCard) });

renderInitialCard();
renderNameProfile();