
export default function TableWrapper({children}) {
  return (
    <div className="flex flex-col">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-blueGray-400 sm:rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}