import TableWrapper from "./TableWrapper";

export default function Commits({commits}) {
  return (
    <TableWrapper>
      <table className="min-w-full divide-y divide-blueGray-400">
        <thead className="bg-blueGray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
              Mensaje
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
              Autor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
              Fecha y hora
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
              Commit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blueGray-200">
          {
            commits.map(
              commit => (
                <tr key={`${commit.hexsha}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blueGray-900">{commit.summary}</div>
                    <div class="text-sm text-blueGray-500">{ `Tamaño: ${commit.size}`} - {`Cantidad: ${commit.count}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blueGray-900">{commit.author}</div>
                    <div className="text-sm text-blueGray-500">{commit.author_email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blueGray-900">{commit.datetime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blueGray-900">{commit.hexsha}</div>
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </TableWrapper>
  );
}