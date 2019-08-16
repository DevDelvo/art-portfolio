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
