import { Alert, StyleSheet, Text, TextInput } from "react-native";
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
      <TextInput style={styles.textinput} placeholder="Username"></TextInput>
    </>
  );
};

export default SignIn;
