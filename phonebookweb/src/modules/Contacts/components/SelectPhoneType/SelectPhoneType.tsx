import { UseFormRegisterReturn } from "react-hook-form";

interface SelectPhoneTypeProps {
  selectRegister: UseFormRegisterReturn;
  selected?: string;
}

export const SelectPhoneType: React.FC<SelectPhoneTypeProps> = ({
  selectRegister,
  selected = "",
}) => {
  return (
    <select {...selectRegister} defaultValue={selected}>
      <option key="type_1" value="telemóvel">
        Telemóvel
      </option>
      <option key="type_0" value="telemóvel">
        Trabalho
      </option>
      <option key="type_3" value="telemóvel">
        Casa
      </option>
      <option key="type_4" value="telemóvel">
        Outro
      </option>
    </select>
  );
};
