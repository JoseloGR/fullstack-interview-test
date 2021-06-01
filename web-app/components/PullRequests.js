import { useRouter } from 'next/router';
import TableWrapper from "./TableWrapper";

export default function PullRequests({prs}) {
  const router = useRouter();

  const handleClosePR = async (number) => {
    const res = await fetch(
      `http://localhost:8000/api/v1/pull-requests/${number}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH'
      }
    );
    const result = await res.json();
    if (result && result['success']) {      
      router.push('/pull-requests');
    }
  }

  return (
    <TableWrapper>
      <table className="min-w-full divide-y divide-blueGray-400">
        <thead className="bg-blueGray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
              Título
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
              Estatus
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
              Autor
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blueGray-200">
          {
            prs.map(
              pr => (
                <tr key={`${pr.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blueGray-900">{pr.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blueGray-900">{pr.body}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blueGray-900">
                      {
                        pr.status == 'open' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Abierto
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Cerrado
                          </span>
                        )
                      }
                    </div>
                    <div className="text-sm font-medium text-blueGray-900">
                      {
                        pr.status == 'open' ? (
                          <button onClick={() => handleClosePR(pr.number)} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Cerrar PR
                          </button>
                        ) : null
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blueGray-900">{pr.author}</div>
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