import { MdEmail, MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { GrFormDown } from "react-icons/gr";

import "./Contact.css";
import { EventHandler, useState } from "react";
import { ContactExpanded } from "..";
import { DeleteModal } from "../../../../components";
import { useDeleteContact } from "../../hooks";

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

interface ContactProps {
  contact: Contact;
  reloadPageAfterDelete: () => void;
  editClick: (contact: Contact) => void;
}

export const Contact = ({
  contact,
  reloadPageAfterDelete,
  editClick,
}: ContactProps): JSX.Element => {
  const [isDetailsOpen, setisDetailsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { deleteContact } = useDeleteContact();

  const toogleIsDetailsOpenClick = () => {
    setisDetailsOpen((prevState) => !prevState);
  };

  const toggleDeleteModal = () => {
    setShowModal(true);
  };

  const onCancelClickHandler = () => {
    setShowModal(false);
  };

  const onDeleteClickHandler = () => {
    deleteContact(contact.id);
    setShowModal(false);
    reloadPageAfterDelete();
  };

  const onEmailClickHandler = (e: { preventDefault: () => void }) => {
    window.open(`mailto:${contact.email}`);
    e.preventDefault();
  };

  const onEditClickHandler = () => {
    editClick(contact);
  }

  return (
    <>
      {showModal && (
        <DeleteModal
          type="contact"
          name={`${contact?.firstName} ${contact?.lastName}`}
          onDelete={onDeleteClickHandler}
          onCancel={onCancelClickHandler}
        ></DeleteModal>
      )}
      <div className="accordion">
        <div className="accordion-header" key={`Contact_${contact.id}`}>
          <div className="accordion-header-details">
            {contact.photo ? (
              <img src={contact.photo.url} alt={contact.lastName} />
            ) : (
              <div className="contact-initials">
                {`${contact.firstName.substring(
                  0,
                  1
                )}${contact.lastName.substring(0, 1)}`}
              </div>
            )}
            <div className="details">
              <strong>{contact.fullName}</strong>
              {contact.phoneNumbers.length > 0 && (
                <span>{contact.phoneNumbers[0].number}</span>
              )}
            </div>
          </div>
          <MdEmail
            size={20}
            className="email"
            title="Enviar Email"
            onClick={onEmailClickHandler}
          />
          <MdDeleteForever
            size={20}
            className="delete"
            onClick={toggleDeleteModal}
            title="Apagar Contacto"
          />
          <MdOutlineEdit
            size={20}
            className="edit"
            title="Editar Contacto"
            onClick={onEditClickHandler}
          />
          <GrFormDown
            size={25}
            onClick={toogleIsDetailsOpenClick}
            className={`contact-expand ${
              isDetailsOpen && "contact-expand-rotated"
            }`}
            title="Mostrar Detalhes"
          />
        </div>
        {isDetailsOpen && <ContactExpanded id={contact.id} />}
      </div>
    </>
  );
};
