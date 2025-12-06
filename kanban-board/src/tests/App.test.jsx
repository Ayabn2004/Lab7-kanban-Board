import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("Ajoute une tâche au Kanban", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Task title...");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.click(button);

  expect(screen.getByText("Test Task")).toBeInTheDocument();
});
