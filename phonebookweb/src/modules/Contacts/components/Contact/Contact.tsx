import placeholderImg from "../../../../assets/placeholder_user.png";
import { MdEmail } from "react-icons/md";
import { GrFormNext, GrFormDown } from "react-icons/gr";
import { Link } from "react-router-dom";

import "./Contact.css";
import { useState } from "react";
import { ContactDetails } from "..";

interface ContactProps {
  contact: {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phoneNumbers: {
      number: string;
      type: string;
    }[];
    photo: string;
  };
}

export const Contact = ({ contact }: ContactProps): JSX.Element => {
  const [isDetailsOpen, setisDetailsOpen] = useState(false);

  const toogleIsDetailsOpenClick = () => {
    setisDetailsOpen((prevState) => !prevState);
  };

  return (
    <div className="accordion">
      <div className="contact" key={`Contact_${contact.id}`}>
        <div>
          {/* <img src={props.contact.firstName ?? placeholderImg} alt={props.contact.lastName} /> */}
          <img src={placeholderImg} alt={contact.lastName} />
          <div className="details">
            <strong>{`${contact.firstName} ${contact.lastName}`}</strong>
            <span>{contact.email}</span>
          </div>
        </div>
        <button className="email">
          <MdEmail size={20} />
        </button>

        {isDetailsOpen ? (
          <GrFormDown size={25} onClick={toogleIsDetailsOpenClick} />
        ) : (
          <GrFormNext size={25} onClick={toogleIsDetailsOpenClick} />
        )}
      </div>
      {isDetailsOpen && <ContactDetails id={contact.id} />}

      {/* <Link to={`/contact/${contact.id}`} className="more">
        <GrFormNext size={25} onClick={toogleIsDetailsOpenClick} />
      </Link> */}
    </div>
  );
};
