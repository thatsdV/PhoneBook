import axios from "axios";

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

const url = "https://localhost:7080/api/contact";

export class ContactService {
  static CreateNewContact(contact: Contact, picture?: File) {
    var formData = new FormData();

    const numbers: PhoneNumbers[] =
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
        : [];

    formData.append("firstName", contact.firstName);
    formData.append("lastName", contact.lastName);
    formData.append("fullName", `${contact.firstName} ${contact.lastName}`);
    formData.append("address", contact.address);
    formData.append("email", contact.email);
    formData.append("photo", picture!);

    for (var i = 0; i < numbers.length; i++) {
      formData.append(`phoneNumbers[${i}].type`, numbers[i].type);
      formData.append(`phoneNumbers[${i}].number`, numbers[i].number);
    }

    return axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static GetContactById(id: number) {
    return axios.get(url.concat(`/${id}`));
  }

  static GetContactsList(
    pageNumber: number,
    itemsPerPage: number,
    searchCriteria: string,
    orderBy: string
  ) {
    let urlQuery = `?PageNumber=${pageNumber}&ItemsPerPage=${itemsPerPage}`;

    urlQuery = searchCriteria
      ? urlQuery.concat(`&SearchCriteria=${searchCriteria}`)
      : urlQuery;

    urlQuery = orderBy ? urlQuery.concat(`&OrderBy=${orderBy}`) : urlQuery;

    return axios.get(url.concat(urlQuery));
  }

  static DeleteContact(id: number) {
    return axios.delete(url.concat(`/${id}`));
  }

  static UpdateContact(id: number) {
    return axios.put(url.concat(`/${id}`));
  }
}
