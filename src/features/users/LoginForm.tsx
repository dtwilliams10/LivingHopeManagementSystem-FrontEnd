import { Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/helpers/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", error: null }}
        onSubmit={(values, { setErrors }) =>
          userStore
            .login(values)
            .catch((error) => setErrors({ error: "Invalid email or password" }))
        }
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form
            className="ui form loginForm"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Header />
            <MyTextInput placeholder="Email" name="Email" />
            <MyTextInput
              placeholder="Password"
              name="Password"
              type="password"
            />
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
            <Button
              positive
              content="Login"
              to={`/home`}
              type="submit"
              fluid
              loading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </>
  );
});
