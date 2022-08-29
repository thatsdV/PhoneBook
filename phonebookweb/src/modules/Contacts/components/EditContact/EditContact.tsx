import { useForm } from "react-hook-form";
import { useAddContact } from "../../hooks";
import { FaUserEdit } from "react-icons/fa";

import "./EditContact.css";
import { ChangeEvent, useState } from "react";

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: {
    number: string;
    type: string;
  }[];
  photo: { name: string; url: string };
  fullName: string;
};

interface ContactFormFields {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: { number: string; type: string }[];
}

type EditContactProps = {
  onCancel: () => void;
  reloadPageAfterEdit: () => void;
  contact: Contact;
};

export const EditContact: React.FC<EditContactProps> = ({
  onCancel,
  reloadPageAfterEdit,
  contact,
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
    reloadPageAfterEdit();
  };

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onCancel}></div>
      <div className="modal-form">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="modal-form__inputs">
            <div className="modal-form__inputs-title">
              <FaUserEdit size={45} />
              <h2>Editar Contacto</h2>
            </div>
            <div className="modal-form__inputs-data">
              <div>
                <input type="file" name="photo" onChange={onPhotoChange} />
              </div>
              <div className="modal-form__inputs-data-field">
                <input
                  placeholder="Nome Próprio"
                  {...register("firstName")}
                  defaultValue={contact.firstName}
                ></input>
                <input
                  placeholder="Apelido"
                  {...register("lastName")}
                  defaultValue={contact.lastName}
                />
                <input
                  placeholder="Email"
                  {...register("email")}
                  defaultValue={contact.email}
                />
                <input
                  placeholder="Morada"
                  {...register("address")}
                  defaultValue={contact.address}
                />
              </div>
              {/* <div>
                <p>Número de telefone:</p>
                {enteredNumbers.map((i) => (
                  <>
                    <input
                      key={`PhoneNumber_${i}_number`}
                      {...register(`phoneNumbers.${i}.number`)}
                      value={
                        contact.phoneNumbers
                          ? contact.phoneNumbers[i].number
                          : undefined
                      }
                    />
                    <select
                      key={`PhoneNumber_${i}_type`}
                      {...register(`phoneNumbers.${i}.type`)}
                      defaultValue={
                        contact.phoneNumbers
                          ? contact.phoneNumbers[i].type
                          : undefined
                      }
                    >
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
                  </>
                ))}
                <button onClick={onAddClickHandler}>Adicionar Contacto</button>
              </div> */}
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
