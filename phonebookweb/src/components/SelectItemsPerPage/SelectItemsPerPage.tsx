import { ChangeEvent } from "react";

type SelectItemsPerPageProps = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectItemsPerPage: React.FC<SelectItemsPerPageProps> = ({
  onChange,
}) => {
  return (
    <div>
      <select id="itemsPerPage" onChange={onChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};
