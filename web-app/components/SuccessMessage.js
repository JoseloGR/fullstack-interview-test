const SuccessMessage = ({children}) => (
  <div className="bg-green-100 border border-green-400 text-sm text-green-700 px-4 py-2 rounded relative" role="alert">
    <span className="block sm:inline">{children}</span>
  </div>
);

export default SuccessMessage;