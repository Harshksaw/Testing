import exp from "constants";
import ActionButtons from "./ActionButton";

const Table = ({ columns, contacts, selectedContacts, onSelectChange, open, editData, handleChange, handleEdit, handleCancel, handleDelete }) =>
    {

        const handleEditClick = (id) => {
            const contactToEdit = contacts.find(contact => contact._id === id);
            setEditData(contactToEdit);
            setOpen(true);
          };
          const handleEdit = async() => {
            // Update the contact in your state or backend
            // ...
        
            const res = await axios.put(`http://localhost:3000/api/contacts/${editData._id}`, editData);
            if (res.status === 200) {
              setOpen(false);
              onDelete()
              setRefresh(!refresh); // Refresh the contact list
            } else {
              console.error('Error updating contact');
            }
            setOpen(false);
          };
        
        
        
          const handleDelete = async (id: string) => {
            // Implement API call to delete the contact
            const response = await axios.delete(`http://localhost:3000/api/contacts/${id}`);
            if (response.status === 200) {
              onDelete()
        
        
              setRefresh(!refresh); // Refresh the contact list
            } else {
              console.error('Error deleting contact');
            }
          };
   return (
     <table className="table w-full ">
       <thead>
         <tr>
           {columns.map((column, index) => (
             <th key={index} className="text-left px-6 py-3 bg-gray-100">
               {column.title}
             </th>
           ))}
         </tr>
       </thead>
       <tbody>
         {contacts.map((contact, index) => (
           <tr key={index} className="border-b border-gray-200 py-4">
             {columns.map((column) => (
               <td key={column.dataIndex} className={column.className || ''}>
                 {column.render ? (
                   column.render(contact[column.dataIndex])
                 ) : (
                   <ContactDataCell dataIndex={column.dataIndex} contact={contact} />
                 )}
               </td>
             ))}
             {open && editData?.[column.dataIndex] && (
 <EditForm
   editData={editData}
   handleChange={handleChange}
   handleSave={() => handleEdit(contact._id)} // Assuming editData has an _id property
   handleCancel={handleCancel}
 />
)}
           <td>
             <ActionButtons
               id={contact._id}
               handleEditClick={() => handleEditClick(contact._id)}
               handleDelete={() => handleDelete(contact._id)}
             />
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 );
};
export default Table;