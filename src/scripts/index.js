// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницy

import "../pages/index.css";
import { renderInitialCard, addCard, formAddCard }  from '../components/cards.js';
import { nameProfile, jobProfile, nameInput, jobInput, formEditCard, openModal, handleFormsubmit }  from '../components/modal.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;

formEditCard.addEventListener('submit', handleFormsubmit);

profileEditButton.addEventListener('click', () => openModal(popupTypeEdit));
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

formAddCard.addEventListener('submit', addCard);

renderInitialCard();