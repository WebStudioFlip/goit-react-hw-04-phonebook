import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from '../shared/Section';

const App = () => {
  const [contacts, setContacts] = useState(() => {
  return  JSON.parse(localStorage.getItem('contacts')) ?? [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]
  } );
  const [filter, setFilter] = useState('');  
  
  useEffect (()=>{          
      localStorage.setItem('contacts', JSON.stringify(contacts));   
  },[contacts])

  const addContact = addContact => {    
    const {name} = addContact;
    if (
      !contacts.find(
        el => el.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      addContact.id = nanoid();
      setContacts(() => {
        return [...contacts, addContact] 
      });
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  const getFilteredContacts = () => {    
    if (!filter) {
      return contacts;
    }
    const filterStr = filter.toLowerCase();
    const result = contacts.filter(({name}) => name.toLowerCase().includes(filterStr));
    return result;
  };

  const handleSearch = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const removeContact = contactId => {
    setContacts(contacts.filter(item => item.id !== contactId));
  };

  
    return (
      <div
        style={{
          //height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 40,
          textTransform: 'uppercase',
          color: '#010101',
          padding: '20px',
        }}
      >
        <Section title="Phonebook">
          <ContactForm addContact={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            filterContacts={handleSearch}
            filter={filter}
          />
          <ContactList
            contacts={getFilteredContacts()}
            removeContact={removeContact}
          />
        </Section>
      </div>
    );  
}

export default App;
