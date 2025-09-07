// Header.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../Header";

// Mock de los íconos
jest.mock("../../../assets/icons/IconProvider", () => ({
  Icons: {
    LogoWeb: "logo-web.svg",
    IconHelpOrange: "icon-help.svg",
    IconFaceHappy: "icon-happy.svg",
    IconHandPrice: "icon-hand.svg",
  },
}));

// Mock del componente IconMenuBurguerComponent
const mockIconMenuBurguer = jest.fn();
jest.mock("../iconMenuBurguer/IconMenuBurguerComponent", () => ({
  IconMenuBurguerComponent: ({ actionMenuBurguer }: { actionMenuBurguer: () => void }) => (
    <button data-testid="menu-burguer" onClick={actionMenuBurguer}>
      Menu
    </button>
  ),
}));

describe("Header component", () => {
  test("debería renderizar el logo", () => {
    render(<Header actionMenuBurguer={jest.fn()} openModal={jest.fn()} />);
    const logo = screen.getByAltText("logo_web");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "logo-web.svg");
  });

  test("debería mostrar los textos principales", () => {
    render(<Header actionMenuBurguer={jest.fn()} openModal={jest.fn()} />);
    expect(screen.getByText(/Plan Financiero Digital - FPX/i)).toBeInTheDocument();
    expect(screen.getByText("Tu Financial Planner")).toBeInTheDocument();
    expect(screen.getByText("Aportes")).toBeInTheDocument();
  });

  test("debería ejecutar openModal al hacer clic en el botón de ayuda", () => {
    const openModal = jest.fn();
    render(<Header actionMenuBurguer={jest.fn()} openModal={openModal} />);

    const helpButton = screen.getByAltText("icon_help").closest("button")!;
    fireEvent.click(helpButton);

    expect(openModal).toHaveBeenCalledTimes(1);
  });

  test("debería pasar correctamente actionMenuBurguer al componente IconMenuBurguerComponent", () => {
    const actionMenuBurguer = jest.fn();
    render(<Header actionMenuBurguer={actionMenuBurguer} openModal={jest.fn()} />);

    const menuButton = screen.getByTestId("menu-burguer");
    fireEvent.click(menuButton);

    expect(actionMenuBurguer).toHaveBeenCalledTimes(1);
  });
});
