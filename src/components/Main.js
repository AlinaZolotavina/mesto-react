import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeleteBtnClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
    .then(data => {
      setCards(data);
    })
    .catch((err) => console.log(err));
  }, []);

  function handleCardLike(id, isLiked) {
    api.changeLikeCardStatus(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    });
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__avatar-image" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
          <div className="profile__darkening"></div>
          <div className="profile__avatar-edit-btn" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-user">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-btn" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map(card => 
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onDeleteBtnClick={onDeleteBtnClick}  
              onCardLike={handleCardLike}    
            />
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main;