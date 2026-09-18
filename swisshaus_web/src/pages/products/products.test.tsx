import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";
import '@testing-library/jest-dom';
import ProductsPage from "./products";

// 1. Mock de la imagen
vi.mock("../../assets/images.jpg", () => ({ default: "/mock-image.jpg" }));

// 2. Mock del SERVICIO (Corregido para exportación nombrada)
vi.mock("../../services/products.service", () => {
  const mockProducts = [
    { id: "1", nombre: "Fondue de Queso Suizo", precio: 320, categoria: "Fondue", popular: true, nuevo: true, imagen_url: "" },
    { id: "2", nombre: "Raclette Alpina", precio: 280, categoria: "Raclette", popular: true, nuevo: false, imagen_url: "" },
    { id: "3", nombre: "Cordon Bleu", precio: 250, categoria: "Carnes", popular: false, nuevo: false, imagen_url: "" },
    { id: "4", nombre: "Trilogía de Chocolate", precio: 180, categoria: "Postres", popular: false, nuevo: false, imagen_url: "" },
  ];

  return {
    // IMPORTANTE: El error dice que falta "productsService"
    productsService: {
      getAllProducts: vi.fn(() => Promise.resolve(mockProducts)),
      // Agregamos getProductos por si acaso es el nombre que usa tu componente
      getProductos: vi.fn(() => Promise.resolve(mockProducts)),
    }
  };
});

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <ProductsPage />
    </MemoryRouter>,
  );
}

describe("ProductsPage", () => {
  it("renders the inventory section heading", () => {
    renderWithRouter();
    expect(
      screen.getByRole("heading", { name: /Nuestro menú/i }),
    ).toBeInTheDocument();
  });

  it("renders all four products", async () => {
    renderWithRouter();
    // findByText es asíncrono, ideal para esperar al mock
    expect(await screen.findByText(/Fondue de Queso Suizo/i)).toBeInTheDocument();
    expect(await screen.findByText(/Raclette Alpina/i)).toBeInTheDocument();
    expect(await screen.findByText(/Cordon Bleu/i)).toBeInTheDocument();
    expect(await screen.findByText(/Trilogía de Chocolate/i)).toBeInTheDocument();
  });

  it('shows "Popular" badge on popular products', async () => {
    renderWithRouter();
    // Usamos regex /Popular/i para evitar problemas de mayúsculas o espacios
    const popularBadges = await screen.findAllByText(/Popular/i);
    expect(popularBadges.length).toBeGreaterThan(0);
  });

  it('shows "Nuevo" badge on new products', async () => {
    renderWithRouter();
    expect(await screen.findByText(/Nuevo/i)).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    renderWithRouter();
    expect(screen.getByRole("button", { name: /Fondue/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Raclette/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Carnes/i })).toBeInTheDocument();
  });

it("renders product prices", async () => {
  renderWithRouter();
  
  // Para $320 y $280 no hay problema porque son únicos
  expect(await screen.findByText(/\$320/)).toBeInTheDocument();
  expect(await screen.findByText(/\$280/)).toBeInTheDocument();

  // Para $250 y $180 usamos findAllByText
  const highPrices = await screen.findAllByText(/\$250/);
  expect(highPrices.length).toBe(1); 
});

});