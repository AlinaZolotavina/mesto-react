import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeleteBtnClick }) {

  const [userAvatar, setUserAvatar] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialData()
    .then(data => {
      const [userData, cardsData] = data;
      setUserAvatar(userData.avatar);
      setUserName(userData.name);
      setUserDescription(userData.about);
      setCards(cardsData);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__avatar-image" style={{ backgroundImage: `url(${userAvatar})` }} />
          <div className="profile__darkening"></div>
          <div className="profile__avatar-edit-btn" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-user">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-btn" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{userDescription}</p>
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
            />
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main;