const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: 'd4d49823-6772-4d66-bfd3-e856941f4510',
    'Content-Type': 'application/json'
  }
}

function checkAnswer(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {headers: config.headers})
  .then(res => checkAnswer(res));
}

function getCardList() {
  return fetch(`${config.baseUrl}/cards`, {headers: config.headers})
  .then(res => checkAnswer(res));
};

function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      about: about.value
    })
  })
};

function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      link: link.value 
    })
  })
}

function getIdOwner() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => checkAnswer(res));
}

function deleteCard(idCard) {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkAnswer(res));
}

function likeCard(idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => checkAnswer(res))
}

function unlikeCard(idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkAnswer(res))
}

function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar.value
    })
  })
}

export { getProfile, getCardList, editProfile, postCard, getIdOwner, deleteCard, likeCard, unlikeCard, updateAvatar };