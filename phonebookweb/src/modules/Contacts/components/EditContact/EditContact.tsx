import { useForm } from "react-hook-form";
import { FaUserEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import { useUpdateContact } from "../../hooks/use-update-contact.hook";
import { SelectPhoneType } from "../SelectPhoneType";

import "./EditContact.css";

type PhoneNumbers = {
  id: number;
  number: string;
  type: string;
};

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: PhoneNumbers[];
  photo: { id: number; name: string; url: string };
  fullName: string;
};

interface ContactFormFields {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: { id: number; number: string; type: string }[];
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
  const { updateContact, photo, setPhoto } = useUpdateContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormFields>();

  const [enteredNumbers, setEnteredNumbers] = useState<PhoneNumbers[]>(
    contact.phoneNumbers && contact.phoneNumbers.length > 0
      ? [...contact.phoneNumbers]
      : [{ id: 1, number: "", type: "" }]
  );

  const onAddClickHandler = () => {
    setEnteredNumbers((prevState: PhoneNumbers[]) => {
      return [
        ...prevState,
        { id: enteredNumbers.length + 1, number: "", type: "" },
      ];
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
    updateContact(contact.id, data, photo);
    reloadPageAfterEdit();
  };

  const onRemovePhoto = () => {
    if (contact.photo && contact.photo.url) {
      contact.photo.url = "";
    } else {
      setPhoto(undefined);
    }
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
              <div className="image-preview">
                {photo || (contact.photo && contact.photo.url) ? (
                  <>
                    {contact.photo && contact.photo.url ? (
                      <img src={contact.photo.url} />
                    ) : (
                      <img src={URL.createObjectURL(photo!)} />
                    )}
                    <button type="button" onClick={onRemovePhoto}>
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
                  defaultValue={contact.firstName}
                ></input>
                {errors.firstName && (
                  <span className="form-error">Campo Obrigatório</span>
                )}
                <input
                  placeholder="Apelido"
                  {...register("lastName", { required: true })}
                  defaultValue={contact.lastName}
                />
                {errors.lastName && (
                  <span className="form-error">Campo Obrigatório</span>
                )}
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
              <div>
                <p>Número de telefone:</p>
                {enteredNumbers.map((phone, i) => (
                  <div
                    key={`PhoneNumber_${i}`}
                    className="modal-form__phone"
                  >
                    {i > 1 && (
                      <MdRemoveCircle
                        size={35}
                        className="modal-form__phone-remove"
                        onClick={onRemovePhoneClickHandler}
                      />
                    )}
                    <input
                      key={`PhoneNumber_${i}_number`}
                      {...register(`phoneNumbers.${i}.number`)}
                      defaultValue={phone.number}
                    />
                    <SelectPhoneType
                      key={`PhoneNumber_${i}_type`}
                      selectRegister={register(`phoneNumbers.${i}.type`)}
                      selected={phone.type}
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
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
