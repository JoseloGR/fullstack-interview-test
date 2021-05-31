import Link from "next/link";
import TableWrapper from "./TableWrapper";

export default function Branches({branches}) {
  return (
    <TableWrapper>
      <table className="min-w-full divide-y divide-blueGray-400">
        <thead className="bg-blueGray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
              Branch
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blueGray-800 uppercase tracking-wider">
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blueGray-200">
          {
            branches.map(
              branch => (
                <tr key={`${branch.name}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blueGray-900">{branch.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href="/branches/[branchName]" as={`/branches/${branch.name}`}>
                      <a className="text-indigo-600 hover:text-indigo-900">Ver commits</a>
                    </Link>
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