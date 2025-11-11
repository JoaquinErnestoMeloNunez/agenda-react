import React, { useState, useEffect } from 'react';
import './App.css';
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";

const App = () => {
  const [view, setView] = useState('list');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://www.raydelto.org/agenda.php');
      if (!response.ok) {
        throw new Error('No se pudo conectar con la API');
      }
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'list') {
      fetchContacts();
    }
  }, [view]);

  return (
    <div className="contenedor">
      <div className="encabezado">
        <h1>Agenda de Contactos (React)</h1>
      </div>

      <nav className="menu">
        <ul className="menu-lista">
          <li className="menu-item">
            <span className="menu-enlace">Contactos ▼</span>
            <ul className="submenu">
              <li>
                <span 
                  className="submenu-enlace" 
                  onClick={() => setView('add')}
                >
                  Agregar Contacto
                </span>
              </li>
              <li>
                <span 
                  className="submenu-enlace" 
                  onClick={() => {
                    setView('list');
                    fetchContacts();
                  }}
                >
                  Ver Lista de Contactos
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {}
      {view === 'add' ? (
        <ContactForm onContactAdded={() => {
        }} />
      ) : (
        <ContactList 
          contacts={contacts} 
          loading={loading} 
          error={error} 
        />
      )}
    </div>
  );
};

export default App;