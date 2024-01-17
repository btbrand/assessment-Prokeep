import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import LoginForm from "./Login/index.js";

test("Valid Login", async () => {
  render(<LoginForm />);
  const emailInput = screen.getByTestId("email");
  const passwordInput = screen.getByTestId("password");
  const submitBtn = screen.getByText("Login");

  fireEvent.change(emailInput, { target: { value: "eve.holt@reqres.in" } });
  fireEvent.change(passwordInput, { target: { value: "cityslicka" } });

  fireEvent.click(submitBtn);

  expect(screen.queryByTestId("error")).not.toBeInTheDocument();

  // Check if the result text is now present
  await waitFor(
    async () => {
      const resultText = await screen.findByTestId("error-msg");
      expect(resultText).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
  expect(screen.getByTestId("error-msg")).toHaveTextContent("Result: ");
});

test("Invalid login of empty email", async () => {
  render(<LoginForm />);
  const emailInput = screen.getByTestId("email");
  const passwordInput = screen.getByTestId("password");
  const submitBtn = screen.getByText("Login");

  fireEvent.change(emailInput, { target: { value: "" } });
  fireEvent.change(passwordInput, { target: { value: "abc" } });

  fireEvent.click(submitBtn);

  // Assert login failure

  await waitFor(
    async () => {
      const resultText = await screen.findByTestId("error-msg");
      expect(resultText).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
  expect(screen.getByTestId("error-msg")).toHaveTextContent(
    "Please enter a valid email"
  );
});

test("Invalid login of empty password", async () => {
  render(<LoginForm />);
  const emailInput = screen.getByTestId("email");
  const passwordInput = screen.getByTestId("password");
  const submitBtn = screen.getByText("Login");

  fireEvent.change(emailInput, { target: { value: "a@a.com" } });
  fireEvent.change(passwordInput, { target: { value: "" } });

  fireEvent.click(submitBtn);

  // Assert login failure

  await waitFor(
    async () => {
      const resultText = await screen.findByTestId("error-msg");
      expect(resultText).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
  expect(screen.getByTestId("error-msg")).toHaveTextContent(
    "Please enter a password"
  );
});

test("Invalid login of validation", async () => {
  render(<LoginForm />);
  const emailInput = screen.getByTestId("email");
  const passwordInput = screen.getByTestId("password");
  const submitBtn = screen.getByText("Login");

  fireEvent.change(emailInput, { target: { value: "a.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  fireEvent.click(submitBtn);

  // Assert login failure

  await waitFor(
    async () => {
      const resultText = await screen.findByTestId("error-msg");
      expect(resultText).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
  expect(screen.getByTestId("error-msg")).toHaveTextContent(
    "Please enter a valid email"
  );
});
