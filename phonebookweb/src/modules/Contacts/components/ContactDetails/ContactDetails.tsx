import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteContact, useGetContactById } from "../../hooks";
import { DeleteModal } from "../../../../components/";

import "./ContactDetails.css";
type ContactDetailsProps = {
  id: number;
};

export const ContactDetails: React.FC<ContactDetailsProps> = ({ id }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getContactById(id);
  }, [id]);

  const { deleteContact } = useDeleteContact();
  const { contact, getContactById } = useGetContactById();

  const onDeleteHandler = () => {
    setShowModal(false);
    deleteContact(id);
  };

  const onDeleteClickHandler = () => {
    setShowModal(true);
  };

  const onCancelHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="accordion-item">
      {showModal && (
        <DeleteModal
          type="contact"
          name={`${contact?.firstName} ${contact?.lastName}`}
          onDelete={onDeleteHandler}
          onCancel={onCancelHandler}
        ></DeleteModal>
      )}
      <div>
        <p>
          Olá, este é o detalhe do contacto {contact?.firstName}{" "}
          {contact?.lastName}
        </p>
        <p>Aqui temos o email {contact?.email}</p>
        <p>Aqui temos a morada {contact?.address}</p>
        {contact?.phoneNumbers.map((number) => (
          <p>
            Aqui o número do tipo {number.type}: {number.number}
          </p>
        ))}
        {/* <Link to="/contact">
          <button>Voltar</button>
        </Link> */}
        <button className="btn-delete" onClick={onDeleteClickHandler}>
          <MdDeleteForever size={50} />
        </button>
      </div>
    </div>
  );
};
