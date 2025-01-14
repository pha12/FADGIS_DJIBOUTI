import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../EmployeeContext";


const GestionPromotions = () => {
  const { promotions, addPromotion, deletePromotion } = useContext(EmployeeContext);
  const [newPromotion, setNewPromotion] = useState({ name: "", date: "" });

  const handleAddPromotion = () => {
    if (newPromotion.name && newPromotion.date) {
      addPromotion(newPromotion);
      setNewPromotion({ name: "", date: "" });
    }
  };

  return (
    <div>
      <h2>Gestion des Promotions</h2>
      <input
        type="text"
        placeholder="Nom de la promotion"
        value={newPromotion.name}
        onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
      />
      <input
        type="date"
        value={newPromotion.date}
        onChange={(e) => setNewPromotion({ ...newPromotion, date: e.target.value })}
      />
      <button onClick={handleAddPromotion}>Ajouter Promotion</button>
      <ul>
        {promotions.map((promotion) => (
          <li key={promotion.id}>
            {promotion.name} - {promotion.date}
            <button onClick={() => deletePromotion(promotion.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionPromotions;
