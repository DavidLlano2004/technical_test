// Aside.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Aside } from "../Aside";

// --- Mock del hook personalizado ---
const mockUseScreenSize = jest.fn();
jest.mock("../../../product/hooks/useScreenSize", () => ({
  useScreenSize: () => mockUseScreenSize(),
}));

// --- Mock de los íconos ---
jest.mock("../../../assets/icons/IconProvider", () => ({
  Icons: {
    IconHomeActive: "icon-home-active.svg",

  },
}));

describe("Aside component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debería renderizar las opciones Inicio y Contratos", () => {
    mockUseScreenSize.mockReturnValue({ isMobile: false });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Aside isOpenAside={true} />
      </MemoryRouter>
    );

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Contratos")).toBeInTheDocument();
  });

  test("debería aplicar la clase bg-primary-custom cuando la ruta está activa", () => {
    mockUseScreenSize.mockReturnValue({ isMobile: false });

    render(
      <MemoryRouter initialEntries={["/contracts"]}>
        <Aside isOpenAside={true} />
      </MemoryRouter>
    );

    const activeLink = screen.getByText("Contratos").closest("a");
    expect(activeLink).toHaveClass("bg-primary-custom");
  });

  test("debería ocultar los textos cuando isOpenAside es false", () => {
    mockUseScreenSize.mockReturnValue({ isMobile: false });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Aside isOpenAside={false} />
      </MemoryRouter>
    );

    // el texto está, pero con "hidden"
    expect(screen.getByText("Inicio")).toHaveClass("hidden");
  });

  test("debería mostrar el icono activo al hacer hover", () => {
    mockUseScreenSize.mockReturnValue({ isMobile: false });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Aside isOpenAside={true} />
      </MemoryRouter>
    );

    const inicioLink = screen.getByText("Inicio").closest("a")!;
    const img = inicioLink.querySelector("img") as HTMLImageElement;

    // antes del hover → inactivo
    expect(img.src).toContain("http://localhost/icon-home-active.svg");

    fireEvent.mouseEnter(inicioLink);
    expect(img.src).toContain("http://localhost/icon-home-active.svg");

    fireEvent.mouseLeave(inicioLink);
    expect(img.src).toContain("http://localhost/icon-home-active.svg");
  });
});
