import { useState } from "react";
import { ContactService } from "../services";

interface PhoneNumbers {
  id: number;
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

export const useGetContactById = () => {
  const [contact, setContact] = useState<ContactEntity>();
 
  const getContactById = (id: number) => {
    ContactService.GetContactById(id)
      .then((response) => {
        setContact(response.data);
      });
  };

  return { contact, getContactById };
};
