export const addItem = (item, next) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart')); //JSON.parse() turns JSON into an object (reverse of JSON.stringify())
    }
    cart.push({
      ...item,
      count: 1
    });
    // Set only allows unique keys, so this removes duplicates of ids.
    cart = Array.from(new Set(cart.map(item => item._id))).map(id => {
      return cart.find(item => item._id === id);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
  return [];
};

export const updateItem = (artId, count) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.map((art, idx) => {
      if (art._id === artId) {
        cart[idx].count = count;
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeFromCart = () => {
  if (typeof window !== 'undefined') {
  }
};
