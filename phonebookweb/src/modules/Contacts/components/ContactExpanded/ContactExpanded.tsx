import { useEffect } from "react";
import { MdWorkOutline, MdDevicesOther } from "react-icons/md";
import { AiOutlineMobile } from "react-icons/ai";
import { BsHouse } from "react-icons/bs";
import { useGetContactById } from "../../hooks";

import "./ContactExpanded.css";
type ContactExpandedProps = {
  id: number;
};

export const ContactExpanded: React.FC<ContactExpandedProps> = ({ id }) => {
  useEffect(() => {
    getContactById(id);
  }, [id]);

  const { contact, getContactById } = useGetContactById();

  const getIconForPhoneType = (phoneType: string) => {
    switch (phoneType) {
      case "telemóvel":
        return <AiOutlineMobile size={25} title="Telemóvel" />;
      case "casa":
        return <BsHouse size={25} title="Casa"/>;
      case "trabalho":
        return <MdWorkOutline size={25} title="Trabalho"/>;
      default:
        return <MdDevicesOther size={25} title="Outro"/>;
    }
  };

  return (
    <div className="accordion-item" key={`Accordion-Item_${id}`}>
      <div>
        {contact?.email && (
          <>
            <strong>Email:</strong>
            <p>{contact?.email}</p>
          </>
        )}
        {contact?.address && (
          <>
            <strong>Morada:</strong>
            <p>{contact?.address}</p>
          </>
        )}
        {contact?.phoneNumbers !== undefined &&
          contact.phoneNumbers.length > 0 && <strong>Contactos:</strong>}
        {contact?.phoneNumbers.map((number) => (
          <div className="accordion-item-number">
            {getIconForPhoneType(number.type)}
            {number.number}
          </div>
        ))}
      </div>
    </div>
  );
};
