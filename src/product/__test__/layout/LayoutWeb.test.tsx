import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LayoutWeb } from '../../layout/LayoutWeb';

// Mock de react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

// Mock de componentes
jest.mock('../../../shared/components/Header', () => ({
  Header: ({ actionMenuBurguer, openModal }: any) => (
    <div data-testid="header">
      <button 
        data-testid="menu-burger-btn" 
        onClick={actionMenuBurguer}
      >
        Menu Burger
      </button>
      <button 
        data-testid="open-modal-btn" 
        onClick={openModal}
      >
        Open Modal
      </button>
    </div>
  ),
}));

jest.mock('../../../shared/components/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer Content</div>,
}));

jest.mock('../../../shared/components/Aside', () => ({
  Aside: ({ isOpenAside }: any) => (
    <div 
      data-testid="aside" 
      data-is-open={isOpenAside}
    >
      Aside Content - {isOpenAside ? 'Open' : 'Closed'}
    </div>
  ),
}));

jest.mock('../../../shared/components/Modal', () => ({
  Modal: ({ isopenModal, setViewMenuSm }: any) => (
    <div 
      data-testid="modal" 
      data-is-open={isopenModal}
    >
      Modal Content - {isopenModal ? 'Open' : 'Closed'}
      <button 
        data-testid="close-modal-btn" 
        onClick={setViewMenuSm}
      >
        Close Modal
      </button>
    </div>
  ),
}));

// Mock de Images Provider
jest.mock('../../../assets/images/ImagesProvider', () => ({
  Images: {
    ImageBgHome: 'mock-bg-image.jpg',
  },
}));

