import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteContact, useGetContactById } from "../../hooks";
import { DeleteModal } from "../../../../components/";

import "./ContactDetailsPage.css";

export const ContactDetailsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getContactById(+id!);
  }, [id]);

  const { deleteContact } = useDeleteContact();
  const { contact, getContactById } = useGetContactById();

  const onDeleteHandler = () => {
    setShowModal(false);
    deleteContact(+id!);
  };

  const onDeleteClickHandler = () => {
    setShowModal(true);
  };

  const onCancelHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <DeleteModal
          type="contact"
          name={`${contact?.firstName} ${contact?.lastName}`}
          onDelete={onDeleteHandler}
          onCancel={onCancelHandler}
        ></DeleteModal>
      )}
      <div>
        <h1>
          Olá, este é o detalhe do contacto {contact?.firstName}{" "}
          {contact?.lastName}
        </h1>
        <h2>Aqui temos o email {contact?.email}</h2>
        <h2>Aqui temos a morada {contact?.address}</h2>
        {contact?.phoneNumbers.map((number) => (
          <h2>
            Aqui o número do tipo {number.type}: {number.number}
          </h2>
        ))}
        <Link to="/contact">
          <button>Voltar</button>
        </Link>
        <button className="btn-delete" onClick={onDeleteClickHandler}>
          <MdDeleteForever size={50} />
        </button>
      </div>
    </>
  );
};
