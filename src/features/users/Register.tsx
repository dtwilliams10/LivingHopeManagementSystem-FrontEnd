import { ErrorMessage, Form, Formik } from "formik";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/helpers/MyTextInput";
import ValidationError from "../Errors/ValidationError";

export default observer(function Register() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        acceptTerms: true,
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        firstName: Yup.string().required("First Name is a required field."),
        lastName: Yup.string().required("Last Name is a required field."),
        email: Yup.string().required("Email is a required field."),
        password: Yup.string().required("Password is a required field."),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Register for an account"
            textAlign="center"
          />
          <MyTextInput placeholder="First Name" name="firstName" />
          <MyTextInput placeholder="Last Name" name="lastName" />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationError errors={errors.error} />}
          />
          <Button
            positive
            content="Register"
            type="submit"
            fluid
            loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
});
