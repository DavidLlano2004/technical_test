import { render, screen, fireEvent } from "@testing-library/react";
import { IconMenuBurguerComponent } from "../iconMenuBurguer/IconMenuBurguerComponent";

jest.mock('../iconMenuBurguer/IconMenuBurguer.css', () => ({}));


describe("IconMenuBurguerComponent", () => {
  const mockActionMenuBurguer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debería llamar a actionMenuBurguer al hacer clic en el checkbox", () => {
    render(<IconMenuBurguerComponent actionMenuBurguer={mockActionMenuBurguer} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockActionMenuBurguer).toHaveBeenCalledTimes(1);
  });
});
