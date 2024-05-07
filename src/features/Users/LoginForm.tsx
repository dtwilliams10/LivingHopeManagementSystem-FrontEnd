import { Formik, Form, ErrorMessage } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/helpers/MyTextInput";
import { useStore } from "../../app/stores/store";
import Register from "./Register";
import { useContext } from "react";
import LHMSContext from "../../app/context/LHMSContext";

export default function LoginForm() {
  const { login } = useContext(LHMSContext);
  const { modalStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        login(values).catch(() =>
          setErrors({ error: "Invalid email or password" })
        )
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form
          className="ui form loginForm"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <div>
            <Button
              positive
              size="huge"
              content="Login"
              to={`/home`}
              type="submit"
              loading={isSubmitting}
            />
            <Button
              onClick={() => modalStore.openModal(<Register />)}
              size="huge"
              inverted
              type="button"
              content="Register"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
