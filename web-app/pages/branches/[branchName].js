import Link from "next/link";
import Commits from "../../components/Commits";
import Container from "../../components/Container";

export default function CommitsIndex({commits}) {
  return (
    <Container>
      <div className="p-2">
        <Link className="text-opacity-50" href="/">
          <a className="text-blueGray-700 text-opacity-75 hover:text-opacity-100 underline">Regresar</a>
        </Link>
      </div>
      <Commits commits={commits}/>
    </Container>
  );
}

export async function getServerSideProps({ req, params }) {
  const response = await fetch(`${process.env.HOST}${process.env.VERSION}${process.env.BRANCHES}/${params.branchName}`);
  const commits = await response.json();
  return {
    props: {
      commits
    }
  }
}