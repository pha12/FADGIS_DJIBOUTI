import React from 'react';
import './SuiviMater.css'

const SuiviMater = () => {
  const materielData = [
    { id: 1, nom: 'Radio', etat: 'Fonctionnel', affectation: 'Equipe A', derniereMaintenance: '2024-12-20' },
    { id: 2, nom: 'Véhicule 4x4', etat: 'En réparation', affectation: 'Equipe B', derniereMaintenance: '2024-11-15' },
    { id: 3, nom: 'Drone', etat: 'Fonctionnel', affectation: 'Equipe C', derniereMaintenance: '2024-10-05' },
    // Ajoutez d'autres données si nécessaire
  ];

  return (
    <div className="suivi-container">
      <div className="suivi-header">
        <h1>Suivi du Matériel</h1>
        <button>Ajouter Matériel</button>
      </div>

      <div className="table-container">
        <table className="suivi-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>État</th>
              <th>Affectation</th>
              <th>Dernière Maintenance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materielData.map((materiel) => (
              <tr key={materiel.id}>
                <td>{materiel.nom}</td>
                <td className={`etat-${materiel.etat.replace(/\s+/g, '').toLowerCase()}`}>{materiel.etat}</td>
                <td>{materiel.affectation}</td>
                <td>{materiel.derniereMaintenance}</td>
                <td>
                  <button className="action-btn edit">Modifier</button>
                  <button className="action-btn delete">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuiviMater;
