import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardProduct } from '../CardProduct';
import { Product } from '../../interfaces/product';

// Mock de los módulos externos
jest.mock('../../../assets/icons/IconProvider', () => ({
  Icons: {
    IconMFUND: '/mock-icon-mfund.svg',
    IconCREA: '/mock-icon-crea.svg',
    IconFICS: '/mock-icon-fics.svg',
    IconBOLT: '/mock-icon-bolt.svg',
    IconDefault: '/mock-icon-default.svg'
  }
}));

jest.mock('../../../helpers/truncatePrice', () => ({
  formatPrice: jest.fn((price: number) => price.toLocaleString())
}));

jest.mock('../../../shared/components/check/Check', () => ({
  Check: ({ isChecked, onChange }: { isChecked: boolean; onChange: (checked: boolean) => void }) => (
    <input
      type="checkbox"
      data-testid="check-component"
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
    />
  )
}));

describe('CardProduct', () => {
  const mockProduct: Product = {
    numberProduct: 'PROD123',
    nameProduct: 'MFUND',
    balanceProduct: '50000',
    detaildProduct: 'Fondo de inversión mutuo',
    iconProduct: undefined
  };

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado básico', () => {

    test('renders product icon with correct alt text', () => {
      render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const icon = screen.getByAltText('MFUND');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/mock-icon-mfund.svg');
    });

    test('renders check component', () => {
      render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByTestId('check-component')).toBeInTheDocument();
    });
  });

  describe('Estados de selección', () => {
    test('applies selected styles when isSelected is true', () => {
      const { container } = render(
        <CardProduct
          product={mockProduct}
          isSelected={true}
          onSelect={mockOnSelect}
        />
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border-primary-custom');
      expect(card).toHaveClass('shadow-lg');
      expect(card).toHaveClass('shadow-primary-custom/30');
    });

    test('applies default styles when isSelected is false', () => {
      const { container } = render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border-[#d8d8d8]');
      expect(card).toHaveClass('hover:border-primary-custom/50');
    });

    test('check component reflects isSelected state', () => {
      const { rerender } = render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      let checkbox = screen.getByTestId('check-component') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      rerender(
        <CardProduct
          product={mockProduct}
          isSelected={true}
          onSelect={mockOnSelect}
        />
      );

      checkbox = screen.getByTestId('check-component') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Interacciones', () => {
    test('calls onSelect with product number when card is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const card = container.firstChild as HTMLElement;
      await user.click(card);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith('PROD123');
    });

    test('calls onSelect with product number when check is checked', async () => {
      const user = userEvent.setup();
      render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const checkbox = screen.getByTestId('check-component');
      await user.click(checkbox);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith('PROD123');
    });

    test('calls onSelect with empty string when check is unchecked', async () => {
      const user = userEvent.setup();
      render(
        <CardProduct
          product={mockProduct}
          isSelected={true}
          onSelect={mockOnSelect}
        />
      );

      const checkbox = screen.getByTestId('check-component');
      await user.click(checkbox);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith('');
    });

    test('prevents event propagation when clicking on check', () => {
      render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const checkbox = screen.getByTestId('check-component');
      const clickEvent = new MouseEvent('click', { bubbles: true });
      
      fireEvent.click(checkbox, clickEvent);
      
      // El onSelect debe ser llamado solo una vez (por el check, no por el card)
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mapeo de iconos y colores', () => {
    test.each([
      ['MFUND', 'IconMFUND', 'bg-green-dark-custom'],
      ['CREA', 'IconCREA', 'bg-blue-light-custom'],
      ['FICS', 'IconFICS', 'bg-blue-dark-custom'],
      ['BOLT', 'IconBOLT', 'bg-orange-light-custom']
    ])('uses correct icon and color for %s product', (productName, expectedIcon, expectedColor) => {
      const testProduct: Product = {
        ...mockProduct,
        nameProduct: productName
      };

      const { container } = render(
        <CardProduct
          product={testProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const icon = screen.getByAltText(productName);
      expect(icon).toHaveAttribute('src', `/mock-icon-${expectedIcon.toLowerCase().replace('icon', '')}.svg`);

      const colorBar = container.querySelector(`.${expectedColor}`);
      expect(colorBar).toBeInTheDocument();
    });

    test('uses default color for unknown product', () => {
      const testProduct: Product = {
        ...mockProduct,
        nameProduct: 'UNKNOWN'
      };

      const { container } = render(
        <CardProduct
          product={testProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const colorBar = container.querySelector('.bg-gray-500');
      expect(colorBar).toBeInTheDocument();
    });
  });


  describe('Accesibilidad', () => {
    test('card has cursor pointer class', () => {
      const { container } = render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('cursor-pointer');
    });

    test('icon has proper alt attribute', () => {
      render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      const icon = screen.getByAltText('MFUND');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Casos edge', () => {
    test('handles missing product properties gracefully', () => {
      const incompleteProduct = {
        numberProduct: 'PROD123',
        nameProduct: 'TEST',
        balanceProduct: '0',
        detaildProduct: 'Test product'
      } as Product;

      expect(() => {
        render(
          <CardProduct
            product={incompleteProduct}
            isSelected={false}
            onSelect={mockOnSelect}
          />
        );
      }).not.toThrow();
    });

    test('handles zero balance', () => {
      const zeroBalanceProduct: Product = {
        ...mockProduct,
        balanceProduct: '0'
      };

      render(
        <CardProduct
          product={zeroBalanceProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('$0')).toBeInTheDocument();
    });
  });

  describe('Snapshot', () => {
    test('matches snapshot for unselected state', () => {
      const { container } = render(
        <CardProduct
          product={mockProduct}
          isSelected={false}
          onSelect={mockOnSelect}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot for selected state', () => {
      const { container } = render(
        <CardProduct
          product={mockProduct}
          isSelected={true}
          onSelect={mockOnSelect}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});