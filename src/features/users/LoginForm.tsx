import { Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import {
  Button,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Label,
} from "semantic-ui-react";
import MyTextInput from "../../app/helpers/MyTextInput";
import { useStore } from "../../app/stores/store";
import Register from "./Register";

export default observer(function LoginForm() {
  const { userStore, modalStore } = useStore();
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
            <MyTextInput placeholder="Email" name="email" />
            <MyTextInput
              placeholder="Password"
              name="password"
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
    </>
  );
});
