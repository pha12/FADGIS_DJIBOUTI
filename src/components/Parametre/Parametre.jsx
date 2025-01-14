import React, { useState } from "react";
import Comp from "./ParametreBase/Comp";
import "./Parametre.css";

const TabMenu = ({ tabs, activeTab, onTabClick }) => (
  <nav className="submenu">
    <ul>
      {tabs.map((tab) => (
        <li
          key={tab}
          className={activeTab === tab ? "active" : ""}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  </nav>
);

const Parametre = () => {
  const [activeTab, setActiveTab] = useState("Disciplines");

  const tabs = [
    "Disciplines",
    "Départements",
    "Région",
    "Comp",
    "Grades",
    "Nationalité",
    "Type de document",
    "Statuts",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Comp":
        return <Comp />;
      default:
        return <p>Contenu pour l'onglet {activeTab}.</p>;
    }
  };

  return (
    <div className="parametre-container">
      <header className="page-header">
        <h1>Paramètres</h1>
      </header>
      <TabMenu tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="content">{renderTabContent()}</div>
    </div>
  );
};

export default Parametre;
