export const getCart = () => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    }
    return [];
};

export const addToCart = (service) => {
    const cart = getCart();
    cart.push(service);
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (id) => {
    const cart = getCart().filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
};