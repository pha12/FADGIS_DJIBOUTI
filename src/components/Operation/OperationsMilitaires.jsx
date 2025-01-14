import React, { useState } from "react";
import "./OperationsMilitaires.css";
import GestionTroupe from "./submenu/GestionTroupe";
import LogistiqMilitaire from "./submenu/LogistiqMilitaire";
import SuiviMission from "./submenu/SuiviMission";
import PlanifOpera from "./submenu/PlanifOpera";

const OperationsMilitaires = () => {
  const [activeTab, setActiveTab] = useState("");

  const renderContent = () => {
    switch (activeTab) {
      case "PlanifOpera":
        return <PlanifOpera />;
      case "GestionTroupe":
        return <GestionTroupe />;
      case "LogistiqMilitaire":
        return <LogistiqMilitaire />;
      case "SuiviMission":
        return <SuiviMission />;
      default:
      
    }
  };

  return (
    <div className="operations-militaires-page">
      <header className="page-header">
        <h1>Opérations Militaires</h1>
      </header>

      {/* Sous-menu horizontal */}
      <nav className="submenu-horizontal">
        <ul>
          <li
            className={activeTab === "PlanifOpera" ? "active" : ""}
            onClick={() => setActiveTab("PlanifOpera")}
          >
            Planification des Opérations
          </li>
          <li
            className={activeTab === "GestionTroupe" ? "active" : ""}
            onClick={() => setActiveTab("GestionTroupe")}
          >
            Gestion des Troupes
          </li>
          <li
            className={activeTab === "LogistiqMilitaire" ? "active" : ""}
            onClick={() => setActiveTab("LogistiqMilitaire")}
          >
            Logistique Militaire
          </li>
          <li
            className={activeTab === "SuiviMission" ? "active" : ""}
            onClick={() => setActiveTab("SuiviMission")}
          >
            Suivi des Missions
          </li>
        </ul>
      </nav>

      {/* Contenu dynamique */}
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default OperationsMilitaires;
