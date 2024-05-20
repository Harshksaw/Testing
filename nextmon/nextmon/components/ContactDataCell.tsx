const ContactDataCell = ({ contact }) => {

  return <td className="text-center text-white px-6 py-4">{ contact.substring(0, 20)}</td>;
}


export default ContactDataCell;