import { Alert, Pressable, StyleSheet, TextInput } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

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

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  return <SignInContainer signIn={signIn} navigate={navigate} />;
};

export const SignInContainer = ({ signIn, navigate }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const { data } = await signIn({ username, password });
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

      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.signinbutton}>Sign in</Text>
      </Pressable>
    </>
  );
};

export default SignIn;
