import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement } from 'react';
import { ErrorPage } from '../ErrorPage';

// Polyfill para TextEncoder/TextDecoder en Jest
Object.assign(global, {
  TextDecoder,
  TextEncoder,
});

// Mock del componente Link de react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string; [key: string]: any }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Wrapper para envolver el componente con Router
const renderWithRouter = (component: ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ErrorPage', () => {
  test('debería renderizar el código de error 404', () => {
    renderWithRouter(<ErrorPage />);
    
    const errorCode = screen.getByText('404');
    expect(errorCode).toBeInTheDocument();
    expect(errorCode).toHaveClass('text-9xl', 'font-extrabold', 'text-white', 'tracking-widest');
  });

  test('debería mostrar el mensaje "Pagina no encontrada"', () => {
    renderWithRouter(<ErrorPage />);
    
    const errorMessage = screen.getByText('Pagina no encontrada');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('bg-[#FF6A3D]', 'px-2', 'text-sm', 'rounded', 'rotate-12', 'absolute');
  });

  test('debería renderizar el botón "Ir al inicio"', () => {
    renderWithRouter(<ErrorPage />);
    
    const homeButton = screen.getByText('Ir al inicio');
    expect(homeButton).toBeInTheDocument();
  });

  test('debería tener un enlace que dirija al inicio', () => {
    renderWithRouter(<ErrorPage />);
    
    const homeLink = screen.getByRole('link', { name: 'Ir al inicio' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('debería tener la estructura correcta del main container', () => {
    renderWithRouter(<ErrorPage />);
    
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('h-screen', 'w-full', 'flex', 'flex-col', 'justify-center', 'items-center');
  });

  test('debería renderizar el botón con las clases CSS correctas', () => {
    renderWithRouter(<ErrorPage />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('mt-5');
  });

  test('debería renderizar todos los elementos principales', () => {
    renderWithRouter(<ErrorPage />);
    
    // Verificar que todos los elementos principales estén presentes
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Pagina no encontrada')).toBeInTheDocument();
    expect(screen.getByText('Ir al inicio')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  test('debería tener la estructura de spans para el efecto visual del botón', () => {
    renderWithRouter(<ErrorPage />);
    
    // Verificar que los spans para el efecto visual estén presentes
    const spans = document.querySelectorAll('span');
    expect(spans).toHaveLength(2);
    
    // Verificar las clases del primer span (efecto hover)
    expect(spans[0]).toHaveClass('absolute', 'inset-0', 'transition-transform', 'translate-x-0.5', 'translate-y-0.5', 'bg-[#FF6A3D]', 'group-hover:translate-y-0', 'group-hover:translate-x-0');
    
    // Verificar las clases del segundo span (contenedor del texto)
    expect(spans[1]).toHaveClass('relative', 'block', 'px-8', 'py-3', 'bg-black', 'border', 'border-current');
  });
});