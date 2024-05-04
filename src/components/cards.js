import { openImageModal } from './modal';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const formAddCard = document.querySelector('.popup_type_new-card');

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



export { renderInitialCard, addCard, formAddCard };