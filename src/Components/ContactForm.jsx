import React, { useState } from 'react';

const ContactForm = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al conectar con el servidor');
      
      const result = await response.json(); 
      
      setStatus({ 
        type: 'exito', 
        message: 'Contacto agregado exitosamente.' 
      });
      
      setFormData({ nombre: '', apellido: '', telefono: '' });
      
      if (onContactAdded) onContactAdded();

    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: `Error al agregar: ${error.message}` 
      });
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    }
  };

  return (
    <div className="tarjeta seccion activa">
      <h2 className="titulo-seccion">Agregar Nuevo Contacto</h2>
      
      {status.message && (
        <div className={`mensaje ${status.type === 'exito' ? 'mensaje-exito' : 'mensaje-error'}`}>
          {status.message}
        </div>
      )}

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="grupo-input">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Nombre"
          />
        </div>
        <div className="grupo-input">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            placeholder="Apellido"
          />
        </div>
        <div className="grupo-input">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            placeholder="XXX-XXX-XXXX"
          />
        </div>
        
        <button type="submit" className="boton" disabled={isSubmitting}>
          {isSubmitting ? 'Agregando...' : 'Agregar Contacto'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;