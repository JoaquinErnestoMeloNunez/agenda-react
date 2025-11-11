import React, { useState } from 'react';

const ContactList = ({ contacts, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) => {
    if (!searchTerm) return true;
    const fullName = `${contact.nombre} ${contact.apellido}`.toLowerCase();
    const phone = contact.telefono ? contact.telefono.toLowerCase() : '';
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || phone.includes(search);
  });

  return (
    <div className="tarjeta seccion activa">
      <h2 className="titulo-seccion">
        Lista de Contactos
        <span className="contador-contactos">
          ({filteredContacts.length} contactos)
        </span>
      </h2>

      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar contacto por nombre, apellido o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="listaContactos">
        {loading && <div className="cargando">Cargando contactos...</div>}
        
        {error && <div className="mensaje mensaje-error">{error}</div>}
        
        {!loading && !error && filteredContacts.length === 0 && (
          <div className="sin-contactos">
            {searchTerm 
              ? "No se encontraron coincidencias." 
              : "No hay contactos registrados aún. ¡Agrega tu primer contacto!"}
          </div>
        )}

        <div className="lista-contactos">
          {filteredContacts.map((contact, index) => (
            <div key={index} className="contacto">
              <div className="contacto-nombre">
                {contact.nombre} {contact.apellido}
              </div>
              <div className="contacto-telefono">
                Tel: {contact.telefono}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactList;