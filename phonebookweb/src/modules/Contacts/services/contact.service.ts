import axios from "axios";

interface PhoneNumbers {
  number: string;
  type: string;
}

const url = "https://localhost:7080/api/contact";

export class ContactService {
  static CreateNewContact(
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    phoneNumbers: PhoneNumbers[],
    photo: string
  ) {
    axios.post(url, {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      phoneNumbers:
        phoneNumbers !== undefined && phoneNumbers.length > 0
          ? phoneNumbers.reduce((filtered: PhoneNumbers[], phoneNumber) => {
              if (phoneNumber.number.length > 0) {
                filtered.push({
                  number: phoneNumber.number,
                  type: phoneNumber.type,
                });
              }
              return filtered;
            }, [])
          : [],
      photo: photo,
    });
  }

  static GetContactById(id: number) {
    return axios.get(url.concat(`/${id}`));
  }

  static GetContactsList(pageNumber: number, pageSize: number) {
    return axios.get(url.concat(`?PageNumber=${pageNumber}&PageSize=${pageSize}`));
  }

  static DeleteContact(id: number) {
    return axios.delete(url.concat(`/${id}`));
  }

  static UpdateContact(id: number) {
    return axios.put(url.concat(`/${id}`));
  }
}
