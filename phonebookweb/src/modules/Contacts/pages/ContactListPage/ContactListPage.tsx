import { Link } from "react-router-dom";
import {
  Button,
  Pagination,
  SearchBar,
  SelectOrder,
} from "../../../../components";
import { AddContact, Contact, ContactEmptySearch } from "../../components";
import { useGetContacts } from "../../hooks";

import "./ContactListPage.css";

export const ContactListPage = () => {
  const {
    pagedContacts,
    onChangeSearchCriteria,
    toggleAddingState,
    searchCriteria,
    handlePageClick,
    onSelectOrderHandler,
    cleanSearchCriteria,
  } = useGetContacts();

  return (
    <section className="list">
      <div>
        <h1>Lista de Contactos</h1>
      </div>
      <SearchBar
        tip="Escreva o nome do contacto..."
        onChange={onChangeSearchCriteria}
        cleanSearch={cleanSearchCriteria}
      />
      <SelectOrder onChange={onSelectOrderHandler} />
      {pagedContacts?.contacts?.map((contact) => (
        <div className="contact" key={`ContactItem_${contact.id}`}>
          <Contact contact={contact} />
        </div>
      ))}
      {pagedContacts?.contacts !== undefined &&
      pagedContacts?.contacts.length <= 0 ? (
        <ContactEmptySearch search={searchCriteria} />
      ) : (
        <>
          <Pagination
            onPageClick={handlePageClick}
            pageCount={pagedContacts?.totalPages!}
          />
        </>
      )}
      <Link to="/">
        <Button label="Voltar" />
      </Link>
    </section>
  );
};
