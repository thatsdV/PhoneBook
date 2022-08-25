import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Button, SearchBar } from "../../../../components";
import { AddContact, Contact } from "../../components";
import { useGetContacts } from "../../hooks";
import classnames from "classnames";

import styles from "./Pagination.module.css";
import "./Pagination.css";
import "./ContactListPage.css";
import { ChangeEvent } from "react";

export const ContactListPage = () => {
  const {
    contacts,
    onChangeSearchCriteria,
    toggleAddingState,
    setPageNumber,
    setItemsPerPage,
    searchCriteria,
  } = useGetContacts();

  const handlePageClick = (event: { selected: number }) => {
    setPageNumber(event.selected + 1);
  };

  const handleItemsPerPageSelected = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
    //setItemsPerPage(event.selected);
  };

  return (
    <section className="list">
      <div>
        <h1>Lista de Contactos</h1>
      </div>
      <div>
        <SearchBar
          tip="Escreva o nome do contacto..."
          onChange={onChangeSearchCriteria}
        />
      </div>
      {contacts.map((contact) => (
        <div className="contact" key={`ContactItem_${contact.id}`}>
          <Contact contact={contact} />
        </div>
      ))}
      {contacts.length <= 0 && (
        <div className="list-empty">
          <div>
            {searchCriteria ? (
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
        </div>
      )}
      <div className={classnames("pagination", styles.pagination)}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={10}
          previousLabel="<"
        />
        <select id="itemsPerPage" onChange={handleItemsPerPageSelected}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <Link to="/">
        <Button label="Voltar" />
      </Link>
    </section>
  );
};
