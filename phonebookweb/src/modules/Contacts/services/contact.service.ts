import axios from "axios";

interface NewContact {
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

const url = "https://localhost:7080/api/contact";

export class ContactService {
  static CreateNewContact(contact: NewContact) {
    axios.post(url, {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      email: contact.email,
      phoneNumbers:
        contact.phoneNumbers !== undefined && contact.phoneNumbers.length > 0
          ? contact.phoneNumbers.reduce(
              (filtered: PhoneNumbers[], phoneNumber) => {
                if (phoneNumber.number.length > 0) {
                  filtered.push({
                    number: phoneNumber.number,
                    type: phoneNumber.type,
                  });
                }
                return filtered;
              },
              []
            )
          : [],
      photo: contact.photo,
    });
  }

  static GetContactById(id: number) {
    return axios.get(url.concat(`/${id}`));
  }

  static GetContactsList(
    pageNumber: number,
    itemsPerPage: number,
    searchCriteria: string
  ) {
    const urlQuery = searchCriteria
      ? `?PageNumber=${pageNumber}&ItemsPerPage=${itemsPerPage}&SearchCriteria=${searchCriteria}`
      : `?PageNumber=${pageNumber}&ItemsPerPage=${itemsPerPage}`;

    return axios.get(url.concat(urlQuery));
  }

  static DeleteContact(id: number) {
    return axios.delete(url.concat(`/${id}`));
  }

  static UpdateContact(id: number) {
    return axios.put(url.concat(`/${id}`));
  }
}
