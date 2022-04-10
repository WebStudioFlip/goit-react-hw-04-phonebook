import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from '../shared/Section';


const App = () => {
  const [contacts, setContacts] = useState( [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]
  );
  const [filter, setFilter] = useState('');  

  useEffect (()=>{  
    const contacts = localStorage.getItem('contacts');
    if (contacts && JSON.parse(contacts).length) {
      setContacts( JSON.parse(contacts) );
    }      
},[])
  
  useEffect (()=>{          
      localStorage.setItem('contacts', JSON.stringify(contacts));   
  },[contacts])

  const addContact = useCallback( contact => {        
    const {name} = contact;
    if (
      !contacts.find(
        el => el.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      contact.id = nanoid();
      setContacts(prevContacts => {
        return [...prevContacts, contact] 
      });
    } else {
      alert(`${name} is already in contacts`);
    }
  },[contacts]);

  const getFilteredContacts =() => {    
    if (!filter) {
      return contacts;
    }
    const filterStr = filter.toLowerCase();
    const result = contacts.filter(({name}) => name.toLowerCase().includes(filterStr));
    return result;
  };

  const handleSearch = useCallback( ({target}) => {
    const { value } = target;
    setFilter(value);
  }, []);

  const removeContact = contactId => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== contactId));
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
