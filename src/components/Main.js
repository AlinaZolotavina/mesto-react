import React from 'react';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeleteBtnClick }) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" src="<%=require('./images/avatar.jpg')%>" alt="фото профиля" />
          <div className="profile__darkening"></div>
          <div className="profile__avatar-edit-btn"></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-user">
            <h1 className="profile__name">Жак-Ив Кусто</h1>
            <button className="profile__edit-btn"></button>
          </div>
          <p className="profile__job">Исследователь океана</p>
        </div>
        <button className="profile__add-btn"></button>
      </section>

      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
    </main>
  )
}

export default Main;