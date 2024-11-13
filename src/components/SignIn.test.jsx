import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "./SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const signIn = jest.fn();
      render(<SignInContainer signIn={signIn} />);

      fireEvent.changeText(screen.getByPlaceholderText("username"), "kalle");
      fireEvent.changeText(screen.getByPlaceholderText("password"), "password");
      fireEvent.press(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
        // expect the onSubmit function to have been called once and with a correct first argument
      });
    });
  });
});
