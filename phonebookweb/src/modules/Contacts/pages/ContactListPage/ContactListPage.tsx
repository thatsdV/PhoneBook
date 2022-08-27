import { ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Button,
  Pagination,
  SearchBar,
  SelectItemsPerPage,
} from "../../../../components";
import { AddContact, Contact, ContactEmptySearch } from "../../components";
import { useGetContacts } from "../../hooks";

import "./ContactListPage.css";

export const ContactListPage = () => {
  const {
    pagedContacts,
    onChangeSearchCriteria,
    toggleAddingState,
    setPageNumber,
    setItemsPerPage,
    searchCriteria,
  } = useGetContacts();

  let [searchParams, setSearchParams] = useSearchParams();

  const handlePageClick = (event: { selected: number }) => {
    setPageNumber(event.selected + 1);
  };

  const handleItemsPerPageSelected = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(+event.target.value);
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
      {pagedContacts?.contacts?.map((contact) => (
        <div className="contact" key={`ContactItem_${contact.id}`}>
          <Contact contact={contact} />
        </div>
      ))}
      {/* {pagedContacts?.contacts? && <ContactEmptySearch search={searchCriteria} />} */}
      <Pagination onPageClick={handlePageClick} pageCount={pagedContacts?.totalPages!} />
      <SelectItemsPerPage onChange={handleItemsPerPageSelected} />
      <Link to="/">
        <Button label="Voltar" />
      </Link>
    </section>
  );
};
