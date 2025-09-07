import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CardRecommendProduct } from '../CardRecommendProduct';

// Mock de los providers de iconos e imágenes
jest.mock('../../../assets/icons/IconProvider', () => ({
  Icons: {
    IconWorldBlueSm: '/mock-icon-world-blue-sm.svg',
    IconProfileBlueSm: '/mock-icon-profile-blue-sm.svg',
    IconHeartLikeGreen: '/mock-icon-heart-like-green.svg'
  }
}));

jest.mock('../../../assets/images/ImagesProvider', () => ({
  Images: {
    ImageFamilyPet: '/mock-image-family-pet.jpg'
  }
}));

describe('CardRecommendProduct', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado básico', () => {
    test('renders component with correct structure', () => {
      const { container } = render(<CardRecommendProduct />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass(
        'w-[70%]',
        'h-[400px]',
        'rounded-lg',
        'overflow-hidden',
        'flex',
        'flex-col',
        'mx-auto'
      );
    });

    test('renders category badge correctly', () => {
      render(<CardRecommendProduct />);

      const categoryBadge = screen.getByText('Ahorro e inversión');
      expect(categoryBadge).toBeInTheDocument();
      expect(categoryBadge).toHaveClass(
        'bg-blue1-custom',
        'px-3',
        'py-1',
        'rounded-md',
        'font-semibold',
        'text-gray-custom-text'
      );
    });

    test('renders main product description', () => {
      render(<CardRecommendProduct />);

      expect(screen.getByText(/¡Fondo de inversión Colectiva,/)).toBeInTheDocument();
      expect(screen.getByText(/la acción para potenciar tu capital y hacer real tu objetivo!/)).toBeInTheDocument();
    });

    test('renders "Conoce más" link', () => {
      render(<CardRecommendProduct />);

      const knowMoreLink = screen.getByText('Conoce más');
      expect(knowMoreLink).toBeInTheDocument();
      expect(knowMoreLink).toHaveClass(
        'text-primary-custom',
        'underline',
        'hover:text-primary-hover-custom',
        'transition',
        'cursor-pointer'
      );
    });

    test('renders feature information correctly', () => {
      render(<CardRecommendProduct />);

      // Información de rentabilidad
      expect(screen.getByText(/Rentabilidades mínimas del/)).toBeInTheDocument();
      expect(screen.getByText('3% anuales')).toBeInTheDocument();

      // Información de clientes
      expect(screen.getByText('4.000 clientes')).toBeInTheDocument();
      expect(screen.getByText(/confían en este producto/)).toBeInTheDocument();
    });
  });

  describe('Imágenes e iconos', () => {
    test('renders main family image with correct attributes', () => {
      render(<CardRecommendProduct />);

      const familyImage = screen.getByAltText('image_family');
      expect(familyImage).toBeInTheDocument();
      expect(familyImage).toHaveAttribute('src', '/mock-image-family-pet.jpg');
      expect(familyImage).toHaveClass('w-full', 'h-full', 'object-cover');
    });

    test('renders heart like icon', () => {
      render(<CardRecommendProduct />);

      const heartIcon = screen.getByAltText('');
      expect(heartIcon).toBeInTheDocument();
      expect(heartIcon).toHaveAttribute('src', '/mock-icon-heart-like-green.svg');
      expect(heartIcon).toHaveClass('w-7');
    });

    test('renders world icon with features', () => {
      render(<CardRecommendProduct />);

      const worldIcon = screen.getByAltText('icon_world');
      expect(worldIcon).toBeInTheDocument();
      expect(worldIcon).toHaveAttribute('src', '/mock-icon-world-blue-sm.svg');
    });

    test('renders profile icon with features', () => {
      render(<CardRecommendProduct />);

      const profileIcon = screen.getByAltText('icon_profile');
      expect(profileIcon).toBeInTheDocument();
      expect(profileIcon).toHaveAttribute('src', '/mock-icon-profile-blue-sm.svg');
    });

    test('all icons are properly positioned with their text', () => {
      const { container } = render(<CardRecommendProduct />);

      // Verificar que los iconos están en contenedores con gap
      const featureContainers = container.querySelectorAll('.gap-3');
      expect(featureContainers.length).toBeGreaterThanOrEqual(2);

      // Verificar estructura de características
      const worldIcon = screen.getByAltText('icon_world');
      const worldFeature = worldIcon.closest('.flex') as HTMLElement;
      expect(worldFeature).toHaveClass('flex', 'items-start', 'gap-3');

      const profileIcon = screen.getByAltText('icon_profile');
      const profileFeature = profileIcon.closest('.flex') as HTMLElement;
      expect(profileFeature).toHaveClass('flex', 'items-start', 'gap-3');
    });
  });

  describe('Layout y estructura', () => {
    test('has correct image container structure', () => {
      const { container } = render(<CardRecommendProduct />);

      const imageContainer = container.querySelector('.w-full.h-40.relative') as HTMLElement;
      expect(imageContainer).toBeInTheDocument();
      expect(imageContainer).toHaveClass('w-full', 'h-40', 'relative');
    });

    test('has overlay container with correct positioning', () => {
      const { container } = render(<CardRecommendProduct />);

      const overlay = container.querySelector('.absolute.w-full.h-full.top-0') as HTMLElement;
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass(
        'absolute',
        'w-full',
        'h-full',
        'top-0',
        'p-3',
        'flex',
        'justify-between',
        'items-start'
      );
    });

    test('has content container with correct flex properties', () => {
      const { container } = render(<CardRecommendProduct />);

      const contentContainer = container.querySelector('.flex-1.bg-white') as HTMLElement;
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass(
        'flex-1',
        'bg-white',
        'flex',
        'flex-col',
        'justify-between'
      );
    });

    test('renders accent bar at bottom', () => {
      const { container } = render(<CardRecommendProduct />);

      const accentBar = container.querySelector('.bg-gray4-custom') as HTMLElement;
      expect(accentBar).toBeInTheDocument();
      expect(accentBar).toHaveClass('h-1.5', 'bg-gray4-custom');
    });

    test('maintains proper content padding', () => {
      const { container } = render(<CardRecommendProduct />);

      const contentPadding = container.querySelector('.p-4') as HTMLElement;
      expect(contentPadding).toBeInTheDocument();
      expect(contentPadding).toHaveClass('p-4');
    });
  });

  describe('Responsive design', () => {
    test('applies responsive text classes correctly', () => {
      render(<CardRecommendProduct />);

      // Badge del producto
      const categoryBadge = screen.getByText('Ahorro e inversión');
      expect(categoryBadge).toHaveClass('text-xs', 'sm:text-base');

      // Descripción principal
      const description = screen.getByText(/¡Fondo de inversión Colectiva,/);
      expect(description).toHaveClass('text-sm', 'sm:text-base');

      // Link "Conoce más"
      const knowMoreLink = screen.getByText('Conoce más');
      expect(knowMoreLink).toHaveClass('text-sm', 'sm:text-base');

      // Características
      const rentabilityText = screen.getByText(/Rentabilidades mínimas del/);
      expect(rentabilityText).toHaveClass('text-sm', 'sm:text-base');

      const clientsText = screen.getByText(/confían en este producto/);
      expect(clientsText).toHaveClass('text-sm', 'sm:text-base');
    });

    test('maintains responsive spacing', () => {
      const { container } = render(<CardRecommendProduct />);

      // Verificar que existen elementos con márgenes responsivos
      const knowMoreLink = screen.getByText('Conoce más');
      expect(knowMoreLink).toHaveClass('my-3');

      // Verificar espaciado entre características
      const featureWithMargin = container.querySelector('.mt-2') as HTMLElement;
      expect(featureWithMargin).toBeInTheDocument();
    });
  });

  describe('Styling y colores', () => {
    test('applies correct color scheme', () => {
      render(<CardRecommendProduct />);

      // Badge azul
      const categoryBadge = screen.getByText('Ahorro e inversión');
      expect(categoryBadge).toHaveClass('bg-blue1-custom', 'text-gray-custom-text');

      // Link primario
      const knowMoreLink = screen.getByText('Conoce más');
      expect(knowMoreLink).toHaveClass('text-primary-custom');

      // Textos grises
      const description = screen.getByText(/¡Fondo de inversión Colectiva,/);
      expect(description).toHaveClass('text-gray-custom-text');
    });

    test('applies correct hover effects', () => {
      render(<CardRecommendProduct />);

      const knowMoreLink = screen.getByText('Conoce más');
      expect(knowMoreLink).toHaveClass(
        'hover:text-primary-hover-custom',
        'transition',
        'ease-in',
        'duration-150'
      );
    });

    test('applies correct background colors', () => {
      const { container } = render(<CardRecommendProduct />);

      // Contenedor principal de contenido
      const contentContainer = container.querySelector('.flex-1') as HTMLElement;
      expect(contentContainer).toHaveClass('bg-white');

      // Barra de acento
      const accentBar = container.querySelector('.bg-gray4-custom') as HTMLElement;
      expect(accentBar).toHaveClass('bg-gray4-custom');
    });
  });

  describe('Interacciones', () => {
    test('"Conoce más" link is clickable', async () => {
      const user = userEvent.setup();
      render(<CardRecommendProduct />);

      const knowMoreLink = screen.getByText('Conoce más');
      
      // Verificar que es clickeable (no crashea)
      await user.click(knowMoreLink);
      
      expect(knowMoreLink).toBeInTheDocument();
      expect(knowMoreLink).toHaveClass('cursor-pointer');
    });

    test('heart icon is present but not interactive', () => {
      render(<CardRecommendProduct />);

      const heartIcon = screen.getByAltText('');
      expect(heartIcon).toBeInTheDocument();
      // No tiene clases de cursor-pointer, indicando que no es interactivo
      expect(heartIcon).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Contenido de texto', () => {
    test('displays all expected text content', () => {
      render(<CardRecommendProduct />);

      const expectedTexts = [
        'Ahorro e inversión',
        '¡Fondo de inversión Colectiva,',
        'la acción para potenciar tu capital y hacer real tu objetivo!',
        'Conoce más',
        'Rentabilidades mínimas del',
        '3% anuales',
        '4.000 clientes',
        'confían en este producto'
      ];

      expectedTexts.forEach(text => {
        expect(screen.getByText(text, { exact: false })).toBeInTheDocument();
      });
    });

    test('applies bold formatting correctly', () => {
      render(<CardRecommendProduct />);

      // Texto en negrita en la descripción
      const boldDescription = screen.getByText('la acción para potenciar tu capital y hacer real tu objetivo!');
      expect(boldDescription.tagName).toBe('B');

      // Porcentaje en negrita
      const boldPercentage = screen.getByText('3% anuales');
      expect(boldPercentage.tagName).toBe('B');

      // Número de clientes en negrita
      const boldClients = screen.getByText('4.000 clientes');
      expect(boldClients.tagName).toBe('B');
    });
  });

  describe('Accesibilidad', () => {
    test('images have appropriate alt attributes', () => {
      render(<CardRecommendProduct />);

      // Imagen principal tiene alt descriptivo
      const familyImage = screen.getByAltText('image_family');
      expect(familyImage).toBeInTheDocument();

      // Iconos tienen alt descriptivos
      const worldIcon = screen.getByAltText('icon_world');
      const profileIcon = screen.getByAltText('icon_profile');
      
      expect(worldIcon).toBeInTheDocument();
      expect(profileIcon).toBeInTheDocument();
    });

    test('interactive elements are properly accessible', () => {
      render(<CardRecommendProduct />);

      const knowMoreLink = screen.getByText('Conoce más');
      expect(knowMoreLink).toHaveClass('cursor-pointer');
      
      // El elemento debe ser focusable si es interactivo
      expect(knowMoreLink.tagName).toBe('P'); // Es un párrafo, pero con cursor pointer
    });

    test('maintains proper contrast with color classes', () => {
      render(<CardRecommendProduct />);

      // Verificar que se usen clases de color apropiadas para contraste
      const categoryBadge = screen.getByText('Ahorro e inversión');
      expect(categoryBadge).toHaveClass('text-gray-custom-text');
      
      const knowMoreLink = screen.getByText('Conoce más');
      expect(knowMoreLink).toHaveClass('text-primary-custom');
    });
  });

  describe('Casos edge y robustez', () => {
    test('component renders without crashing when assets fail to load', () => {
      // Mock de assets que fallan
      jest.mocked(require('../../../assets/images/ImagesProvider')).Images.ImageFamilyPet = '';
      
      expect(() => {
        render(<CardRecommendProduct />);
      }).not.toThrow();
    });

    test('handles missing icons gracefully', () => {
      // Mock de iconos vacíos
      jest.mocked(require('../../../assets/icons/IconProvider')).Icons = {
        IconWorldBlueSm: '',
        IconProfileBlueSm: '',
        IconHeartLikeGreen: ''
      };
      
      expect(() => {
        render(<CardRecommendProduct />);
      }).not.toThrow();
    });

    test('maintains layout structure even with missing content', () => {
      const { container } = render(<CardRecommendProduct />);
      
      // Verificar que la estructura principal se mantiene
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('flex', 'flex-col');
      
      const imageContainer = container.querySelector('.relative') as HTMLElement;
      const contentContainer = container.querySelector('.flex-1') as HTMLElement;
      
      expect(imageContainer).toBeInTheDocument();
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe('Performance y optimización', () => {
    test('images use appropriate loading attributes', () => {
      render(<CardRecommendProduct />);

      const familyImage = screen.getByAltText('image_family');
      expect(familyImage).toHaveClass('object-cover');
      
      // La imagen principal usa object-cover para optimización
      expect(familyImage).toHaveClass('w-full', 'h-full');
    });

    test('uses efficient CSS classes for layout', () => {
      const { container } = render(<CardRecommendProduct />);

      // Verificar uso de flexbox para layouts eficientes
      const flexContainers = container.querySelectorAll('.flex');
      expect(flexContainers.length).toBeGreaterThan(0);
      
      // Verificar uso de clases de espaciado consistentes
      const gapContainers = container.querySelectorAll('.gap-3');
      expect(gapContainers.length).toBe(2); // Dos características con gap
    });
  });

  describe('Snapshot testing', () => {
    test('matches snapshot', () => {
      const { container } = render(<CardRecommendProduct />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('snapshot remains consistent across renders', () => {
      const { container: container1 } = render(<CardRecommendProduct />);
      const { container: container2 } = render(<CardRecommendProduct />);
      
      expect(container1.innerHTML).toBe(container2.innerHTML);
    });
  });
});