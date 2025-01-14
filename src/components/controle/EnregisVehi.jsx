import React, { useState } from 'react';
import './EnregisVehi.css';

const EnregisVehi = () => {
  const [vehicule, setVehicule] = useState({
    nom: '',
    type: '',
    etat: '',
    affectation: '',
    derniereMaintenance: '',
    matriculation: '',
    chaffeur: '',
  });

  const [vehicules, setVehicules] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicule({
      ...vehicule,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVehicules([...vehicules, vehicule]);
    setVehicule({
      nom: '',
      type: '',
      etat: '',
      affectation: '',
      derniereMaintenance: '',
      matriculation: '',
      chaffeur: '',
    });
  };

  return (
    <div className="enregis-vehi-container">
      <div className="enregis-vehi-header">
        <h1>Enregistrement des Véhicules</h1>
        <button className="ajouter-btn">Ajouter</button>
      </div>

      <form onSubmit={handleSubmit} className="enregis-vehi-form">
        <div className="form-group">
          <label htmlFor="nom">Nom du Véhicule</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={vehicule.nom}
            onChange={handleChange}
            placeholder="Entrez le nom du véhicule"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type du Véhicule</label>
          <select
            id="type"
            name="type"
            value={vehicule.type}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner le type</option>
            <option value="4x4">4x4</option>
            <option value="Camion">Camion</option>
            <option value="Moteur">Moteur</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="etat">État du Véhicule</label>
          <select
            id="etat"
            name="etat"
            value={vehicule.etat}
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
            value={vehicule.affectation}
            onChange={handleChange}
            placeholder="Affectation (ex. Unité A)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="derniereMaintenance">Date de Dernière Maintenance</label>
          <input
            type="date"
            id="derniereMaintenance"
            name="derniereMaintenance"
            value={vehicule.derniereMaintenance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="matriculation">Matriculation</label>
          <input
            type="text"
            id="matriculation"
            name="matriculation"
            value={vehicule.matriculation}
            onChange={handleChange}
            placeholder="Numéro de matriculation"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="chaffeur">Chauffeur</label>
          <input
            type="text"
            id="chaffeur"
            name="chaffeur"
            value={vehicule.chaffeur}
            onChange={handleChange}
            placeholder="Nom du chauffeur"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Enregistrer</button>
        </div>
      </form>

      <div className="vehicules-list">
        <h2>Véhicules Enregistrés ({vehicules.length})</h2>
        {vehicules.length > 0 ? (
          <table className="vehicules-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nom</th>
                <th>Type</th>
                <th>État</th>
                <th>Affectation</th>
                <th>Dernière Maintenance</th>
                <th>Matriculation</th>
                <th>Chauffeur</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicules.map((v, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{v.nom}</td>
                  <td>{v.type}</td>
                  <td>{v.etat}</td>
                  <td>{v.affectation}</td>
                  <td>{v.derniereMaintenance}</td>
                  <td>{v.matriculation}</td>
                  <td>{v.chaffeur}</td>
                  <td>
                    <button className="modifier-btn">Modifier</button>
                    <button className="map-btn">Map</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun véhicule enregistré.</p>
        )}
      </div>
    </div>
  );
};

export default EnregisVehi;