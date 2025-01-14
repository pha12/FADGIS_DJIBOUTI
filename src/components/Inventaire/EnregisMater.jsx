import React, { useState } from 'react';
import './EnregisMater.css';

const EnregisMater = () => {
  const [materiel, setMateriel] = useState({
    nom: '',
    etat: '',
    affectation: '',
    derniereMaintenance: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMateriel({
      ...materiel,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez ajouter une logique pour enregistrer les données dans une base de données ou un état global
    console.log('Matériel enregistré:', materiel);
  };

  return (
    <div className="enregis-container">
      <div className="enregis-header">
        <h1>Enregistrement du Matériel</h1>
      </div>

      <form onSubmit={handleSubmit} className="enregis-form">
        <div className="form-group">
          <label htmlFor="nom">Nom du Matériel</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={materiel.nom}
            onChange={handleChange}
            placeholder="Entrez le nom du matériel"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="etat">État du Matériel</label>
          <select
            id="etat"
            name="etat"
            value={materiel.etat}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner l'état</option>
            <option value="Fonctionnel">Fonctionnel</option>
            <option value="En réparation">En réparation</option>
            <option value="Hors service">Hors service</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="affectation">Affectation</label>
          <input
            type="text"
            id="affectation"
            name="affectation"
            value={materiel.affectation}
            onChange={handleChange}
            placeholder="Affectation (ex. Équipe A)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="derniereMaintenance">Date de Dernière Maintenance</label>
          <input
            type="date"
            id="derniereMaintenance"
            name="derniereMaintenance"
            value={materiel.derniereMaintenance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default EnregisMater;
