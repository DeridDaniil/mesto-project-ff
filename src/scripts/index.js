// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницy

import "../pages/index.css";
import { initialCards }  from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard(cardData, onDelete) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__title').textContent = cardData.name;
  
  deleteButton.addEventListener("click", () => onDelete(card));

  return card;
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

renderInitialCard();