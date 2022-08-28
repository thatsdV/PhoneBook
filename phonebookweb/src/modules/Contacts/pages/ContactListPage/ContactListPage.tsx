import { Link } from "react-router-dom";
import { Button, Pagination, SearchBar } from "../../../../components";
import {
  AddEditContact,
  Contact,
  ContactEmptySearch,
  SelectOrder,
} from "../../components";
import { useGetContacts } from "../../hooks";

import "./ContactListPage.css";

export const ContactListPage = () => {
  const {
    pagedContacts,
    onChangeSearchCriteria,
    isAddOrEditContact,
    setIsAddOrEditContact,
    searchCriteria,
    handlePageClick,
    onSelectOrderHandler,
    cleanSearchCriteria,
  } = useGetContacts();

  return (
    <>
      {isAddOrEditContact && (
        <AddEditContact
          onCancelOrSubmit={() => setIsAddOrEditContact(false)}
        ></AddEditContact>
      )}
      <div className="list">
        <div>
          <h1>Lista de Contactos</h1>
        </div>
        <SearchBar
          tip="Escreva o nome do contacto..."
          onChange={onChangeSearchCriteria}
          cleanSearch={cleanSearchCriteria}
        />
        <div>
          <SelectOrder onChange={onSelectOrderHandler} />
          <button onClick={() => setIsAddOrEditContact(true)}>
            Adicionar Contacto
          </button>
        </div>
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
      </div>
    </>
  );
};
