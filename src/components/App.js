import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPhotoPopupOpen, setAddPhotoPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  useEffect(() => {
    api.getInitialData()
    .then(data => {
      const [userData, cardsData] = data;
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((err) => console.log(err));
  },  []);

  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPhotoPopupOpen() {
    setAddPhotoPopupOpen(!isAddPhotoPopupOpen);
  };

  function handleDeleteCardPopupOpen(card) {
    setDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setSelectedCard(card);
  };

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleCardClick(card) {
    setImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card);
  };

  function handleCardLike(id, isLiked) {
    api.changeLikeCardStatus(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    })
    .catch((err) => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c))
    })
    .catch((err) => console.log(err));
    closeAllPopups();
  };

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPhotoPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  };

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
  };

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
    .then(newCard => {
      setCards([newCard, ...cards]);
    })
    .catch((err) => console.log(err));
    closeAllPopups();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main 
          cards={cards}
          onEditProfile={handleEditProfilePopupOpen}
          onAddPlace={handleAddPhotoPopupOpen}
          onEditAvatar={handleEditAvatarPopupOpen}
          onCardClick={handleCardClick}
          onDeleteBtnClick={handleDeleteCardPopupOpen}
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

        <AddPlacePopup 
          isOpen={isAddPhotoPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          card={selectedCard}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />

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
};

export default App;
