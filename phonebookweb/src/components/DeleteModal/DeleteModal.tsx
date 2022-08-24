import { GrClose } from "react-icons/gr";
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
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header flex-column">
            <div className="icon-box">
              <GrClose size={50} className="icon-close" />
            </div>
            <h4>
              {type === "group"
                ? `Tem a certeza que pretende apagar o grupo ${name}?`
                : `Tem a certeza que pretende apagar o contacto ${name}?`}
            </h4>
          </div>
          <div className="modal-body">
            <p>
              Tem a certeza que pretende prosseguir? Este processo não pode ser
              revertido.
            </p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
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
