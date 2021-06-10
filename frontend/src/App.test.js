import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

test("Renders 'Join a group' link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Log In!/i);
  expect(linkElement.textContent).toBe("Log In!");
});

test("Clicking join a group gives 'select group' page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Get Started/i);
  fireEvent.click(linkElement);
  const text = screen.getByText(/List of Competitions Available/);
  expect(text.textContent).toBe("List of Competitions Available");
});
