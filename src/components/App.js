import React, { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  React.useEffect(() => {
    api.getUserData()
    .then(data => {
      setCurrentUser(data);
    })
    .catch((err) => console.log(err));
  }, []);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
    .then(data => {
      setCards(data);
    })
    .catch((err) => console.log(err));
  }, []);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPhotoPopupOpen, setAddPhotoPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPhotoFormPopupOpen() {
    setAddPhotoPopupOpen(!isAddPhotoPopupOpen);
  }

  function handleConfirmationPopupOpen() {
    setConfirmationPopupOpen(!isConfirmationPopupOpen);
  }

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card)
  }

  function handleCardLike(id, isLiked) {
    api.changeLikeCardStatus(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    });
  }

  function handleCardDelete(id) {
    api.deleteCard(id).then(() => {
      setCards((state) => state.filter((c) => c._id !== id ? c : {}))
    })
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPhotoPopupOpen(false);
    setConfirmationPopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.changeUserData(data)
    .then(data => {
      setCurrentUser(data)       
    })
    .catch((err) => console.log(err));
    closeAllPopups();
  };

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
    .then(data => {
      setCurrentUser(data)
    })
    .catch((err) => console.log(err));
    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main 
          cards={cards}
          onEditProfile={handleEditProfilePopupOpen}
          onAddPlace={handleAddPhotoFormPopupOpen}
          onEditAvatar={handleEditAvatarPopupOpen}
          onCardClick={handleCardClick}
          onDeleteBtnClick={handleConfirmationPopupOpen}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />          
        <Footer 
          year={currentYear}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          name="add-photo"
          title="Новое место"
          formName="addNewPhotoForm"
          buttonText="Создать"
          isOpen={isAddPhotoPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="form__item">
            <input className="form__input form__input_type_title" id="title-input" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="form__input-error title-input-error">Вы пропустили это поле.</span>
          </label>
          <label className="form__item">
            <input className="form__input form__input_type_link" id="card-link-input" type="url" name="link" placeholder="Ссылка на картинку" required />
            <span className="form__input-error card-link-input-error">Введите адрес сайта.</span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"
          formName="confirmForm"
          buttonText="Да"
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
        >          
        </PopupWithForm>

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        
        <ImagePopup 
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />               
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
