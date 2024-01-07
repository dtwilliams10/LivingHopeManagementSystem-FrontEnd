import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import queryString, { ParsedQuery } from "query-string";
import { useStore } from "../../app/stores/store";
import { Container, Header, Segment } from "semantic-ui-react";

export default function VerifyEmail() {
  const { userStore } = useStore();

  //eslint-disable-next-line
  const EmailStatus = {
    Verifying: "Verifying",
    Verified: "Verified",
    Failed: "Failed",
  };

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

  useEffect(() => {
    const { token }: ParsedQuery<string> = queryString.parse(
      window.location.search
    );
    const jsonToken = JSON.stringify(token);
    userStore
      .verifyEmail(JSON.parse(jsonToken))
      .then(() => {
        setEmailStatus(EmailStatus.Verified);
      })
      .catch(() => {
        setEmailStatus(EmailStatus.Failed);
      });
    //eslint-disable-next-line
  }, []);

  function getBody() {
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return <Container textAlign="center">Verifying...</Container>;
      case EmailStatus.Verified:
        return (
          <Container textAlign="center">
            Your email has been verified! Please go to{" "}
            <NavLink to="/">login</NavLink>
          </Container>
        );
      case EmailStatus.Failed:
        return (
          <Container textAlign="center">
            Verification failed. You can also verify your account using the{" "}
            <NavLink to="forgot-password">forgotton password</NavLink> page.
          </Container>
        );
    }
  }

  return (
    <>
      <Header as="h3" textAlign="center">
        Verify Email
      </Header>
      <Container style={{ textSize: "16px" }} textAlign="center">
        {getBody()}
      </Container>
    </>
  );
}
