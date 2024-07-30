import "bootstrap/dist/css/bootstrap.min.css";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Loading from "./index";

describe("Loading", () => {
  it("renders the loading spinner", () => {
    render(<Loading />);
    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toBeInTheDocument();
  });
});