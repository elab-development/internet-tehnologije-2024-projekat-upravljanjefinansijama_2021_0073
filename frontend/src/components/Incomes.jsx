import React from "react";
import IncomeCard from "./IncomeCard";

const Incomes = ({ incomes }) => {
  if (!incomes || incomes.length === 0) {
    return <p>No incomes found.</p>;
  }

  return (
    <div>
      {incomes.map((income, index) => (
        <IncomeCard 
          key={income.id || `income-${index}`} 
          income={income} 
        />
      ))}
    </div>
  );
};

export default Incomes;