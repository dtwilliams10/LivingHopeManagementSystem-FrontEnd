import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import LHMSContext from "../context/LHMSContext";

export default function ButtonAppBar() {
  const { logoff } =
    useContext(LHMSContext) ||
    (() => {
      throw new Error(
        "ButtonAppBar must be used within an LHMSContextProvider"
      );
    })();

  return (
    <Menu fluid widths={4} size="large" style={{ padding: 0, marginTop: 0 }}>
      <Container>
        <Menu.Item as={NavLink} to="/home" name="Home" />
        <Menu.Item as={NavLink} to="/systemreports" name="System Reports" />
        <Menu.Item
          as={NavLink}
          to="/personaldevelopment"
          name="Personal Development"
        />
        <Menu.Item as={NavLink} to="/status" name="About" />
        <Menu.Item
          as={NavLink}
          onClick={() => {
            logoff();
          }}
          name="Logoff"
          to="/"
        />
      </Container>
    </Menu>
  );
}
