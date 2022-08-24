import { useState } from "react";
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

export const useGetContacts = () => {
  const [contacts, setContacts] = useState<ContactEntity[]>([]);
 
  const getContacts = (pageNumber: number, pageSize: number) => {
    ContactService.GetContactsList(pageNumber, pageSize)
      .then((response) => {
        setContacts(response.data);
      });
  };

  return { contacts, getContacts };
};
