import React, { useState, useContext } from 'react';
import './VehiculeManage.css';
import { EmployeeContext } from "../EmployeeContext";

const VehiculeManage = () => {
  const { employees } = useContext(EmployeeContext);
  const [vehicule, setVehicule] = useState({
    nom: '',
    type: '',
    etat: '',
    affectation: '',
    matriculation: '',
    code: '',
    chauffeur: '',
    gps: '', // New field for GPS data
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
      matriculation: '',
      code: '',
      chauffeur: '',
      gps: '', // Reset GPS field
    });
  };

  return (
    <div className="vehicule-manage-container">
      <div className="vehicule-manage-header">
        <h1>Enregistrement des Véhicules</h1>
        <button className="ajouter-btn">Ajouter</button>
      </div>

      <form onSubmit={handleSubmit} className="vehicule-manage-form">
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
            placeholder="Affectation (ex. Groupe A)"
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
          <label htmlFor="code">Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={vehicule.code}
            onChange={handleChange}
            placeholder="Code du véhicule"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="chauffeur">Chauffeur</label>
          <select
            id="chauffeur"
            name="chauffeur"
            value={vehicule.chauffeur}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner le chauffeur</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.nom}>
                {employee.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gps">PGPS</label>
          <input
            type="text"
            id="gps"
            name="gps"
            value={vehicule.gps}
            onChange={handleChange}
            placeholder="Latitude, Longitude (ex: 11.589, 43.145)"
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
                <th>Matriculation</th>
                <th>Code</th>
                <th>Chauffeur</th>
                <th>PGPS</th>
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
                  <td>{v.matriculation}</td>
                  <td>{v.code}</td>
                  <td>{v.chauffeur}</td>
                  <td>{v.gps}</td>
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

export default VehiculeManage;
