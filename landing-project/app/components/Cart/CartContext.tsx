"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Image from "next/image";
import styles from "./Cart.module.css";

export type CartProduct = {
    id: string;
    image: string;
    price: number;
    size: ProductSize | "";
    title: string;
};

type CartItem = CartProduct & { quantity: number };

export type ProductSize = "P" | "M" | "G" | "GG";

type CartContextValue = {
    addItem: (product: CartProduct) => void;
    decreaseItem: (id: string) => void;
    items: CartItem[];
    itemCount: number;
    removeItem: (id: string) => void;
    updateItemSize: (id: string, size: ProductSize) => void;
    total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const currency = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
});

export function formatCurrency(value: number) {
    return currency.format(value);
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    function addItem(product: CartProduct) {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                );
            }

            return [...currentItems, { ...product, quantity: 1 }];
        });
    }

    function decreaseItem(id: string) {
        setItems((currentItems) =>
            currentItems
                .map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter((item) => item.quantity > 0),
        );
    }

    function removeItem(id: string) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    }

    function updateItemSize(id: string, size: ProductSize) {
        setItems((currentItems) => currentItems.map((item) => item.id === id ? { ...item, size } : item));
    }

    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ addItem, decreaseItem, items, itemCount, removeItem, total, updateItemSize }}>
            {children}
            <CartSummary />
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart deve ser usado dentro de CartProvider");
    }

    return context;
}

function CartSummary() {
    const [isOpen, setIsOpen] = useState(false);
    const { addItem, decreaseItem, items, itemCount, removeItem, total, updateItemSize } = useCart();
    const hasMissingSize = items.some((item) => !item.size);

    function finishPurchase() {
        const productLines = items
            .map((item) => `- ${item.title} | Tamanho ${item.size} | ${item.quantity}x: ${formatCurrency(item.price * item.quantity)}`)
            .join("\n");
        const message = `Olá! Gostaria de finalizar este pedido:\n\n${productLines}\n\nQuantidade de itens: ${itemCount}\nTotal: ${formatCurrency(total)}`;

        window.location.href = `https://wa.me/5585999999999?text=${encodeURIComponent(message)}`;
    }

    return (
        <aside className={styles.cart} aria-label="Carrinho de compras">
            <button className={styles.cartToggle} type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
                Carrinho <span>{itemCount}</span>
            </button>
            {isOpen && (
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <h2>Seu carrinho</h2>
                        <button type="button" onClick={() => setIsOpen(false)} aria-label="Fechar carrinho">×</button>
                    </div>
                    {items.length === 0 ? (
                        <p className={styles.empty}>Seu carrinho está vazio.</p>
                    ) : (
                        <div className={styles.items}>
                            {items.map((item) => (
                                <div className={styles.item} key={item.id}>
                                    <Image src={item.image} alt="" width={56} height={64} />
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{formatCurrency(item.price)} cada</p>
                                        <label className={styles.sizeLabel} htmlFor={`cart-size-${item.id}`}>
                                            Tamanho
                                            <select
                                                id={`cart-size-${item.id}`}
                                                value={item.size}
                                                onChange={(event) => updateItemSize(item.id, event.target.value as ProductSize)}
                                            >
                                                <option value="">Selecione</option>
                                                <option value="P">P</option>
                                                <option value="M">M</option>
                                                <option value="G">G</option>
                                                <option value="GG">GG</option>
                                            </select>
                                        </label>
                                        <div className={styles.quantity}>
                                            <button type="button" onClick={() => decreaseItem(item.id)} aria-label={`Diminuir quantidade de ${item.title}`}>−</button>
                                            <span>{item.quantity}</span>
                                            <button type="button" onClick={() => addItem(item)} aria-label={`Aumentar quantidade de ${item.title}`}>+</button>
                                        </div>
                                    </div>
                                    <button className={styles.remove} type="button" onClick={() => removeItem(item.id)} aria-label={`Remover ${item.title}`}>×</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={styles.total}>
                        <span>Total</span>
                        <strong>{formatCurrency(total)}</strong>
                    </div>
                    {items.length > 0 && (
                        <button
                            className={styles.checkout}
                            type="button"
                            disabled={hasMissingSize}
                            onClick={finishPurchase}
                        >
                            {hasMissingSize ? "Selecione os tamanhos" : "Finalizar compra"} <span aria-hidden="true">↗</span>
                        </button>
                    )}
                </div>
            )}
        </aside>
    );
}