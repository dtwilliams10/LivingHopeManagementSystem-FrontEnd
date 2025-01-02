import { Formik, Form, ErrorMessage } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/helpers/MyTextInput";
import { useStore } from "../../app/stores/store";
import Register from "./Register";
import { useContext } from "react";
import LHMSContext from "../../app/context/LHMSContext";

export default function LoginForm() {
  const { login } =
    useContext(LHMSContext) ||
    (() => {
      throw new Error("LoginForm must be used within a LHMSContextProvider");
    })();

  const { modalStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={async (values, { setErrors }) => {
        try {
          await login(values);
        } catch (error: any) {
          console.log(error);
          setErrors({ error: error.response.data.message });
        }
      }}
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
