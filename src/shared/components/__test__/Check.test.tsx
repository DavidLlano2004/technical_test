import { render, screen, fireEvent } from "@testing-library/react";
import { Check } from "../check/Check";

jest.mock('../check/Check.css', () => ({}));

describe("Check component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debería renderizar el checkbox con la clase correcta", () => {
    render(<Check isChecked={false} onChange={mockOnChange} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("ui-checkbox");
  });

  test("debería estar marcado cuando isChecked es true", () => {
    render(<Check isChecked={true} onChange={mockOnChange} />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test("debería estar desmarcado cuando isChecked es false", () => {
    render(<Check isChecked={false} onChange={mockOnChange} />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test("debería llamar a onChange con el valor correcto al hacer clic", () => {
    render(<Check isChecked={false} onChange={mockOnChange} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(true); // porque antes estaba en false
  });
});
