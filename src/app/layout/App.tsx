import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useStore } from "../stores/store";
import ButtonAppBar from "./ButtonAppBar";
import ErrorPage from "../../features/Errors/Error";
import HeaderBar from "./HeaderBar";
import LoadingComponent from "./LoadingComponent";
import Login from "../../features/Users/Login";
import ModalContainer from "../helpers/modals/ModalContainer";
import VerifyEmail from "../../features/Users/VerifyEmail";

export default observer(function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (!commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

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
});
