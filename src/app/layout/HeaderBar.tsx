import { NavLink } from "react-router-dom";
import { Header, Image, Segment } from "semantic-ui-react";

export default function HeaderBar() {
  return (
    <Segment
      basic
      className="headerBar"
      style={{ padding: "3em", marginBottom: 0, marginTop: 0 }}
    >
      <NavLink to="/">
        <Image src="/assets/LIVINGHOPEwhite.png" centered size="medium" />
      </NavLink>
      <Header>
        <Header size="large" inverted style={{ textAlign: "center" }}>
          Welcome to the Living Hope Management System
        </Header>
        <Header size="medium" inverted style={{ textAlign: "center" }}>
          Better ministry through better management
        </Header>
      </Header>
    </Segment>
  );
}
