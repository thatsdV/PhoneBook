import { ContactService } from "../services";

interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: PhoneNumbers[];
  photo: string;
}

interface PhoneNumbers {
  number: string;
  type: string;
}

export const useAddContact = () => {
  const addContact = (contact: Contact) => {
    ContactService.CreateNewContact(contact);
  };

  return { addContact };
};
