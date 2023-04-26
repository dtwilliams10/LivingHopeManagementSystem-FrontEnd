import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

import LoginForm from "./LoginForm";

export default observer(function Login() {
  const { userStore } = useStore();
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
        {userStore.isLoggedIn ? (
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
          <>
            <LoginForm />
          </>
        )}
      </Container>
    </Segment>
  );
});
