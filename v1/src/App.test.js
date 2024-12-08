import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders HR Portal link", () => {
  render(<App />);
  const linkElement = screen.getByText(/HR Portal/i);
  expect(linkElement).toBeInTheDocument();
});
