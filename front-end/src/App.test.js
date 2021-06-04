import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

test("Renders 'Join a group' link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Join a group/i);
  expect(linkElement.textContent).toBe("Join a group");
});

test("Renders 'Create a group' link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Create a group/i);
  expect(linkElement.textContent).toBe("Create a group");
});

test("Clicking join a group gives 'select group' page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Join a group/i);
  fireEvent.click(linkElement);
  const text = screen.getByText(/Please give us/);
  expect(text.textContent).toBe(
    "Please give us more details about your project so we can help you find the best team for you."
  );
});
