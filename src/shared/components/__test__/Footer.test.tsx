// Footer.test.tsx
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

// Mock de los íconos
jest.mock("../../../assets/icons/IconProvider", () => ({
  Icons: {
    LogoWeb: "logo-web.svg",
    IconFacebook: "facebook.svg",
    IconYoutube: "youtube.svg",
    IconTwitter: "twitter.svg",
  },
}));

describe("Footer component", () => {
  test("debería renderizar el logo", () => {
    render(<Footer />);
    const logo = screen.getByAltText("logo_web");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "logo-web.svg");
  });

  test("debería mostrar la información de contacto", () => {
    render(<Footer />);
    expect(screen.getByText("© 2019 Skandia")).toBeInTheDocument();
    expect(screen.getByText(/PBX:/i)).toBeInTheDocument();
    expect(screen.getByText(/Bogotá D.C., Colombia/)).toBeInTheDocument();
  });

  test("debería renderizar los enlaces de navegación", () => {
    render(<Footer />);
    expect(
      screen.getByText("Términos y Condiciones Canales de Servicio")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Defensoría del Consumidor Financiero")
    ).toBeInTheDocument();
    expect(screen.getByText("Protección de Datos")).toBeInTheDocument();
    expect(
      screen.getByText("Definiciones Generales - Auto declaración FATCA y CRS")
    ).toBeInTheDocument();
    expect(screen.getByText("Recomendaciones de Seguridad")).toBeInTheDocument();
    expect(screen.getByText("Ley de Transparencia")).toBeInTheDocument();
    expect(screen.getByText("Mapa del sitio")).toBeInTheDocument();
  });

  test("debería renderizar los íconos de redes sociales", () => {
    render(<Footer />);
    expect(screen.getByAltText("icon_facebook")).toHaveAttribute(
      "src",
      "facebook.svg"
    );
    expect(screen.getByAltText("icon_youtube")).toHaveAttribute(
      "src",
      "youtube.svg"
    );
    expect(screen.getByAltText("icon_twitter")).toHaveAttribute(
      "src",
      "twitter.svg"
    );
  });
});
