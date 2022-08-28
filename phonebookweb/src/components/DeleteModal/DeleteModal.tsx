import { MdDeleteForever } from "react-icons/md";
import "./DeleteModal.css";

type DeleteModalProps = {
  type: "group" | "contact";
  name: string;
  onDelete: () => void;
  onCancel: () => void;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({
  type,
  name,
  onDelete,
  onCancel,
}) => {
  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onCancel}></div>
      <div className="modal-confirm">
        <div className="modal-content">
          <div className="modal-header">
            <div className="icon-box">
              <MdDeleteForever size={50} className="icon-close" />
            </div>
            <h4>
              {type === "group"
                ? `Tem a certeza que pretende apagar o grupo ${name}?`
                : `Tem a certeza que pretende apagar o contacto ${name}?`}
            </h4>
          </div>
          <div className="modal-body">
            <p>Este processo não pode ser revertido.</p>
          </div>
          <div className="modal-footer ">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>
              Apagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
