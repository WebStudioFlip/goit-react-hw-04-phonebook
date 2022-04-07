import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './contactForm.module.css';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    addContact({ name, number });
    setName('');
    setNumber('');
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
          value={name}
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
          value={number}
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

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
