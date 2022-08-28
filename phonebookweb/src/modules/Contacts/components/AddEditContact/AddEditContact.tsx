import { useForm } from "react-hook-form";
import { useAddContact } from "../../hooks";
import { FaUserEdit } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";

import "./AddEditContact.css";
import { useState } from "react";

interface PhoneNumbers {
  number: string;
  type: string;
}

interface ContactFormFields {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: { number: string; type: string }[];
  photo: string;
}

type AddEditContactProps = {
  onCancelOrSubmit: () => void;
  isEdit?: boolean;
  contact?: string;
};

export const AddEditContact: React.FC<AddEditContactProps> = ({
  onCancelOrSubmit,
  isEdit = false,
  contact = undefined,
}) => {
  const { addContact } = useAddContact();

  const { register, handleSubmit } = useForm<ContactFormFields>();
  const [enteredNumbers, setEnteredNumbers] = useState([1]);

  const onAddContactNumberHandler = () => {
    setEnteredNumbers((prevState: number[]) => {
      return [...prevState, enteredNumbers.length + 1];
    });
  };

  const onSubmitHandler = (data: ContactFormFields) => {
    //addContact(data);
    onCancelOrSubmit();
  };

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onCancelOrSubmit}></div>
      <div className="modal-form">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="modal-form__inputs">
            <div className="modal-form__inputs-title">
              <TiUserAdd size={45} />
              <h2>Adicionar Contacto</h2>
            </div>
            <div className="modal-form__inputs-data">
              <div>
                <input type="file" {...register("photo")}></input>
              </div>
              <input
                placeholder="Primeiro Nome"
                {...register("firstName")}
              ></input>
              <input
                placeholder="Último Nome"
                {...register("lastName")}
              ></input>
              <input placeholder="Email" {...register("firstName")}></input>
              <input placeholder="Morada" {...register("email")}></input>
              <div>
                <p>Contactos:</p>
                {enteredNumbers.map((_, i) => (
                  <>
                    <input
                      key={`PhoneNumber_${i}_number`}
                      {...register(`phoneNumbers.${i}.number`)}
                    ></input>
                    <select
                      key={`PhoneNumber_${i}_type`}
                      {...register(`phoneNumbers.${i}.type`)}
                    >
                      <option key="tlm" value="telemóvel">
                        Telemóvel
                      </option>
                      <option key="trb" value="telemóvel">
                        Trabalho
                      </option>
                      <option key="casa" value="telemóvel">
                        Casa
                      </option>
                      <option key="otr" value="telemóvel">
                        Outro
                      </option>
                    </select>
                  </>
                ))}
                <button onClick={onAddContactNumberHandler}>
                  Adicionar Contacto
                </button>
              </div>
            </div>
          </div>
          <div className="modal-form__buttons">
            <button onClick={onCancelOrSubmit} className="btn btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn btn-confirm">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