// Wrapper para Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('LayoutWeb', () => {
  test('debería renderizar todos los componentes principales', () => {
    renderWithRouter(<LayoutWeb />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('aside')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  test('debería tener la estructura de layout correcta', () => {
    renderWithRouter(<LayoutWeb />);

    const mainContainer = screen.getByTestId('header').parentElement;
    expect(mainContainer).toHaveClass('w-full', 'min-h-screen', 'flex', 'flex-col');
  });

  test('debería inicializar con el aside cerrado', () => {
    renderWithRouter(<LayoutWeb />);

    const aside = screen.getByTestId('aside');
    expect(aside).toHaveAttribute('data-is-open', 'false');
    expect(aside).toHaveTextContent('Aside Content - Closed');
  });

  test('debería inicializar con el modal cerrado', () => {
    renderWithRouter(<LayoutWeb />);

    const modal = screen.getByTestId('modal');
    expect(modal).toHaveAttribute('data-is-open', 'false');
    expect(modal).toHaveTextContent('Modal Content - Closed');
  });

  test('debería abrir/cerrar el aside al hacer clic en el botón del menú burger', () => {
    renderWithRouter(<LayoutWeb />);

    const menuBurgerBtn = screen.getByTestId('menu-burger-btn');
    const aside = screen.getByTestId('aside');

    // Inicialmente cerrado
    expect(aside).toHaveAttribute('data-is-open', 'false');

    // Hacer clic para abrir
    fireEvent.click(menuBurgerBtn);
    expect(aside).toHaveAttribute('data-is-open', 'true');
    expect(aside).toHaveTextContent('Aside Content - Open');

    // Hacer clic para cerrar
    fireEvent.click(menuBurgerBtn);
    expect(aside).toHaveAttribute('data-is-open', 'false');
    expect(aside).toHaveTextContent('Aside Content - Closed');
  });

  test('debería abrir el modal al hacer clic en el botón de abrir modal', () => {
    renderWithRouter(<LayoutWeb />);

    const openModalBtn = screen.getByTestId('open-modal-btn');
    const modal = screen.getByTestId('modal');

    // Inicialmente cerrado
    expect(modal).toHaveAttribute('data-is-open', 'false');

    // Hacer clic para abrir
    fireEvent.click(openModalBtn);
    expect(modal).toHaveAttribute('data-is-open', 'true');
    expect(modal).toHaveTextContent('Modal Content - Open');
  });

  test('debería cerrar el modal al hacer clic en el botón de cerrar modal', () => {
    renderWithRouter(<LayoutWeb />);

    const openModalBtn = screen.getByTestId('open-modal-btn');
    const closeModalBtn = screen.getByTestId('close-modal-btn');
    const modal = screen.getByTestId('modal');

    // Abrir modal primero
    fireEvent.click(openModalBtn);
    expect(modal).toHaveAttribute('data-is-open', 'true');

    // Cerrar modal
    fireEvent.click(closeModalBtn);
    expect(modal).toHaveAttribute('data-is-open', 'false');
    expect(modal).toHaveTextContent('Modal Content - Closed');
  });

  test('debería pasar las funciones correctas como props a Header', () => {
    renderWithRouter(<LayoutWeb />);

    const menuBurgerBtn = screen.getByTestId('menu-burger-btn');
    const openModalBtn = screen.getByTestId('open-modal-btn');

    // Verificar que los botones existen (significa que las props se pasaron)
    expect(menuBurgerBtn).toBeInTheDocument();
    expect(openModalBtn).toBeInTheDocument();
  });

  test('debería aplicar estilos de background correctamente', () => {
    renderWithRouter(<LayoutWeb />);

    // Encontrar el div con background
    const backgroundDiv = document.querySelector('.flex-1.flex.flex-col.overflow-hidden');
    expect(backgroundDiv).toBeInTheDocument();
    expect(backgroundDiv).toHaveStyle({
      backgroundImage: 'url(mock-bg-image.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    });
  });

  test('debería tener la clase mt-20 en el contenedor principal', () => {
    renderWithRouter(<LayoutWeb />);

    const mainContentDiv = document.querySelector('.mt-20.flex.flex-1');
    expect(mainContentDiv).toBeInTheDocument();
    expect(mainContentDiv).toHaveClass('mt-20', 'flex', 'flex-1');
  });

  test('debería renderizar el Outlet dentro del contenedor con scroll', () => {
    renderWithRouter(<LayoutWeb />);

    const outlet = screen.getByTestId('outlet');
    const scrollContainer = outlet.closest('.overflow-y-auto');
    
    expect(scrollContainer).toBeInTheDocument();
    expect(scrollContainer).toHaveClass('overflow-y-auto');
  });

  test('debería mantener el Footer en la parte inferior del layout', () => {
    renderWithRouter(<LayoutWeb />);

    const footer = screen.getByTestId('footer');
    const flexContainer = footer.closest('.flex-1.flex.flex-col.justify-between');
    
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass('flex-1', 'flex', 'flex-col', 'justify-between');
  });

  test('debería manejar múltiples cambios de estado del aside', () => {
    renderWithRouter(<LayoutWeb />);

    const menuBurgerBtn = screen.getByTestId('menu-burger-btn');
    const aside = screen.getByTestId('aside');

    // Varios cambios de estado
    fireEvent.click(menuBurgerBtn); // Abrir
    expect(aside).toHaveAttribute('data-is-open', 'true');

    fireEvent.click(menuBurgerBtn); // Cerrar
    expect(aside).toHaveAttribute('data-is-open', 'false');

    fireEvent.click(menuBurgerBtn); // Abrir de nuevo
    expect(aside).toHaveAttribute('data-is-open', 'true');
  });

  test('debería mantener estados independientes para aside y modal', () => {
    renderWithRouter(<LayoutWeb />);

    const menuBurgerBtn = screen.getByTestId('menu-burger-btn');
    const openModalBtn = screen.getByTestId('open-modal-btn');
    const aside = screen.getByTestId('aside');
    const modal = screen.getByTestId('modal');

    // Abrir aside
    fireEvent.click(menuBurgerBtn);
    expect(aside).toHaveAttribute('data-is-open', 'true');
    expect(modal).toHaveAttribute('data-is-open', 'false'); // Modal sigue cerrado

    // Abrir modal
    fireEvent.click(openModalBtn);
    expect(aside).toHaveAttribute('data-is-open', 'true'); // Aside sigue abierto
    expect(modal).toHaveAttribute('data-is-open', 'true');

    // Cerrar aside
    fireEvent.click(menuBurgerBtn);
    expect(aside).toHaveAttribute('data-is-open', 'false');
    expect(modal).toHaveAttribute('data-is-open', 'true'); // Modal sigue abierto
  });

  test('debería renderizar sin errores', () => {
    expect(() => {
      renderWithRouter(<LayoutWeb />);
    }).not.toThrow();
  });
});