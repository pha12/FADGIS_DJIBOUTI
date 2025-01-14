import React, { useState } from "react";
import "./comp.css";
import { FaPlus, FaEdit } from "react-icons/fa";

const Comp = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    { camp: "Grand Camp A", description: "Base militaire principale" },
    { camp: "Grand Camp B", description: "Camp de formation" },
    { camp: "Grand Camp C", description: "Camp stratégique" },
    { camp: "Grand Camp D", description: "Camp de logistique" },
    { camp: "Grand Camp E", description: "Base avancée" },
  ]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.camp.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="comp-container">
      <div className="comp-header">
        <h1>Grand Camp Militaire</h1>
        <button className="add-button">
          <FaPlus /> Ajouter
        </button>
      </div>

      <div className="comp-search">
        <input
          type="text"
          placeholder="Rechercher ici"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <table className="comp-table">
        <thead>
          <tr>
            <th>Camp</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.camp}</td>
              <td>{item.description}</td>
              <td>
                <button className="edit-button">
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comp;

