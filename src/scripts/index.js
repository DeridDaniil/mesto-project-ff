// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { createCard, deleteCard } from '../components/cards';
import { openModal, closeModal } from '../components/modal';
import { enableValidation, clearValidation} from '../components/validation';
import { 
  getProfile as APIgetProfile, 
  getCardList as APIgetCardList, 
  editProfile as APIeditProfile, 
  postCard as APIpostCard,
  deleteCard as APIdeleteCard, 
  likeCard as APIlikeCard, 
  unlikeCard as APIunlikeCard, 
  updateAvatar as APIupdateAvatar } from '../components/api';

const cardsContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileUpdateAvatarButton = document.querySelector('.profile__image');

const formEditCard = document.querySelector('.popup_type_edit');
const nameInput = formEditCard.querySelector('.popup__input_type_name');
const aboutInput = formEditCard.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__title'); 
const aboutProfile = document.querySelector('.profile__description');
const avatarProfile = document.querySelector('.profile__image');

const formAddCard = document.querySelector('.popup_type_new-card');
const cardName = formAddCard.querySelector('.popup__input_type_card-name');
const cardLink = formAddCard.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');

const formUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const avatarLink = formUpdateAvatar.querySelector('.popup__input_type_url');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function getProfile(name, about, avatar) {
  nameProfile.textContent = name;
  aboutProfile.textContent = about;
  avatarProfile.style.backgroundImage = `url(${avatar})`;
};

function likeCardAPI(idCard, button, counter) {
  if (button.classList.contains('card__like-button_is-active')) {
    APIunlikeCard( idCard )
      .then(({likes}) => {
        button.classList.remove('card__like-button_is-active');
        if (likes.length) {
          counter.classList.add('card__like-counter_active');
          counter.textContent = likes.length;
        } else {
          counter.classList.remove('card__like-counter_active');
          counter.textContent = '';
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    APIlikeCard( idCard )
      .then(({likes}) => {
        button.classList.add('card__like-button_is-active');
        counter.classList.add('card__like-counter_active');
        counter.textContent = likes.length;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

function renderCard(card) {
  cardsContainer.append(card);
}

function deleteCardAPI(cardId, card) {
  APIdeleteCard(cardId)
    .then(deleteCard(card))
}

function getIdOwner(idCardOwner, button) {
  APIgetProfile()
    .then( ({_id}) => {
      if (_id === idCardOwner) {
        button.style.display = 'block';
      }
    })
    .catch(err => {
      console.log(err);
    })
}

function viewLikes(idLike, length, counter, button) {
  APIgetProfile()
      .then(({_id}) => {
        if (length !== 0) {
          if (_id === idLike) {
            counter.textContent = length;
            counter.classList.add('card__like-counter_active');
            button.classList.add('card__like-button_is-active');
          } else {
            counter.classList.add('card__like-counter_active');
            counter.textContent = length;
          }
        } else {
          counter.textContent = '';
        }
      })
      .catch(err => {
        console.log(err);
      })
}

function renderFormAddCard() {
  cardName.value = '';
  cardLink.value = '';
  clearValidation(formAddCard, validationConfig);
  openModal(formAddCard);
}

function renderNameProfile() {
  nameInput.value = nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
  clearValidation(formEditCard, validationConfig);
  openModal(formEditCard);
}

function renderUpdateAvatarProfile() {
  avatarLink.value = '';
  clearValidation(formUpdateAvatar, validationConfig);
  openModal(formUpdateAvatar);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const loading = evt.target.querySelector(validationConfig.submitButtonSelector);
  loading.textContent = 'Сохранение...';
  APIeditProfile(nameInput, aboutInput)
    .then(res => {
      nameProfile.textContent = res.name;
      aboutProfile.textContent = res.about;
    })
    .then(closeModal(evt.currentTarget))
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loading.textContent = 'Сохранить';
    });
}

function openImageModal(evt) {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.alt;

  openModal(popupImage);
}

function addCard(evt) {
  evt.preventDefault();
  const loading = evt.target.querySelector(validationConfig.submitButtonSelector);
  loading.textContent = 'Сохранение...';
  APIpostCard(cardName, cardLink)
    .then(card => {
      renderCard(createCard(card, deleteCardAPI, openImageModal, getIdOwner, likeCardAPI, viewLikes));
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loading.textContent = 'Сохранить';
    })
    evt.target.reset();
    closeModal(evt.currentTarget);
}

function updateAvatar(evt) {
  evt.preventDefault();
  const loading = evt.target.querySelector(validationConfig.submitButtonSelector);
  loading.textContent = 'Сохранение...';
  APIupdateAvatar(avatarLink)
    .then(res => {
      avatarProfile.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loading.textContent = 'Сохранить';
    })
  closeModal(evt.currentTarget);
}

formEditCard.addEventListener('submit', handleFormSubmit); 
formAddCard.addEventListener('submit', addCard);
formUpdateAvatar.addEventListener('submit', updateAvatar);

profileEditButton.addEventListener('click', renderNameProfile);
profileAddButton.addEventListener('click', renderFormAddCard);
profileUpdateAvatarButton.addEventListener('click', renderUpdateAvatarProfile);

enableValidation(validationConfig);

Promise.all([APIgetProfile(), APIgetCardList()])
  .then(([{name, about, avatar}, cardList]) => {
    getProfile(name, about, avatar);
    cardList.forEach(card => {
      renderCard(createCard(card, deleteCardAPI, openImageModal, getIdOwner, likeCardAPI, viewLikes));
    })
  })
  .catch(err => {
    console.log(err);
  })
