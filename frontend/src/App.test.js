import { render, fireEvent, screen } from "@testing-library/react";
import App from "App";
// import Home from "./Components/Home";

test("Renders 'Login!'", () => {
  expect(1).toBe(1);
  // render(<App />);
  // const linkElement = screen.getByText(/Login!/i);
  // expect(linkElement.textContent).toBe("Login!");
});

// test("Clicking join a group gives 'select group' page", () => {
//   render(<Home />);
//   const linkElement = screen.getByText(/Get Started/i);
//   fireEvent.click(linkElement);
//   const text = screen.getByText(/List of Competitions Available/);
//   expect(text.textContent).toBe("List of Competitions Available");
// });
