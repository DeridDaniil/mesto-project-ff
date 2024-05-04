// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницy

import "../pages/index.css";
import { initialCards }  from '../components/cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const profileName = document.querySelector('.profile__title'); 
const profileJob = document.querySelector('.profile__description'); 
const formElement = document.querySelector('.popup_type_edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function handleFormsubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormsubmit);

function createCard(cardData, onDelete) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__title').textContent = cardData.name;
  
  card.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  cardImage.addEventListener('click', openImageModal);

  deleteButton.addEventListener("click", () => onDelete(card));

  return card;
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

function deleteCard(card) {
  card.remove()
} 

function renderCard(card) {
  cardsContainer.append(card);
}

function renderInitialCard() {
  initialCards.forEach(card => {
    renderCard(createCard(card, deleteCard));
  })
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

profileEditButton.addEventListener('click', () => openModal(popupTypeEdit));
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

const formAddCard = document.querySelector('.popup_type_new-card');

function addCard(evt) {
  evt.preventDefault();

  const cardName = formAddCard.querySelector('.popup__input_type_card-name');
  const cardLink = formAddCard.querySelector('.popup__input_type_url');
  const card = {
    name: cardName.value,
    link: cardLink.value
  };

  cardsContainer.prepend(createCard(card, deleteCard));

  cardName.value = '';
  cardLink.value = '';

  evt.currentTarget.classList.remove('popup_is-opened');
}

formAddCard.addEventListener('submit', addCard);


renderInitialCard();