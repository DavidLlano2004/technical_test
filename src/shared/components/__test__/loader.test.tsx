// Loader.test.tsx
import { render, screen } from "@testing-library/react";
import { Loader } from "../Loader";

describe("Loader component", () => {
  test("debería renderizar el contenedor con role=status", () => {
    render(<Loader />);
    const statusDiv = screen.getByRole("status");
    expect(statusDiv).toBeInTheDocument();
  });

  test("debería renderizar el svg con clases de animación", () => {
    render(<Loader />);
    const svg = screen.getByRole("status").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-8");
    expect(svg).toHaveClass("h-8");
    expect(svg).toHaveClass("animate-spin");
    expect(svg).toHaveClass("fill-primary-custom");
  });
});
