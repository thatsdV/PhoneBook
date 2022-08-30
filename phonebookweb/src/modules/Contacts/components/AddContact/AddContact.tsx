import { useForm } from "react-hook-form";
import { useAddContact } from "../../hooks";
import { MdRemoveCircle } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";

import "./AddContact.css";
import { ChangeEvent, useState } from "react";
import { SelectPhoneType } from "../SelectPhoneType";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormFields>();

  const [enteredNumbers, setEnteredNumbers] = useState([1]);
  const [photo, setPhoto] = useState<File>();

  const onAddClickHandler = () => {
    setEnteredNumbers((prevState: number[]) => {
      return [...prevState, enteredNumbers.length + 1];
    });
  };

  const onRemovePhoneClickHandler = () => {
    const slicedArray = enteredNumbers.slice(0, -1);
    setEnteredNumbers([...slicedArray]);
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
              <div className="image-preview">
                {photo ? (
                  <>
                    <img src={URL.createObjectURL(photo)} />
                    <button type="button" onClick={() => setPhoto(undefined)}>
                      Remover
                    </button>
                  </>
                ) : (
                  <>
                    <label
                      className="image__upload__button"
                      htmlFor="file-upload"
                    >
                      Adicionar Fotografia
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={onPhotoChange}
                    />
                  </>
                )}
              </div>
              <div className="modal-form__inputs-data-field">
                <input
                  placeholder="Nome Próprio"
                  {...register("firstName", { required: true })}
                ></input>
                {errors.firstName && (
                  <span className="form-error">Campo Obrigatório</span>
                )}
                <input
                  placeholder="Apelido"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="form-error">Campo Obrigatório</span>
                )}
                <input placeholder="Email" {...register("email")} />
                <input placeholder="Morada" {...register("address")} />
              </div>
              <div>
                <p>Número de telefone:</p>
                {enteredNumbers.map((i) => (
                  <div key={`PhoneNumber_${i}`} className="modal-form__phone">
                    {i != 1 && (
                      <MdRemoveCircle
                        size={35}
                        className="modal-form__phone-remove"
                        onClick={onRemovePhoneClickHandler}
                      />
                    )}
                    <input
                      key={`PhoneNumber_${i}_number`}
                      {...register(`phoneNumbers.${i}.number`)}
                    />
                    <SelectPhoneType
                      selectRegister={register(`phoneNumbers.${i}.type`)}
                    />
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
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
