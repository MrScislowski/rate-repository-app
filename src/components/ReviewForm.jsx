import { Alert, Pressable, StyleSheet, TextInput } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
// import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { useApolloClient, useMutation } from "@apollo/client";
import mutations from "../graphql/mutations";
import { useState } from "react";

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
  ownerName: yup.string().required("ownerName is required"),
  repositoryName: yup.string().required("repositoryName is required"),
  rating: yup.number().min(0).max(100).required("rating is required"),
  text: yup.string(),
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

const ReviewForm = () => {
  const navigate = useNavigate();

  return <ReviewFormContainer navigate={navigate} />;
};

export const ReviewFormContainer = ({ navigate }) => {
  const [error, setError] = useState(null);
  const [mutate, result] = useMutation(mutations.CREATE_REVIEW);
  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        const result = await mutate({
          variables: { review: { ...values, rating: parseInt(values.rating) } },
        });
        navigate(`/repositories/${result.data.createReview.repositoryId}`);
      } catch (e) {
        setError(JSON.stringify(e));
        console.log(e);
      }
    },
  });

  return (
    <>
      <InputBox inputName={"ownerName"} formik={formik} />
      <InputBox inputName={"repositoryName"} formik={formik} />
      <InputBox inputName={"rating"} formik={formik} inputMode="numeric" />
      <InputBox inputName={"text"} formik={formik} multiline={true} />

      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.signinbutton}>Create a review</Text>
      </Pressable>

      {!error || <Text>{error}</Text>}
    </>
  );
};

export default ReviewForm;
