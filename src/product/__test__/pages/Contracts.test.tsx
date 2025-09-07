import { render, screen } from "@testing-library/react";
import { Contracts } from "../../pages/Contracts";

describe("Contracts component", () => {
  test("debería renderizar el texto Contracts", () => {
    render(<Contracts />);
    expect(screen.getByText("Contracts")).toBeInTheDocument();
  });

  test("debería tener la clase de estilo p-4", () => {
    render(<Contracts />);
    const element = screen.getByText("Contracts");
    expect(element).toHaveClass("p-4");
  });
});
