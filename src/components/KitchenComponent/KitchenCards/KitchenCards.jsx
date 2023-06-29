import React from "react";
import "./Cards.css";
import { kitchencardsData } from "../../../Data/Data";

import KitchenCard from "../KitchenCard/KitchenCard";

const KitchenCards = () => {
  return (
    <div className="Cards mt-3 mb-5">
      {kitchencardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <KitchenCard
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default KitchenCards;
