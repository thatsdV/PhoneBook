import { ChangeEvent } from "react";

import "./SelectOrder.css";

type SelectOrder = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectOrder: React.FC<SelectOrder> = ({ onChange }) => {
  let OrderByOptions = [
    { value: "FullName Asc", name: "Nome Ascendente" },
    { value: "FullName Desc", name: "Nome Descendente" },
    { value: "CreatedDate Asc", name: "Data Criação Ascendente" },
    { value: "CreatedDate Desc", name: "Data Criação Descendente" },
    { value: "UpdatedDate Asc", name: "Data Actualização Ascendente" },
    { value: "UpdatedDate Desc", name: "Data Actualização Descendente" },
  ];

  return (
    <select
      id="orderBy"
      onChange={onChange}
      defaultValue={""}
      className="order"
    >
      <option className="order-placeholder" value={""} disabled hidden>
        Ordenar
      </option>
      {OrderByOptions.map((option, i) => (
        <option key={i} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
