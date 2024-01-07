import { NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

export default function ButtonAppBar() {
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
            localStorage.clear();
            console.log("Logging off!");
          }}
          name="Logoff"
          to="/"
        />
      </Container>
    </Menu>
  );
}
