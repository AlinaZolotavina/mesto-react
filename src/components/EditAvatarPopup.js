import React, { useState, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const [avatar, setAvatar] = useState('');
    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value
        })
    }


    return (
        <PopupWithForm
            name="avatar-edit"
            title="Обновить аватар"
            formName="updateAvatar"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__item">
                <input
                    className="form__input form__input_type_link"
                    id="avatar-link-input"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на картинку" 
                    required
                    value={avatar || ''}
                    onChange={handleAvatarChange}
                    ref={inputRef}
                />
                <span className="form__input-error avatar-link-input-error">Ссылка на изображение.</span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
