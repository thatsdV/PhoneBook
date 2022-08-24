import { Link } from "react-router-dom";

export const ContactGroupListPage = () => {
  return (
    <div>
      <h1>Olá, aqui vamos apresentar todos os grupos de contacto</h1>
      <Link to="/group/1">
        <button>Ir para detalhe</button>
      </Link>
      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
};
