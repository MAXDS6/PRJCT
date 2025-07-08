// Mock del hook useRouter de Next.js
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../src/app/login/LoginForm";

// Mock global fetch y localStorage
beforeEach(() => {
  global.fetch = jest.fn();
  jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(jest.fn());
});

afterEach(() => {
  jest.clearAllMocks();
});

test("login exitoso muestra mensaje y guarda en localStorage", async () => {
  fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
  render(<LoginForm />);
  fireEvent.change(screen.getByPlaceholderText(/usuario o correo/i), { target: { value: "test" } });
  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: "1234" } });
  fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
  // Espera mensaje éxito
  expect(await screen.findByText(/¡inicio de sesión exitoso!/i)).toBeInTheDocument();
  expect(window.localStorage.setItem).toHaveBeenCalledWith("username", "test");
});

test("login fallido muestra mensaje de error", async () => {
  fetch.mockResolvedValueOnce({ ok: false, json: async () => ({ message: "Credenciales inválidas." }) });
  render(<LoginForm />);
  fireEvent.change(screen.getByPlaceholderText(/usuario o correo/i), { target: { value: "test" } });
  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: "1234" } });
  fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
  expect(await screen.findByText(/credenciales inválidas/i)).toBeInTheDocument();
});

test("muestra mensaje de error si hay un error de red", async () => {
  fetch.mockRejectedValueOnce(new Error("Network error"));
  render(<LoginForm />);
  fireEvent.change(screen.getByPlaceholderText(/usuario o correo/i), { target: { value: "test" } });
  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: "1234" } });
  fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
  expect(await screen.findByText(/hubo un error al conectar/i)).toBeInTheDocument();
});

test("puede cambiar el idioma a inglés y muestra mensajes en inglés", () => {
  render(<LoginForm />);
  fireEvent.click(screen.getByRole("button", { name: /cambiar a inglés/i }));
  // Busca el título y el botón "Login" en inglés usando roles
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument(); // Título
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument(); // Botón
});

test("muestra enlace para registrarse", () => {
  render(<LoginForm />);
  expect(screen.getByText(/¿no tienes una cuenta\?/i)).toBeInTheDocument();
  expect(screen.getByText(/regístrate/i)).toBeInTheDocument();
});

test("muestra error si los campos están vacíos", async () => {
  render(<LoginForm />);
  const button = screen.getByRole("button", { name: /iniciar sesión/i });
  fireEvent.click(button);
  expect(
    await screen.findByText(/por favor, completa todos los campos/i)
  ).toBeInTheDocument();
});
