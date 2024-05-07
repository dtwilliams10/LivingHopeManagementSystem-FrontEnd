import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

import LoginForm from "./LoginForm";
import LHMSContext from "../../app/context/LHMSContext";
import { isEmpty } from "../../app/helpers/isEmpty";

export default function Login() {
  const { user } = useContext(LHMSContext);
  return (
    <Segment textAlign="center" vertical className="masthead">
      <Container>
        <Image
          className="logo"
          src="/assets/LIVINGHOPEwhite.png"
          alt="logo"
          style={{ marginBottom: 12 }}
        />
        <Header as="h1" inverted>
          Living Hope Management System
        </Header>
        <Header as="h2" inverted style={{ margin: 12 }}>
          Better ministry through better management.
        </Header>
        {!isEmpty(user) ? (
          <>
            <Header
              as="h2"
              inverted
              content="Welcome to the Living Hope Management System"
            />
            <Button as={Link} to="/home" size="huge" inverted>
              Login
            </Button>
          </>
        ) : (
          <LoginForm />
        )}
      </Container>
    </Segment>
  );
}
