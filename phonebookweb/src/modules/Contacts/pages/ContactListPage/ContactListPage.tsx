import { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, SearchBar } from "../../../../components";
import {
  AddContact,
  EditContact,
  Contact,
  ContactEmptySearch,
  SelectOrder,
} from "../../components";
import { useGetContacts } from "../../hooks";

import "./ContactListPage.css";

type Contact  = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: {
    number: string;
    type: string;
  }[];
  photo: { name: string; url: string };
  fullName: string;
};

export const ContactListPage = () => {
  const [isAddContact, setIsAddContact] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact>();

  const {
    pagedContacts,
    onChangeSearchCriteria,
    searchCriteria,
    handlePageClick,
    onSelectOrderHandler,
    cleanSearchCriteria,
    onDeleteAddOrEditHandler,
  } = useGetContacts();

  const onAddSubmitHandler = () => {
    setIsAddContact(false);
    onDeleteAddOrEditHandler();
  };

  const onEditSubmitHandler = () => {
    setIsEditContact(false);
    onDeleteAddOrEditHandler();
  };

  const onEditContactClickHandler = (contact: Contact) => {
    setIsEditContact(true);
    setContactToEdit(contact);
  };

  return (
    <>
      {isAddContact && (
        <AddContact
          onCancel={() => {
            setIsAddContact(false);
          }}
          reloadPageAfterAdd={onAddSubmitHandler}
        ></AddContact>
      )}
      {isEditContact && (
        <EditContact
          onCancel={() => setIsEditContact(false)}
          reloadPageAfterEdit={onEditSubmitHandler}
          contact={contactToEdit!}
        ></EditContact>
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
          <button onClick={() => setIsAddContact(true)}>
            Adicionar Contacto
          </button>
        </div>
        {pagedContacts?.contacts?.map((contact) => (
          <div className="contact" key={`ContactItem_${contact.id}`}>
            <Contact
              contact={contact}
              reloadPageAfterDelete={onDeleteAddOrEditHandler}
              editClick={onEditContactClickHandler}
            />
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
          <button>Voltar</button>
        </Link>
      </div>
    </>
  );
};
