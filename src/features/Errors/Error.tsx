import { NavLink } from "react-router-dom";
import { Header } from "semantic-ui-react";

export default function ErrorPage() {
  return (
    <>
      <Header as="h2" style={{ textAlign: "center" }}>
        We're sorry, you have encountered an error!
      </Header>
      <Header.Subheader style={{ textAlign: "center" }}>
        The page you have requested was not found.
      </Header.Subheader>
      <Header.Subheader style={{ textAlign: "center" }}>
        Please click <NavLink to="/Home">here</NavLink> to go back to the home
        page.
      </Header.Subheader>
    </>
  );
}
