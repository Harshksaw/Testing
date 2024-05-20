const SelectCheckbox = ({ id }) => (
    <input
      type="checkbox"
      // checked={selectedContacts.includes(id)}
      // onChange={(event) => onSelectChange(id, event.target.checked)}
      className="text-blue-600 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  );
  export default SelectCheckbox;