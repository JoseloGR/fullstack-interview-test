const ErrorMessage = ({children}) => (
  <div className="bg-red-100 border border-red-400 text-sm text-red-700 px-4 py-2 rounded relative" role="alert">
    <span className="block sm:inline">{children}</span>
  </div>
);

export default ErrorMessage;