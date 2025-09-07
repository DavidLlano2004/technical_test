import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CardExploreProducts } from '../CardExploreProducts';

// Mock del provider de imágenes
jest.mock('../../../assets/images/ImagesProvider', () => ({
  Images: {
    ImagePeopleHug: '/mock-image-people-hug.jpg'
  }
}));

describe('CardExploreProducts', () => {
  const mockActionButtonExplore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado básico', () => {
    test('renders component with correct structure', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      // Verificar que el componente se renderiza
      const container = screen.getByRole('button', { name: /explora ahora/i }).closest('div');
      expect(container).toBeInTheDocument();
    });

    test('renders explore button with correct text', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      expect(exploreButton).toBeInTheDocument();
      expect(exploreButton).toHaveTextContent('Explora ahora');
    });

    test('applies correct container classes', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass(
        'w-full',
        'bg-white',
        'h-[400px]',
        'rounded-lg',
        'flex-col',
        'flex',
        'justify-between',
        'overflow-hidden',
        'border-[0.5px]',
        'border-[#d8d8d8]'
      );
    });

    test('renders orange accent bar at bottom', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);
      
      const accentBar = container.querySelector('.bg-orange-light-custom');
      expect(accentBar).toBeInTheDocument();
      expect(accentBar).toHaveClass('h-1.5');
    });
  });

  describe('Background image styling', () => {
    test('applies background image styles correctly', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);
      
      const backgroundContainer = container.querySelector('.flex-1');
      expect(backgroundContainer).toBeInTheDocument();
      expect(backgroundContainer).toHaveStyle({
        background: 'url(/mock-image-people-hug.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top'
      });
    });

    test('applies correct layout classes to background container', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);
      
      const backgroundContainer = container.querySelector('.flex-1');
      expect(backgroundContainer).toHaveClass(
        'flex-1',
        'flex-col',
        'flex',
        'justify-end',
        'items-end',
        'p-3'
      );
    });
  });

  describe('Button styling and behavior', () => {
    test('applies correct button classes', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      expect(exploreButton).toHaveClass(
        'text-white',
        'underline',
        'bg-primary-custom',
        'hover:bg-primary-hover-custom',
        'cursor-pointer',
        'px-5',
        'py-1',
        'w-auto',
        'rounded-2xl',
        'text-lg',
        'active:opacity-80',
        'transition-all',
        'ease-in',
        'duration-200'
      );
    });

    test('button has correct styling properties', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      
      // Verificar clases específicas importantes
      expect(exploreButton).toHaveClass('bg-primary-custom');
      expect(exploreButton).toHaveClass('hover:bg-primary-hover-custom');
      expect(exploreButton).toHaveClass('text-white');
      expect(exploreButton).toHaveClass('underline');
      expect(exploreButton).toHaveClass('rounded-2xl');
    });

    test('button has transition and animation classes', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      expect(exploreButton).toHaveClass(
        'active:opacity-80',
        'transition-all',
        'ease-in',
        'duration-200'
      );
    });
  });

  describe('Interactions', () => {
    test('calls actionButtonExplore when button is clicked with userEvent', async () => {
      const user = userEvent.setup();
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      await user.click(exploreButton);

      expect(mockActionButtonExplore).toHaveBeenCalledTimes(1);
    });

    test('calls actionButtonExplore when button is clicked with fireEvent', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      fireEvent.click(exploreButton);

      expect(mockActionButtonExplore).toHaveBeenCalledTimes(1);
    });

    test('calls actionButtonExplore multiple times on multiple clicks', async () => {
      const user = userEvent.setup();
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      
      await user.click(exploreButton);
      await user.click(exploreButton);
      await user.click(exploreButton);

      expect(mockActionButtonExplore).toHaveBeenCalledTimes(3);
    });

    test('button is enabled and clickable', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      expect(exploreButton).toBeEnabled();
      expect(exploreButton).not.toBeDisabled();
    });
  });

  describe('Props handling', () => {
    test('accepts and uses actionButtonExplore prop correctly', () => {
      const customAction = jest.fn();
      render(<CardExploreProducts actionButtonExplore={customAction} />);

      const exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      fireEvent.click(exploreButton);

      expect(customAction).toHaveBeenCalledTimes(1);
      expect(mockActionButtonExplore).not.toHaveBeenCalled();
    });

    test('handles different callback functions', () => {
      const action1 = jest.fn();
      const action2 = jest.fn();

      // Render con primera función
      const { rerender } = render(<CardExploreProducts actionButtonExplore={action1} />);
      
      let exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      fireEvent.click(exploreButton);
      
      expect(action1).toHaveBeenCalledTimes(1);
      expect(action2).not.toHaveBeenCalled();

      // Re-render con segunda función
      rerender(<CardExploreProducts actionButtonExplore={action2} />);
      
      exploreButton = screen.getByRole('button', { name: /explora ahora/i });
      fireEvent.click(exploreButton);
      
      expect(action1).toHaveBeenCalledTimes(1); // No cambió
      expect(action2).toHaveBeenCalledTimes(1); // Nueva función llamada
    });
  });

  describe('Layout and positioning', () => {
    test('button is positioned correctly within container', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);
      
      const buttonContainer = screen.getByRole('button', { name: /explora ahora/i }).parentElement;
      const backgroundContainer = container.querySelector('.flex-1');
      
      expect(backgroundContainer).toContainElement(buttonContainer);
      expect(backgroundContainer).toHaveClass('justify-end', 'items-end');
    });

    test('maintains correct component structure', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);
      
      // Verificar estructura: container principal -> background container -> button container -> button
      const mainContainer = container.firstChild as HTMLElement;
      const backgroundContainer = mainContainer.querySelector('.flex-1');
      const buttonContainer = backgroundContainer?.querySelector('div');
      const button = buttonContainer?.querySelector('button');
      
      expect(mainContainer).toContainElement(backgroundContainer);
      expect(backgroundContainer).toContainElement(buttonContainer);
      expect(buttonContainer).toContainElement(button);
    });

    test('accent bar is at the bottom of container', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      const accentBar = mainContainer.querySelector('.bg-orange-light-custom');
      
      // El accent bar debería ser el último hijo del container principal
      expect(mainContainer.lastElementChild).toBe(accentBar);
    });
  });

  describe('Accessibility', () => {
    test('button has correct role', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    test('button has accessible name', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const button = screen.getByRole('button', { name: /explora ahora/i });
      expect(button).toHaveAccessibleName('Explora ahora');
    });

    test('button is focusable', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const button = screen.getByRole('button', { name: /explora ahora/i });
      button.focus();
      
      expect(button).toHaveFocus();
    });

    test('component has proper cursor pointer on button', () => {
      render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const button = screen.getByRole('button', { name: /explora ahora/i });
      expect(button).toHaveClass('cursor-pointer');
    });
  });

  describe('Visual design', () => {
    test('applies correct color scheme', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      // Contenedor principal blanco
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('bg-white');

      // Botón con colores primarios
      const button = screen.getByRole('button', { name: /explora ahora/i });
      expect(button).toHaveClass('bg-primary-custom', 'text-white');

      // Barra de acento naranja
      const accentBar = container.querySelector('.bg-orange-light-custom');
      expect(accentBar).toBeInTheDocument();
    });

    test('has correct dimensions and spacing', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('h-[400px]', 'w-full');

      const backgroundContainer = container.querySelector('.flex-1') as HTMLElement;
      expect(backgroundContainer).toHaveClass('p-3');

      const button = screen.getByRole('button', { name: /explora ahora/i });
      expect(button).toHaveClass('px-5', 'py-1');
    });
  });

  describe('Error handling and edge cases', () => {
    test('handles undefined actionButtonExplore gracefully', () => {
      // TypeScript no permitiría esto, pero testear el caso edge
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<CardExploreProducts actionButtonExplore={undefined as any} />);
      }).not.toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe('Snapshot testing', () => {
    test('matches snapshot', () => {
      const { container } = render(<CardExploreProducts actionButtonExplore={mockActionButtonExplore} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with different callback', () => {
      const differentCallback = jest.fn();
      const { container } = render(<CardExploreProducts actionButtonExplore={differentCallback} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});