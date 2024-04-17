// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function viewCards() {
  let cardElement = [];

  for (let i = 0; i < initialCards.length; i++) {
    cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__title').textContent = initialCards[i].name;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);

    placesList.append(cardElement);
  }
}

function removeCard(evt) {
  let target = evt.target.closest('.card');
  target.remove();
}

viewCards();
