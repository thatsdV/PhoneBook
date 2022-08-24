import { ContactService } from "../services";

export const useDeleteContact = () => { 
  const deleteContact = (id: number) => {
    ContactService.DeleteContact(id);
  };

  return { deleteContact };
};
