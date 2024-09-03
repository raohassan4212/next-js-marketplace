import Homes from "./home/page";

export default function Home() {
  const welcome = () => {
    return <>welcome Her</>;
  };

  const HOC = Homes(welcome);
  return (
    <>
      <HOC />
    </>
  );
}
