import { Link } from "react-router-dom";

export const ContactGroupDetailsPage = () => {
  return (
    <div>
      <h1>
        Olá, este é o detalhe deste grupo de contactos onde vamos apresentar
        todos os contactos que fazem parte deste grupo
      </h1>
      <Link to="/group">
        <button>Voltar</button>
      </Link>
    </div>
  );
};
