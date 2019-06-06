export default {
  Ingredient: {
    quantity: parent =>
      !parent.quantity
        ? 1
        : typeof parent.quantity === 'function'
          ? parent.quantity()
          : parent.quantity,
  },
};
