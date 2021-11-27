import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {


  it('renders learn react link', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(<App />);
    const linkElement = screen.getByText(/Zendesk Api Challenge/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('calls componentDidMount', () => {


    const spy = jest.fn()
    const componentDidMount = App.prototype.componentDidMount
    App.prototype.componentDidMount = function(){
      spy()
      componentDidMount()
      
    }
  });




  it('fetch call', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(<App />);
  });
  
})



