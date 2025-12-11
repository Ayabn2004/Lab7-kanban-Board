import React from "react";             
import { render, screen } from "@testing-library/react";
import Column from "../components/Column";

test("affiche le titre de la colonne", () => {
  render(
    <Column
      title="To Do"
      color="#007bff"
      statusKey="todo"
      tasks={[]}
      moveTask={() => {}}
      deleteTask={() => {}}
    />
  );

  expect(screen.getByText("To Do")).toBeInTheDocument();
});
