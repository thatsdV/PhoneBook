import placeholderImg from "../../../../assets/placeholder_user.png";
import { MdEmail } from "react-icons/md";
import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";

import "./Contact.css";

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
  return (
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
      <Link to={`/contact/${contact.id}`} className="more">
        <GrFormNext size={25} />
      </Link>
    </div>
  );
};
