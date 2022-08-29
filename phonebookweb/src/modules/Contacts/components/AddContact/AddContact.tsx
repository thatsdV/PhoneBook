import { useForm } from "react-hook-form";
import { useAddContact } from "../../hooks";
import { FaUserEdit } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";

import "./AddContact.css";
import { ChangeEvent, useState } from "react";

interface ContactFormFields {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: { number: string; type: string }[];
}

type AddContactProps = {
  onCancel: () => void;
  reloadPageAfterAdd: () => void;
};

export const AddContact: React.FC<AddContactProps> = ({
  onCancel,
  reloadPageAfterAdd,
}) => {
  const { addContact } = useAddContact();

  const { register, handleSubmit } = useForm<ContactFormFields>();
  const [enteredNumbers, setEnteredNumbers] = useState([1]);
  const [photo, setPhoto] = useState<File>();

  const onAddClickHandler = () => {
    setEnteredNumbers((prevState: number[]) => {
      return [...prevState, enteredNumbers.length + 1];
    });
  };

  const onPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoto(event.target.files![0]);
  };

  const onSubmitHandler = (data: ContactFormFields) => {
    addContact(data, photo);
    reloadPageAfterAdd();
  };

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onCancel}></div>
      <div className="modal-form">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="modal-form__inputs">
            <div className="modal-form__inputs-title">
              <TiUserAdd size={45} />
              <h2>Adicionar Contacto</h2>
            </div>
            <div className="modal-form__inputs-data">
              <div>
                <input type="file" name="photo" onChange={onPhotoChange} />
              </div>
              <div className="modal-form__inputs-data-field">
                <input
                  placeholder="Nome Próprio"
                  {...register("firstName")}
                ></input>
                <input placeholder="Apelido" {...register("lastName")} />
                <input placeholder="Email" {...register("email")} />
                <input placeholder="Morada" {...register("address")} />
              </div>
              <div>
                <p>Número de telefone:</p>
                {enteredNumbers.map((i) => (
                  <div key={`PhoneNumber_${i}`}>
                    <input
                      key={`PhoneNumber_${i}_number`}
                      {...register(`phoneNumbers.${i}.number`)}
                    />
                    <select
                      key={`PhoneNumber_${i}_type`}
                      {...register(`phoneNumbers.${i}.type`)}
                    >
                      <option key="option-telemóvel" value="telemóvel">
                        Telemóvel
                      </option>
                      <option key="option-trabalho" value="trabalho">
                        Trabalho
                      </option>
                      <option key="option-casa" value="casa">
                        Casa
                      </option>
                      <option key="option-outro" value="outro">
                        Outro
                      </option>
                    </select>
                  </div>
                ))}
                <button type="button" onClick={onAddClickHandler}>
                  Adicionar Contacto
                </button>
              </div>
            </div>
          </div>
          <div className="modal-form__buttons">
            <button onClick={onCancel} className="btn btn-cancel">
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
