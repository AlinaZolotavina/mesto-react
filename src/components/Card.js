import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onDeleteBtnClick, onCardLike }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete-btn ${isOwn ? 'element__delete-btn_active' : ''}`
    ); 

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `...`; 

    function handleCardClick() {
        onCardClick(card);
      }
    
    function handleCardLike() {
        onCardLike(card._id, isLiked);
    }

    return (
        <li className="element">
            <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button className="element__like-btn" onClick={handleCardLike}></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} onClick={onDeleteBtnClick}></button>
        </li>
    )
}

export default Card;