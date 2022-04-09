import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useLoginUserMutation } from "../../graphql/generated/graphql";
import toErrorMap from "../../utils/toErrorMap";

interface LoginProps {}

function Login({}: LoginProps): ReactElement {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation({ refetchQueries: "active" });

  return (
    <VStack mx="auto" mt="5rem">
      <Text fontSize="5xl">Login</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const { data } = await loginUser({
            variables: values,
          });

          const errors = data?.login.errors;

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
            <VStack>
              <header>Username</header>
              <Input
                w="20rem"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <Box>{errors.username}</Box>
              <header>Password</header>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <Box>{errors.password}</Box>
              <Button type="submit" disabled={false}>
                Login
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </VStack>
  );
}

export default Login;
