import { ChangeEvent, useEffect, useState } from "react";
import { ContactService } from "../services";

interface PhoneNumbers {
  number: string;
  type: string;
}

interface ContactEntity {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: PhoneNumbers[];
  photo: string;
}

interface PagedContacts {
  totalPages: number;
  totalRecords: number;
  contacts: ContactEntity[];
}

export const useGetContacts = () => {
  const [pagedContacts, setPagedContacts] = useState<PagedContacts>();
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAdding, setIsAdding] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");

  useEffect(() => {
    getContacts(pageNumber, itemsPerPage, searchCriteria);
  }, [isAdding, pageNumber, itemsPerPage, searchCriteria]);

  const toggleAddingState = () => {
    setIsAdding((currentState) => !currentState);
  };

  const handlePageClick = (event: { selected: number }) => {
    setPageNumber(event.selected + 1);
  };

  const onChangeSearchCriteria = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria(event.target.value);
  };

  const getContacts = (
    pageNumber: number,
    itemsPerPage: number,
    searchCriteria: string
  ) => {
    ContactService.GetContactsList(
      pageNumber,
      itemsPerPage,
      searchCriteria
    ).then((response) => {
      setPagedContacts(response.data);
    });
  };

  return {
    pagedContacts,
    getContacts,
    onChangeSearchCriteria,
    toggleAddingState,
    setPageNumber,
    setItemsPerPage,
    searchCriteria,
  };
};
