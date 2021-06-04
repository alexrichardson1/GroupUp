import { render, screen } from "@testing-library/react";
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
