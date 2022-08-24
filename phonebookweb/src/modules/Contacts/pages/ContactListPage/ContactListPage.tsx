import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Button } from "../../../../components";
import { AddContact, Contact } from "../../components";
import { useGetContacts } from "../../hooks/use-get-contactsList.hook";

import "./ContactListPage.css";
export const ContactListPage = () => {
  const { contacts, getContacts } = useGetContacts();
  const [isAdding, setIsAdding] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    getContacts(pageNumber, itemsPerPage);
  }, [isAdding, pageNumber, itemsPerPage]);

  const toggleAddingState = () => {
    setIsAdding((currentState) => !currentState);
  };

  const handlePageClick = (event: { selected: number }) => {
    setPageNumber(event.selected + 1);
  };

  return (
    <section className="list">
      <div>
        <h1>Lista de Contactos</h1>
      </div>
      {contacts.map((contact) => (
        <div className="contact" key={`ContactItem_${contact.id}`}>
          <Contact contact={contact} />
        </div>
      ))}
      {contacts.length <= 0 && (
        <div className="list-empty">
          <div>
            {/* {search ? (
                <>
                  <strong>Nenhum contato encontrado...</strong>
                  <p>Busque por outro ou adicione um novo</p>
                </>
              ) : ( */}
            <>
              <strong>Não existem contactos na lista</strong>
              <p>Adicione novos contactos</p>
            </>
            {/* )} */}
          </div>
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Próxima"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="Anterior"
      />
      <Link to="/">
        <Button label="Voltar" />
      </Link>
    </section>
  );
};
