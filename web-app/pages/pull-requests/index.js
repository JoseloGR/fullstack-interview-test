import PullRequests from "../../components/PullRequests";
import Container from "../../components/Container";
import Link from "next/link";

export default function PR({pullRequests}) {
  return (
    <Container>
      <div>
        <Link href="/pull-requests/create">
          <a className="bg-green-600 hover:bg-green-700 text-white font-semibold hover:text-white py-2 px-4 ml-4 border border-green-700 hover:border-transparent rounded-sm">Crear Pull Requests</a>
        </Link>
      </div>
      <PullRequests prs={pullRequests} />
    </Container>
  )
}

export async function getServerSideProps({req}) {
  const response = await fetch(`${process.env.HOST}${process.env.VERSION}${process.env.PR}`);
  const pullRequests = await response.json();
  return {
    props: {
      pullRequests
    }
  }
}