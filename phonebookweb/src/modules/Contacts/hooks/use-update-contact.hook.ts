import axios from "axios";
import { useState } from "react";
import { ContactService } from "../services";

interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: PhoneNumbers[];
}

interface PhoneNumbers {
  id: number;
  number: string;
  type: string;
}

interface Photo {
  id: number;
  url: string;
  name: string;
}

export const useUpdateContact = () => {
  const [photo, setPhoto] = useState<File>();

  const updateContact = (id: number, contact: Contact, photo?: File) => {
    ContactService.UpdateContact(id, contact, photo);
  };

  return { updateContact, photo, setPhoto };
};
