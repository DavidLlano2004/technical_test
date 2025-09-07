import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../Modal";

jest.mock("../../../assets/icons/IconProvider", () => ({
  Icons: {
    IconHomeActive: "icon-home-active.svg",
  },
}));

describe("Modal component", () => {
  const mockSetViewMenuSm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("no debería renderizar nada cuando isopenModal es false", () => {
    render(<Modal isopenModal={false} setViewMenuSm={mockSetViewMenuSm} />);
    expect(screen.queryByText("Tu Financial Planner")).not.toBeInTheDocument();
  });

  test("debería renderizar el contenido cuando isopenModal es true", () => {
    render(<Modal isopenModal={true} setViewMenuSm={mockSetViewMenuSm} />);
    expect(screen.getByText("Tu Financial Planner")).toBeInTheDocument();
    expect(screen.getByText("Aportes")).toBeInTheDocument();
    expect(screen.getByText("Preguntas frecuentes")).toBeInTheDocument();
  });

  test("debería ejecutar setViewMenuSm al hacer clic en el botón de cerrar", () => {
    render(<Modal isopenModal={true} setViewMenuSm={mockSetViewMenuSm} />);
    const closeButton = screen.getByRole("button", { name: /cerrar/i });
    fireEvent.click(closeButton);
    expect(mockSetViewMenuSm).toHaveBeenCalled();
  });
});
