// import { Header } from "./common/Header";
import { Footer } from "./common/Footer";
import { Outlet, useNavigation } from "react-router-dom";

export const AppLayout = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading")
    return <h1 className="loading">Loading...</h1>;

  return (
    <>
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </>
  );
};
