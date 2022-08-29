import { ContactService } from "../services";

interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: PhoneNumbers[];
}

interface PhoneNumbers {
  number: string;
  type: string;
}

export const useAddContact = () => {
  const addContact = (contact: Contact, photo?: File) => {
    ContactService.CreateNewContact(contact, photo);
  };

  return { addContact };
};
