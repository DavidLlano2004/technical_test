import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Icons } from '../../../assets/icons/IconProvider';
Icons

// Mock de framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));


// Mock de hooks
const mockProductsQuery = {
  isLoading: false,
  data: {
    listCard: [
      {
        numberProduct: '1',
        nameProduct: 'MFUND',
        name: 'Producto MFUND',
        price: 100000,
        description: 'Descripción MFUND',
        image: 'mfund.jpg',
      },
      {
        numberProduct: '2',
        nameProduct: 'CREA',
        name: 'Producto CREA',
        price: 200000,
        description: 'Descripción CREA',
        image: 'crea.jpg',
      },
      {
        numberProduct: '3',
        nameProduct: 'FICS',
        name: 'Producto FICS',
        price: 300000,
        description: 'Descripción FICS',
        image: 'fics.jpg',
      },
      {
        numberProduct: '4',
        nameProduct: 'BOLT',
        name: 'Producto BOLT',
        price: 400000,
        description: 'Descripción BOLT',
        image: 'bolt.jpg',
      },
    ],
  },
  error: null,
};

jest.mock('../../hooks/useProducts', () => ({
  useProducts: jest.fn(() => ({
    productsQuery: mockProductsQuery,
  })),
}));

// Mock de assets
jest.mock('../../../assets/icons/IconProvider', () => ({
  Icons: {
    IconHelpGreen: 'mock-help-icon.svg',
  },
}));

jest.mock('../../../assets/images/ImagesProvider', () => ({
  Images: {
    ImageStarsBg: 'mock-stars-bg.jpg',
    ImagePeopleHug: 'mock-people-hug.jpg',
  },
}));

// Mock de componentes
jest.mock('../../components/CardInfoObjective', () => ({
  CardInfoObjective: () => (
    <div data-testid="card-info-objective">
      Card Info Objective Content
    </div>
  ),
}));

jest.mock('../../components/carousel/Carousel', () => ({
  Carousel: ({ products, actionButtonExplore }: any) => (
    <div data-testid="carousel">
      <div data-testid="products-count">{products.length} productos</div>
      <button 
        data-testid="explore-button"
        onClick={actionButtonExplore}
      >
        Explorar productos
      </button>
    </div>
  ),
}));

jest.mock('../../components/carousel/CarouselRecommendProducts', () => ({
  CarouselRecommendProducts: () => (
    <div data-testid="carousel-recommend-products">
      Carousel Recommend Products Content
    </div>
  ),
}));

jest.mock('../../../shared/components/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

// Wrapper con providers
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  );

  return Wrapper;
};

describe('Home', () => {
  let useProductsMock: jest.Mock;

  beforeEach(() => {
    useProductsMock = require('../../hooks/useProducts').useProducts;
    jest.clearAllMocks();
  });

  test('debería mostrar el loader cuando está cargando', () => {
    useProductsMock.mockReturnValue({
      productsQuery: {
        isLoading: true,
        data: null,
        error: null,
      },
    });

    const Wrapper = createWrapper();
    render(<Home />, { wrapper: Wrapper });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText('¡Tú objetivo ha sido agregado exitosamente')).not.toBeInTheDocument();
  });

  test('no debería mostrar CarouselRecommendProducts inicialmente', () => {
    const Wrapper = createWrapper();
    render(<Home />, { wrapper: Wrapper });

    expect(screen.queryByTestId('carousel-recommend-products')).not.toBeInTheDocument();
  });

  test('debería manejar productos vacíos correctamente', () => {
    useProductsMock.mockReturnValue({
      productsQuery: {
        isLoading: false,
        data: { listCard: [] },
        error: null,
      },
    });

    const Wrapper = createWrapper();
    render(<Home />, { wrapper: Wrapper });

    expect(screen.getByTestId('products-count')).toHaveTextContent('0 productos');
  });

  test('debería manejar datos nulos correctamente', () => {
    useProductsMock.mockReturnValue({
      productsQuery: {
        isLoading: false,
        data: null,
        error: null,
      },
    });

    const Wrapper = createWrapper();
    render(<Home />, { wrapper: Wrapper });

    expect(screen.getByTestId('products-count')).toHaveTextContent('0 productos');
  });

  test('debería aplicar el mapeo de iconos por defecto para productos desconocidos', () => {
    useProductsMock.mockReturnValue({
      productsQuery: {
        isLoading: false,
        data: {
          listCard: [
            {
              numberProduct: '5',
              nameProduct: 'UNKNOWN',
              name: 'Producto Desconocido',
              price: 500000,
              description: 'Descripción desconocida',
              image: 'unknown.jpg',
            },
          ],
        },
        error: null,
      },
    });

    const Wrapper = createWrapper();
    render(<Home />, { wrapper: Wrapper });

    // El carousel debería renderizar con 1 producto
    expect(screen.getByTestId('products-count')).toHaveTextContent('1 productos');
  });

  test('debería tener las clases CSS correctas en elementos principales', () => {
    const Wrapper = createWrapper();
    render(<Home />, { wrapper: Wrapper });

    // Verificar clases en el título principal
    const mainTitle = screen.getByText('¡Tú objetivo ha sido agregado exitosamente');
    expect(mainTitle).toHaveClass('text-white', 'font-bold', 'sm:text-3xl', 'text-lg', 'text-center');

    // Verificar botón de asociar
    const associateButton = screen.getByText('Asociar a objetivo');
    expect(associateButton).toHaveClass('bg-gray3-custom', 'hover:bg-[#CFCFCF]', 'cursor-pointer');
  });

  test('debería manejar el clic en el botón de ayuda sin errores', () => {
    const Wrapper = createWrapper();
    render(<Home />, { wrapper: Wrapper });

    const helpButton = screen.getByAltText('icon_help').closest('button');
    expect(helpButton).toBeInTheDocument();
    
    // El clic no debería generar errores
    expect(() => {
      fireEvent.click(helpButton!);
    }).not.toThrow();
  });

  test('debería renderizar sin errores', () => {
    const Wrapper = createWrapper();
    
    expect(() => {
      render(<Home />, { wrapper: Wrapper });
    }).not.toThrow();
  });

  test('debería mantener el estado isProductShow después de mostrar productos recomendados', async () => {
    const Wrapper = createWrapper();
    render(<Home />, { wrapper: Wrapper });

    const exploreButton = screen.getByTestId('explore-button');
    fireEvent.click(exploreButton);

    await waitFor(() => {
      expect(screen.getByTestId('carousel-recommend-products')).toBeInTheDocument();
    });

    // El componente debería seguir visible
    expect(screen.getByTestId('carousel-recommend-products')).toBeInTheDocument();
  });
});