import { Formik } from "formik";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../graphql/generated/graphql";
import toErrorMap from "../../utils/toErrorMap";

interface RegisterProps {}

function Register({}: RegisterProps): ReactElement {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation({ refetchQueries: "active" });

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const { data } = await registerUser({
            variables: values,
          });

          const errors = data?.register.errors;

          if (errors) {
            setErrors(toErrorMap(errors));
            return;
          }

          navigate("/");
        }}
      >
        {({
          handleChange,
          handleBlur,
          values,
          isSubmitting,
          errors,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <header>Username</header>
            <input
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username}
            <header>Password</header>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password}
            <button type="submit" disabled={false}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
