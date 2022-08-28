import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  fullName: string;
}

interface PagedContacts {
  totalPages: number;
  totalRecords: number;
  contacts: ContactEntity[];
}

export const useGetContacts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagedContacts, setPagedContacts] = useState<PagedContacts>();
  const [pageNumber, setPageNumber] = useState(1);
  const [isAddOrEditContact, setIsAddOrEditContact] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const order = searchParams.get("order");

  useEffect(() => {
    getContacts(
      page ? +page : pageNumber,
      10,
      search ? search : searchCriteria,
      order ? order : orderBy
    );

    page ?? setPageNumber(+page!);
    search ?? setSearchCriteria(search!);
    order ?? setOrderBy(order!);
  }, [isAddOrEditContact, pageNumber, searchCriteria, orderBy]);

  const getContacts = (
    pageNumber: number,
    itemsPerPage: number,
    searchCriteria: string,
    orderBy: string
  ) => {
    ContactService.GetContactsList(
      pageNumber,
      itemsPerPage,
      searchCriteria,
      orderBy
    ).then((response) => {
      setPagedContacts(response.data);
    });
  };

  const onChangeSearchCriteria = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria(event.target.value);
    if (event.target.value) {
      searchParams.set("search", `${event.target.value}`);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const cleanSearchCriteria = () => {
    setSearchCriteria("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  const handlePageClick = (event: { selected: number }) => {
    setPageNumber(event.selected + 1);

    if (event.selected === 0) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", `${event.selected + 1}`);
    }

    setSearchParams(searchParams);
  };

  const onSelectOrderHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(event.target.value);
    searchParams.set("order", `${event.target.value}`);
    setSearchParams(searchParams);
  };

  return {
    pagedContacts,
    getContacts,
    searchCriteria,
    onChangeSearchCriteria,
    cleanSearchCriteria,
    isAddOrEditContact,
    setIsAddOrEditContact,
    handlePageClick,
    onSelectOrderHandler,
  };
};
