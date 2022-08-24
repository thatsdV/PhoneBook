import { Link, useParams, Location} from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import "./ContactDetailsPage.css";
import { useDeleteContact } from "../../hooks/use-delete-contact.hook";
import { confirmAlert } from "react-confirm-alert";
import { DeleteModal } from "../../../../components/DeleteModal/DeleteModal";
import { useEffect, useState } from "react";
import { useGetContactById } from "../../hooks/use-get-contactById.hook";

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
        <h1>Olá, este é o detalhe do contacto {contact?.firstName} {contact?.lastName}</h1>
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
