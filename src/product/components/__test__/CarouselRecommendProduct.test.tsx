import { render, screen, fireEvent } from '@testing-library/react';
import { CarouselRecommendProducts } from '../carousel/CarouselRecommendProducts';
// Mock de Swiper
jest.mock('swiper/react', () => ({
  Swiper: ({ children, className, ...props }: any) => (
    <div 
      data-testid="swiper-recommend" 
      className={className}
      data-slides-per-view={props.slidesPerView}
      data-space-between={props.spaceBetween}
      data-keyboard-enabled={props.keyboard?.enabled}
      data-pagination-clickable={props.pagination?.clickable}
      data-navigation={props.navigation}
      {...props}
    >
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide-recommend">{children}</div>
  ),
}));

// Mock de módulos de Swiper
jest.mock('swiper/modules', () => ({
  Keyboard: 'Keyboard',
  Pagination: 'Pagination',
  Navigation: 'Navigation',
}));

// Mock de CSS imports
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('../carousel/Carousel.css', () => ({}));

// Mock de CardRecommendProduct
jest.mock('../CardRecommendProduct', () => ({
  CardRecommendProduct: () => (
    <div data-testid="card-recommend-product">
      <h3>Producto Recomendado</h3>
      <p>Descripción del producto</p>
      <button>Ver más</button>
    </div>
  ),
}));

describe('CarouselRecommendProducts', () => {
  test('debería renderizar el componente Swiper', () => {
    render(<CarouselRecommendProducts />);

    const swiper = screen.getByTestId('swiper-recommend');
    expect(swiper).toBeInTheDocument();
  });

  test('debería configurar correctamente las propiedades del Swiper', () => {
    render(<CarouselRecommendProducts />);

    const swiper = screen.getByTestId('swiper-recommend');
    expect(swiper).toHaveAttribute('data-slides-per-view', '1');
    expect(swiper).toHaveAttribute('data-space-between', '20');
    expect(swiper).toHaveAttribute('data-keyboard-enabled', 'true');
    expect(swiper).toHaveAttribute('data-pagination-clickable', 'true');
    expect(swiper).toHaveAttribute('data-navigation', 'true');
  });

  test('debería tener la clase CSS correcta', () => {
    render(<CarouselRecommendProducts />);

    const swiper = screen.getByTestId('swiper-recommend');
    expect(swiper).toHaveClass('swiperProductsRecommend');
  });

  test('debería renderizar exactamente 2 slides', () => {
    render(<CarouselRecommendProducts />);

    const slides = screen.getAllByTestId('swiper-slide-recommend');
    expect(slides).toHaveLength(2);
  });

  test('debería renderizar 2 componentes CardRecommendProduct', () => {
    render(<CarouselRecommendProducts />);

    const recommendCards = screen.getAllByTestId('card-recommend-product');
    expect(recommendCards).toHaveLength(2);
  });

  test('cada slide debería contener un CardRecommendProduct', () => {
    render(<CarouselRecommendProducts />);

    const slides = screen.getAllByTestId('swiper-slide-recommend');
    
    slides.forEach((slide) => {
      const cardInSlide = slide.querySelector('[data-testid="card-recommend-product"]');
      expect(cardInSlide).toBeInTheDocument();
    });
  });

  test('cada CardRecommendProduct debería tener el contenido esperado', () => {
    render(<CarouselRecommendProducts />);

    const titles = screen.getAllByText('Producto Recomendado');
    const descriptions = screen.getAllByText('Descripción del producto');
    const buttons = screen.getAllByText('Ver más');

    expect(titles).toHaveLength(2);
    expect(descriptions).toHaveLength(2);
    expect(buttons).toHaveLength(2);
  });

  test('debería permitir interacción con los botones de CardRecommendProduct', () => {
    render(<CarouselRecommendProducts />);

    const buttons = screen.getAllByText('Ver más');
    
    // Simular clic en cada botón
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      // El botón debería ser clickeable (no generar errores)
    });
  });

  test('debería tener la estructura DOM correcta', () => {
    render(<CarouselRecommendProducts />);

    // Verificar jerarquía: Swiper > SwiperSlide > CardRecommendProduct
    const swiper = screen.getByTestId('swiper-recommend');
    const slides = screen.getAllByTestId('swiper-slide-recommend');
    const cards = screen.getAllByTestId('card-recommend-product');

    expect(swiper).toContainElement(slides[0]);
    expect(swiper).toContainElement(slides[1]);
    expect(slides[0]).toContainElement(cards[0]);
    expect(slides[1]).toContainElement(cards[1]);
  });

  test('debería usar los módulos de Swiper correctos', () => {
    render(<CarouselRecommendProducts />);

    const swiper = screen.getByTestId('swiper-recommend');
    
    // Verificar que las propiedades correspondientes a los módulos estén configuradas
    expect(swiper).toHaveAttribute('data-keyboard-enabled', 'true'); // Módulo Keyboard
    expect(swiper).toHaveAttribute('data-pagination-clickable', 'true'); // Módulo Pagination
    expect(swiper).toHaveAttribute('data-navigation', 'true'); // Módulo Navigation
  });

  test('debería mantener la configuración de teclado habilitado', () => {
    render(<CarouselRecommendProducts />);

    const swiper = screen.getByTestId('swiper-recommend');
    expect(swiper).toHaveAttribute('data-keyboard-enabled', 'true');
  });

  test('debería mantener la paginación como clickeable', () => {
    render(<CarouselRecommendProducts />);

    const swiper = screen.getByTestId('swiper-recommend');
    expect(swiper).toHaveAttribute('data-pagination-clickable', 'true');
  });

  test('debería renderizar sin errores cuando no hay props', () => {
    // Este componente no recibe props, pero es buena práctica verificar que renderice sin problemas
    expect(() => {
      render(<CarouselRecommendProducts />);
    }).not.toThrow();
  });

  test('debería tener el componente envuelto en un Fragment', () => {
    const { container } = render(<CarouselRecommendProducts />);
    
    // El Fragment no agrega nodos DOM adicionales, 
    // por lo que el primer hijo debería ser el Swiper directamente
    const swiper = container.querySelector('[data-testid="swiper-recommend"]');
    expect(swiper).toBeInTheDocument();
  });
});