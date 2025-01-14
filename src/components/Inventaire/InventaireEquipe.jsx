import React from 'react';
import './InventaireEquipe.css';

const InventaireEquipe = () => {
  return (
    <div className="inventaire-container">
      <header className="inventaire-header">
        <h1>Inventaire des Équipements</h1>
      </header>

      <section className="filters-section">
        <div className="filter-group">
          <label htmlFor="type-equipment">Type d'équipement:</label>
          <select id="type-equipment">
            <option value="">Tous</option>
            <option value="armes">Armes</option>
            <option value="vehicules">Véhicules</option>
            <option value="communication">Communication</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="etat">État:</label>
          <select id="etat">
            <option value="">Tous</option>
            <option value="fonctionnel">Fonctionnel</option>
            <option value="non-fonctionnel">Non fonctionnel</option>
            <option value="en-maintenance">En maintenance</option>
          </select>
        </div>

        <button className="btn-filter">Appliquer</button>
      </section>

      <section className="equipment-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Type</th>
              <th>État</th>
              <th>Quantité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            <tr>
              <td>1</td>
              <td>Radio militaire</td>
              <td>Communication</td>
              <td>Fonctionnel</td>
              <td>10</td>
              <td>
                <button className="btn-action">Modifier</button>
                <button className="btn-action btn-danger">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default InventaireEquipe;