import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CardInfoObjective } from '../CardInfoObjective';


// Mock de los providers de iconos e imágenes
jest.mock('../../../assets/icons/IconProvider', () => ({
  Icons: {
    IconStarOrange: '/mock-icon-star-orange.svg',
    IconCheckGreen: '/mock-icon-check-green.svg'
  }
}));

jest.mock('../../../assets/images/ImagesProvider', () => ({
  Images: {
    ImageMountainBg: '/mock-image-mountain-bg.png'
  }
}));

describe('CardInfoObjective', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado básico', () => {
    test('renders main objective information correctly', () => {
      render(<CardInfoObjective />);

      // Verificar el título del objetivo
      expect(screen.getByText('Conocer mi sobrino')).toBeInTheDocument();
      
      // Verificar la categoría
      expect(screen.getByText('Categoría: Bienestar')).toBeInTheDocument();
    });

    test('renders all date and amount information', () => {
      render(<CardInfoObjective />);

      // Verificar información de fecha
      expect(screen.getByText('En esta fecha:')).toBeInTheDocument();
      expect(screen.getByText('Diciembre/2022')).toBeInTheDocument();

      // Verificar meta
      expect(screen.getByText('Lograrás:')).toBeInTheDocument();
      expect(screen.getByText('$6.000.000')).toBeInTheDocument();

      // Verificar progreso actual
      expect(screen.getByText('Ya cuentas con:')).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
    });

    test('renders action buttons with correct text', () => {
      render(<CardInfoObjective />);

      // Botón revisar objetivo
      const reviewButton = screen.getByRole('button', { name: /revisar objetivo/i });
      expect(reviewButton).toBeInTheDocument();
      expect(reviewButton).toHaveClass('underline', 'text-primary-custom');

      // Botón asociar productos
      const associateButton = screen.getByRole('button', { name: /¡asocia productos para monitorear tú progreso!/i });
      expect(associateButton).toBeInTheDocument();
      expect(associateButton).toHaveClass('underline', 'text-primary-custom');
    });

    test('renders all images with correct attributes', () => {
      render(<CardInfoObjective />);

      // Icono de estrella
      const starIcon = screen.getByAltText('icon_star');
      expect(starIcon).toBeInTheDocument();
      expect(starIcon).toHaveAttribute('src', '/mock-icon-star-orange.svg');

      // Icono de check
      const checkIcon = screen.getByAltText('icon_check');
      expect(checkIcon).toBeInTheDocument();
      expect(checkIcon).toHaveAttribute('src', '/mock-icon-check-green.svg');

      // Imagen de fondo de montaña
      const mountainImage = screen.getByAltText('');
      expect(mountainImage).toBeInTheDocument();
      expect(mountainImage).toHaveAttribute('src', '/mock-image-mountain-bg.png');
    });
  });

  describe('Estilos y clases CSS', () => {
    test('applies correct background colors to information sections', () => {
      render(<CardInfoObjective />);

      // Verificar color de fondo para la fecha
      const dateElement = screen.getByText('Diciembre/2022');
      expect(dateElement).toHaveClass('bg-blue-light-custom');

      // Verificar color de fondo para la meta
      const goalElement = screen.getByText('$6.000.000');
      expect(goalElement).toHaveClass('bg-yellow-custom');

      // Verificar color de fondo para el progreso actual
      const currentElement = screen.getByText('$0');
      expect(currentElement).toHaveClass('bg-green-light-custom');
    });

    test('applies correct container classes', () => {
      const { container } = render(<CardInfoObjective />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass(
        'bg-white',
        'rounded-lg',
        'shadow-xl',
        'relative',
        'overflow-hidden'
      );
    });

    test('applies responsive classes correctly', () => {
      const { container } = render(<CardInfoObjective />);
      
      const mainContainer = container.firstChild as HTMLElement;
      // Verificar clases responsivas
      expect(mainContainer).toHaveClass('sm:w-[580px]', 'w-full');
      expect(mainContainer).toHaveClass('sm:p-10', 'p-5');
    });

    test('applies correct styling to buttons', () => {
      render(<CardInfoObjective />);

      const reviewButton = screen.getByRole('button', { name: /revisar objetivo/i });
      expect(reviewButton).toHaveClass(
        'underline',
        'text-primary-custom',
        'font-semibold',
        'hover:text-primary-hover-custom',
        'transition',
        'cursor-pointer'
      );

      const associateButton = screen.getByRole('button', { name: /¡asocia productos para monitorear tú progreso!/i });
      expect(associateButton).toHaveClass(
        'underline',
        'text-primary-custom',
        'font-semibold',
        'hover:text-primary-hover-custom',
        'transition',
        'cursor-pointer'
      );
    });
  });

  describe('Interacciones', () => {
    test('review button is clickable', async () => {
      const user = userEvent.setup();
      render(<CardInfoObjective />);

      const reviewButton = screen.getByRole('button', { name: /revisar objetivo/i });
      
      // Verificar que el botón es clickeable (no crashea)
      await user.click(reviewButton);
      
      // Como no hay función onClick definida, solo verificamos que el botón existe y es clickeable
      expect(reviewButton).toBeInTheDocument();
    });

    test('associate products button is clickable', async () => {
      const user = userEvent.setup();
      render(<CardInfoObjective />);

      const associateButton = screen.getByRole('button', { name: /¡asocia productos para monitorear tú progreso!/i });
      
      // Verificar que el botón es clickeable (no crashea)
      await user.click(associateButton);
      
      // Como no hay función onClick definida, solo verificamos que el botón existe y es clickeable
      expect(associateButton).toBeInTheDocument();
    });

    test('buttons have hover effects', () => {
      render(<CardInfoObjective />);

      const reviewButton = screen.getByRole('button', { name: /revisar objetivo/i });
      const associateButton = screen.getByRole('button', { name: /¡asocia productos para monitorear tú progreso!/i });

      // Verificar que ambos botones tienen clases de hover
      expect(reviewButton).toHaveClass('hover:text-primary-hover-custom');
      expect(associateButton).toHaveClass('hover:text-primary-hover-custom');
    });
  });

  describe('Layout y estructura', () => {
    test('renders information in correct sections', () => {
      render(<CardInfoObjective />);

      // Verificar que las secciones principales existen
      const dateSection = screen.getByText('En esta fecha:').closest('div');
      const goalSection = screen.getByText('Lograrás:').closest('div');
      const currentSection = screen.getByText('Ya cuentas con:').closest('div');

      expect(dateSection).toBeInTheDocument();
      expect(goalSection).toBeInTheDocument();
      expect(currentSection).toBeInTheDocument();
    });

    test('renders mountain background image with correct positioning', () => {
      render(<CardInfoObjective />);

      const mountainImage = screen.getByAltText('');
      expect(mountainImage).toHaveClass('absolute', 'bottom-0', 'right-0');
    });

    test('maintains proper spacing and layout structure', () => {
      const { container } = render(<CardInfoObjective />);

      // Verificar que la estructura general se mantiene
      const flexContainers = container.querySelectorAll('.flex');
      expect(flexContainers.length).toBeGreaterThan(0);

      const gapContainers = container.querySelectorAll('.gap-5, .gap-1');
      expect(gapContainers.length).toBeGreaterThan(0);
    });
  });

  describe('Contenido estático', () => {
    test('displays all static text content correctly', () => {
      render(<CardInfoObjective />);

      const expectedTexts = [
        'Conocer mi sobrino',
        'Categoría: Bienestar',
        'Revisar objetivo',
        'En esta fecha:',
        'Diciembre/2022',
        'Lograrás:',
        '$6.000.000',
        'Ya cuentas con:',
        '$0',
        '¡Asocia productos para monitorear tú progreso!'
      ];

      expectedTexts.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    test('applies correct font weights and sizes', () => {
      render(<CardInfoObjective />);

      // Título principal
      const mainTitle = screen.getByText('Conocer mi sobrino');
      expect(mainTitle).toHaveClass('font-bold');

      // Categoría
      const category = screen.getByText('Categoría: Bienestar');
      expect(category).toHaveClass('font-bold');

      // Valores monetarios
      const goalAmount = screen.getByText('$6.000.000');
      const currentAmount = screen.getByText('$0');
      expect(goalAmount).toHaveClass('font-bold');
      expect(currentAmount).toHaveClass('font-bold');
    });
  });

  describe('Accesibilidad', () => {
    test('all images have alt attributes', () => {
      render(<CardInfoObjective />);

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });

    test('buttons are properly accessible', () => {
      render(<CardInfoObjective />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('cursor-pointer');
      });
    });

    test('maintains semantic structure', () => {
      render(<CardInfoObjective />);

      // Verificar que los botones están correctamente etiquetados
      expect(screen.getByRole('button', { name: /revisar objetivo/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /¡asocia productos para monitorear tú progreso!/i })).toBeInTheDocument();
    });
  });

  describe('Responsive design', () => {
    test('applies responsive text classes correctly', () => {
      render(<CardInfoObjective />);

      const mainTitle = screen.getByText('Conocer mi sobrino');
      expect(mainTitle).toHaveClass('sm:text-xl', 'text-base');

      const category = screen.getByText('Categoría: Bienestar');
      expect(category).toHaveClass('sm:text-base', 'text-sm');
    });

    test('applies responsive layout classes', () => {
      const { container } = render(<CardInfoObjective />);

      // Verificar contenedores con clases responsivas
      const flexWrapContainers = container.querySelectorAll('.flex-wrap');
      expect(flexWrapContainers.length).toBeGreaterThan(0);

      const responsiveJustify = container.querySelectorAll('.lg\\:justify-between');
      expect(responsiveJustify.length).toBeGreaterThan(0);
    });
  });

  describe('Snapshot testing', () => {
    test('matches snapshot', () => {
      const { container } = render(<CardInfoObjective />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});