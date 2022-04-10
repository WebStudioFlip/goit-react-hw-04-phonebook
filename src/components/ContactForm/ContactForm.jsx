import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import style from './contactForm.module.css';

const ContactForm = ({ addContact }) => {
  console.log('form')
  const [contact, setContact] = useState({name:'', number: ''});

  const handleChange = event => {
    const { name, value } = event.target;
    setContact({...contact,
    [name]:value})
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    addContact(contact);
    setContact({name:'', number: ''});    
  };

  return (
    <form className={style.form} onSubmit={handleFormSubmit}>
      <div className={style.formGroup}>
        <label htmlFor="" className={style.formGroupLabel}>
          Name
        </label>
        <input
          className={style.formGroupInput}
          onChange={handleChange}
          value={contact.name}
          type="text"
          name="name"
          placeholder="Enter Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="" className={style.formGroupLabel}>
          Number
        </label>
        <input
          type="tel"
          value={contact.number}
          className={style.formGroupInput}
          onChange={handleChange}
          placeholder="Enter Phone"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="" className={style.formGroupLabel}></label>
        <button className={style.btn} type="submit">
          Добавить
        </button>
      </div>
    </form>
  );
};

export default memo(ContactForm);

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
