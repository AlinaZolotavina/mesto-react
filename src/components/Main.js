import React from 'react';
import api from '../utils/api';

function Main({ onEditAvatar, onEditProfile, onAddPlace }) {

  const [userAvatar, setUserAvatar] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');

  React.useEffect(() => {
    api.getUserData()
    .then(data => {
      const userData = data;
      setUserAvatar(userData.avatar);
      setUserName(userData.name);
      setUserDescription(userData.about);
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
        </ul>
      </section>
    </main>
  )
}

export default Main;