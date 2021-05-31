import Branches from "../components/Branches";
import Container from "../components/Container";

export default function Home({branches}) {
  return (
    <Container>
      <Branches branches={branches} />
    </Container>
  )
}

export async function getServerSideProps({req}) {
  const response = await fetch(`${process.env.HOST}${process.env.VERSION}${process.env.BRANCHES}`);
  const branches = await response.json();
  return {
    props: {
      branches
    }
  }
}