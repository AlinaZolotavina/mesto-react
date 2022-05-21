import React, { useState } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
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

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPhotoPopupOpen(false);
    setConfirmationPopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page__container">
      <Header />
      <Main 
        className="content"
        onEditProfile={handleEditProfilePopupOpen}
        onAddPlace={handleAddPhotoFormPopupOpen}
        onEditAvatar={handleEditAvatarPopupOpen}
        onCardClick={handleCardClick}
        onDeleteBtnClick={handleConfirmationPopupOpen}
      />          
      <Footer 
        year={currentYear}
      />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        formName="editProfileForm"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__item">
          <input className="form__input form__input_type_name" id="name-input" type="text" name="name" placeholder="Ваше имя" minLength="2" maxLength="40" required />
          <span className="form__input-error name-input-error">Вы пропустили это поле.</span>
        </label>
        <label className="form__item">
          <input className="form__input form__input_type_job" id="job-input" type="text" name="about" placeholder="Кратко о Вас" minLength="2" maxLength="200" required />
          <span className="form__input-error job-input-error">Вы пропустили это поле.</span>
        </label>
      </PopupWithForm>

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

      <PopupWithForm
        name="avatar-edit"
        title="Обновить аватар"
        formName="updateAvatar"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__item">
          <input className="form__input form__input_type_link" id="avatar-link-input" type="url" name="avatar" placeholder="Ссылка на картинку" required />
          <span className="form__input-error avatar-link-input-error">Ссылка на зображение.</span>
        </label>
      </PopupWithForm>

      <ImagePopup 
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />               
    </div>
  )
}

export default App;
