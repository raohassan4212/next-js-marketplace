const Home = (Component: any) => {
  return ({ ...props }) => (
    <div>
      The Wrapper Component <br />
      <Component {...props} />
    </div>
  );
};

export default Home;
