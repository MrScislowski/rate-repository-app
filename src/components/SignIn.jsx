import { Alert, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
  textinput: {
    margin: 10,
    padding: 10,
    borderColor: theme.backdropColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  signinbutton: {
    backgroundColor: theme.submitColor,
    margin: 10,
    padding: 10,
    color: "#ffffff",
  },
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      Alert.alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <TextInput
        style={styles.textinput}
        name="username"
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
      />
      <TextInput
        style={styles.textinput}
        name="password"
        placeholder="Password"
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        secureTextEntry
      />

      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.signinbutton}>Sign in</Text>
      </Pressable>
    </>
  );
};

export default SignIn;
