import { Pressable, StyleSheet, TextInput } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import mutations from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  textinput: {
    margin: 10,
    padding: 10,
    borderColor: theme.backdropColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  signinbutton: theme.button,
  errortext: {
    marginHorizontal: 10,
    color: "#8a0000",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords don't match")
    .required("passwordConfirmation is required"),
});

const ErrorText = (props) => {
  return <Text style={styles.errortext}>{props.children}</Text>;
};

const InputBox = (props) => {
  const { inputName, formik, ...otherProps } = props;

  const hasError = formik.errors[inputName] !== undefined;

  return (
    <>
      <TextInput
        style={[
          styles.textinput,
          hasError && { borderColor: "#8a0000", borderWidth: 2 },
        ]}
        name={inputName}
        placeholder={inputName}
        onChangeText={formik.handleChange(inputName)}
        value={formik.values[inputName]}
        {...otherProps}
      />
      {formik.errors[inputName] && (
        <ErrorText>{formik.errors[inputName]}</ErrorText>
      )}
    </>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpMutation, signUpResponse] = useMutation(mutations.CREATE_USER);
  const [signIn] = useSignIn();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        await signUpMutation({ variables: { user: { username, password } } });
        console.log("created user...");
        await signIn({ username, password });
        console.log("signed in...");
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <>
      <InputBox inputName={"username"} formik={formik} />
      <InputBox inputName={"password"} formik={formik} secureTextEntry />
      <InputBox
        inputName={"passwordConfirmation"}
        formik={formik}
        secureTextEntry
      />

      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.signinbutton}>Sign up</Text>
      </Pressable>
    </>
  );
};

export default SignUp;
