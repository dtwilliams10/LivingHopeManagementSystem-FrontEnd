import { Container } from "semantic-ui-react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import ButtonAppBar from "./ButtonAppBar";
import ErrorPage from "../../features/Errors/Error";
import HeaderBar from "./HeaderBar";
import LoadingComponent from "./LoadingComponent";
import Login from "../../features/Users/Login";
import ModalContainer from "../helpers/modals/ModalContainer";
import VerifyEmail from "../../features/Users/VerifyEmail";
import LHMSContext from "../context/LHMSContext";

const App = () => {
  const location = useLocation();
  const { setAppLoaded, appLoaded } = useContext(LHMSContext);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      setAppLoaded(false);
      console.log("Redirecting to login");
      location.pathname = "/";
      setAppLoaded(true);
    } else {
      setAppLoaded(true);
    }
  });

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  if (location.pathname === "/accounts/verify-email")
    return (
      <>
        <HeaderBar />
        <VerifyEmail />
      </>
    );

  if (location.pathname === "/not-found")
    return (
      <>
        <HeaderBar />
        <ErrorPage />
      </>
    );
  return (
    <>
      {/*Change this to check for a logged in user. If true, forward to home page, if false send to Login component*/}
      <ModalContainer />
      <ToastContainer />
      {location.pathname === "/" ? (
        <Login />
      ) : (
        <>
          <HeaderBar />
          <ButtonAppBar />
          <Container>
            <Outlet />
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default App;
