const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, onDelete, openModal, idOwner, likeCard, viewLikes) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const cardLikeCounter = card.querySelector('.card__like-counter');

  idOwner(cardData.owner._id, deleteButton);
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const likes = cardData.likes;
  likes.forEach(like => {
    viewLikes(like._id, cardData.likes.length, cardLikeCounter, likeButton);
  })

  card.querySelector('.card__title').textContent = cardData.name;

  likeButton.addEventListener('click', () => {
    likeCard(cardData._id, likeButton, cardLikeCounter);
  });

  cardImage.addEventListener('click', openModal);
  
  deleteButton.addEventListener("click", () => onDelete(cardData._id, card));

  return card;
}

function deleteCard(card) {
  card.remove();
}

export { createCard, deleteCard };