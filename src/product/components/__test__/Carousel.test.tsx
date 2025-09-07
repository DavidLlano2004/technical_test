import { render, screen, fireEvent } from '@testing-library/react';
import type { Product } from '../../interfaces/product';
import { Carousel } from '../carousel/Carousel';

// Mock de Swiper
jest.mock('swiper/react', () => ({
  Swiper: ({ children, ...props }: any) => (
    <div data-testid="swiper" {...props}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

// Mock de módulos de Swiper
jest.mock('swiper/modules', () => ({
  Navigation: 'Navigation',
}));

// Mock de CSS imports
jest.mock('../carousel/Carousel.css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css', () => ({}));

// Mock de CardProduct
jest.mock('../CardProduct', () => ({
  CardProduct: ({ product, isSelected, onSelect }: any) => (
    <div 
      data-testid={`card-product-${product.numberProduct}`}
      data-selected={isSelected}
      onClick={() => onSelect(product.numberProduct)}
    >
      <span>Product: {product.name}</span>
      <span>ID: {product.numberProduct}</span>
      <span>Selected: {isSelected ? 'true' : 'false'}</span>
    </div>
  ),
}));

// Mock de CardExploreProducts
jest.mock('../CardExploreProducts', () => ({
  CardExploreProducts: ({ actionButtonExplore }: any) => (
    <div 
      data-testid="card-explore-products"
      onClick={actionButtonExplore}
    >
      Explore Products
    </div>
  ),
}));

describe('Carousel', () => {
  const mockProducts: Product[] = [
    {
      numberProduct: '1',
      nameProduct: 'Producto 1',
      balanceProduct: "100",
      detaildProduct: 'Descripción del producto 1',
      iconProduct: 'image1.jpg',
    },
    {
      numberProduct: '2',
      nameProduct: 'Producto 2',
      balanceProduct: "200",
      detaildProduct: 'Descripción del producto 2',
      iconProduct: 'image2.jpg',
    },
    {
      numberProduct: '3',
      nameProduct: 'Producto 3',
      balanceProduct: "300",
      detaildProduct: 'Descripción del producto 3',
      iconProduct: 'image3.jpg',
    },
  ];

  const mockActionButtonExplore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debería renderizar el componente Swiper', () => {
    render(
      <Carousel 
        products={mockProducts} 
        actionButtonExplore={mockActionButtonExplore} 
      />
    );

    const swiper = screen.getByTestId('swiper');
    expect(swiper).toBeInTheDocument();
  });


  test('debería renderizar el número correcto de slides', () => {
    render(
      <Carousel 
        products={mockProducts} 
        actionButtonExplore={mockActionButtonExplore} 
      />
    );

    // Número de productos + 1 slide para CardExploreProducts
    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(mockProducts.length + 1);
  });

  test('debería renderizar CardExploreProducts', () => {
    render(
      <Carousel 
        products={mockProducts} 
        actionButtonExplore={mockActionButtonExplore} 
      />
    );

    const exploreCard = screen.getByTestId('card-explore-products');
    expect(exploreCard).toBeInTheDocument();
    expect(exploreCard).toHaveTextContent('Explore Products');
  });

  test('debería llamar actionButtonExplore cuando se hace clic en CardExploreProducts', () => {
    render(
      <Carousel 
        products={mockProducts} 
        actionButtonExplore={mockActionButtonExplore} 
      />
    );

    const exploreCard = screen.getByTestId('card-explore-products');
    fireEvent.click(exploreCard);

    expect(mockActionButtonExplore).toHaveBeenCalledTimes(1);
  });

  test('debería deseleccionar un producto cuando se hace clic dos veces', () => {
    render(
      <Carousel 
        products={mockProducts} 
        actionButtonExplore={mockActionButtonExplore} 
      />
    );

    const firstProductCard = screen.getByTestId('card-product-1');
    
    // Primer clic - seleccionar
    fireEvent.click(firstProductCard);
    expect(firstProductCard).toHaveAttribute('data-selected', 'true');

    // Segundo clic - deseleccionar
    fireEvent.click(firstProductCard);
    expect(firstProductCard).toHaveAttribute('data-selected', 'false');
  });

  test('debería permitir seleccionar solo un producto a la vez', () => {
    render(
      <Carousel 
        products={mockProducts} 
        actionButtonExplore={mockActionButtonExplore} 
      />
    );

    const firstProductCard = screen.getByTestId('card-product-1');
    const secondProductCard = screen.getByTestId('card-product-2');
    
    // Seleccionar primer producto
    fireEvent.click(firstProductCard);
    expect(firstProductCard).toHaveAttribute('data-selected', 'true');
    expect(secondProductCard).toHaveAttribute('data-selected', 'false');

    // Seleccionar segundo producto
    fireEvent.click(secondProductCard);
    expect(firstProductCard).toHaveAttribute('data-selected', 'false');
    expect(secondProductCard).toHaveAttribute('data-selected', 'true');
  });

  test('debería manejar lista vacía de productos', () => {
    render(
      <Carousel 
        products={[]} 
        actionButtonExplore={mockActionButtonExplore} 
      />
    );

    // Solo debería haber 1 slide (CardExploreProducts)
    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(1);

    // Y debería contener CardExploreProducts
    expect(screen.getByTestId('card-explore-products')).toBeInTheDocument();
  });

  test('debería mantener el estado de selección independiente para cada producto', () => {
    render(
      <Carousel 
        products={mockProducts} 
        actionButtonExplore={mockActionButtonExplore} 
      />
    );

    // Verificar que todos los productos inicialmente no están seleccionados
    mockProducts.forEach(product => {
      const card = screen.getByTestId(`card-product-${product.numberProduct}`);
      expect(card).toHaveAttribute('data-selected', 'false');
    });

    // Seleccionar producto específico
    const targetProductCard = screen.getByTestId('card-product-2');
    fireEvent.click(targetProductCard);

    // Solo el producto seleccionado debería cambiar
    expect(screen.getByTestId('card-product-1')).toHaveAttribute('data-selected', 'false');
    expect(screen.getByTestId('card-product-2')).toHaveAttribute('data-selected', 'true');
    expect(screen.getByTestId('card-product-3')).toHaveAttribute('data-selected', 'false');
  });
});