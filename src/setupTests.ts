import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill para TextEncoder/TextDecoder
Object.assign(global, {
  TextDecoder,
  TextEncoder,
});

// Configuraciones globales para las pruebas
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});