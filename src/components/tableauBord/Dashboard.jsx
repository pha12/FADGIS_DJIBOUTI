import React from "react";
import "./Dashboard.css";
import { FaUsers, FaBuilding, FaMoneyBill, FaShieldAlt, FaCampground } from "react-icons/fa"; // Import des icônes
import MapPage from "../MapPage"; // Import the MapPage component

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Stats Cards Section */}
      <section className="stats-cards">
        <div id="card1" className="card">
          <div className="icon-container">
            <FaUsers size={40} className="icon" />
          </div>
          <h3>Nombre des employés</h3>
          <p>28,144</p>
          <div className="separator"></div>
          <span className="growth">+55% par rapport à la semaine dernière</span>
        </div>
        <div id="card2" className="card">
          <div className="icon-container">
            <FaBuilding size={40} className="icon" />
          </div>
          <h3>Nombre des départements</h3>
          <p>2,300</p>
          <div className="separator"></div>
          <span className="growth">+3% par rapport au mois dernier</span>
        </div>
        <div id="card3" className="card">
          <div className="icon-container">
            <FaMoneyBill size={40} className="icon" />
          </div>
          <h3>Nombre total des salaires</h3>
          <p>34k</p>
          <div className="separator"></div>
          <span className="growth">+1% par rapport à hier</span>
        </div>
        <div id="card4" className="card">
          <div className="icon-container">
            <FaShieldAlt size={40} className="icon" />
          </div>
          <h3>Nombre de contrôles</h3>
          <p>+91</p>
          <div className="separator"></div>
          <span className="growth">Mis à jour récemment</span>
        </div>
        <div id="card5" className="card">
          <div className="icon-container">
            <FaCampground size={40} className="icon" />
          </div>
          <h3>Nombre de Camps Militaires</h3>
          <p>47</p>
          <div className="separator"></div>
          <span className="growth">Stabilité maintenue</span>
        </div>
      </section>



      {/* Charts Section */}
      <section className="charts-section">
        <div className="chart-card">
          <h3>Activités statistiques</h3>
          <canvas></canvas>
          <p>Dernière campagne</p>
        </div>
        <div className="chart-card">
          <h3>Statistiques par date</h3>
          <canvas></canvas>
          <p>Mise à jour il y a 4 minutes</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 - FADGIS Djibouti. Tous droits réservés.  &copy; geosom</p>
      </footer>
    </div>
  );
};

export default Dashboard;
