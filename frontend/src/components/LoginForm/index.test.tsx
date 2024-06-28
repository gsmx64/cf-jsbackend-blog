import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./index";

describe("LoginForm", () => {
  const currentUser = undefined;
  const loading = false;
  const alertMessage = "";
  const errorMessage = "";
  const onLoginUserSaveClick = jest.fn();

  it("renders the login form correctly", () => {
    render(
      <LoginForm
        currentUser={currentUser}
        loading={loading}
        alertMessage={alertMessage}
        errorMessage={errorMessage}
        onLoginUserSaveClick={onLoginUserSaveClick}
      />,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("calls onLoginUserSaveClick with the correct username and password when the form is submitted", async () => {
    render(
      <LoginForm
        currentUser={currentUser}
        loading={loading}
        alertMessage={alertMessage}
        errorMessage={errorMessage}
        onLoginUserSaveClick={onLoginUserSaveClick}
      />,
      { wrapper: MemoryRouter }
    );

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByText("Login");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onLoginUserSaveClick).toHaveBeenCalledWith("testuser", "testpassword");
    });
  });

  it("redirects to the home page after successful login", async () => {
    render(
      <LoginForm
        currentUser={currentUser}
        loading={loading}
        alertMessage={alertMessage}
        errorMessage={errorMessage}
        onLoginUserSaveClick={onLoginUserSaveClick}
      />,
      { wrapper: MemoryRouter }
    );

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByText("Login");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Redirecting...")).toBeInTheDocument();
    });
  });
});
