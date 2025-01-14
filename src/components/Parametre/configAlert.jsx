import React, { useState } from "react";
import "./ConfigAlert.css";

const ConfigAlert = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, name: "Alerte Intrusion", active: true },
    { id: 2, name: "Alerte Incendie", active: false },
    { id: 3, name: "Alerte Mouvement Non-Autorisé", active: true },
    { id: 4, name: "Alerte Communication Coupée", active: false },
    { id: 5, name: "Alerte Matériel Endommagé", active: true },
  ]);

  const toggleAlert = (id) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  const deactivateAllAlerts = () => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) => ({ ...alert, active: false }))
    );
  };

  const activateAllAlerts = () => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) => ({ ...alert, active: true }))
    );
  };

  return (
    <div className="config-alert">
      <h1>Configuration des Alertes</h1>

      <div className="alert-controls">
        <button onClick={activateAllAlerts} className="activate-btn">
          Activer Toutes les Alertes
        </button>
        <button onClick={deactivateAllAlerts} className="deactivate-btn">
          Désactiver Toutes les Alertes
        </button>
      </div>

      <table className="alerts-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom de l'Alerte</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.id}</td>
              <td>{alert.name}</td>
              <td>
                {alert.active ? (
                  <span className="status active">Active</span>
                ) : (
                  <span className="status inactive">Inactive</span>
                )}
              </td>
              <td>
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`toggle-btn ${
                    alert.active ? "deactivate" : "activate"
                  }`}
                >
                  {alert.active ? "Désactiver" : "Activer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfigAlert;
