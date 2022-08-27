type ContactEmptySearchProps = {
  search: string;
};

export const ContactEmptySearch: React.FC<ContactEmptySearchProps> = ({
  search,
}) => {
  return (
    <div className="list-empty">
      {search ? (
        <>
          <strong>Nenhum contato encontrado...</strong>
          <p>Busque por outro ou adicione um novo</p>
        </>
      ) : (
        <>
          <strong>Não existem contactos na lista</strong>
          <p>Adicione novos contactos</p>
        </>
      )}
    </div>
  );
};

//className="list-empty"
