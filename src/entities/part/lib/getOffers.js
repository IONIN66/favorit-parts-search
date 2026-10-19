export const getOffers = (goods) => {
  const offers = [];

  const addPartOffers = (part, isAnalogue) => {
    if (!part?.brand || !part?.number) return;

    const warehouses = Array.isArray(part.warehouses) ? part.warehouses : [];

    if (warehouses.length === 0) {
      offers.push({
        id: `${part.goodsID || part.number}-no-warehouse-${isAnalogue}`,
        name: part.name || 'Без названия',
        brand: part.brand,
        number: part.number,
        warehouse: '—',
        price: null,
        stock: part.count === null || part.count === undefined ? '—' : Number(part.count),
        isAnalogue,
      });
      return;
    }

    warehouses.forEach((warehouse) => {
      offers.push({
        id: `${part.goodsID || part.number}-${warehouse.id || warehouse.code || offers.length}-${isAnalogue}`,
        name: part.name || 'Без названия',
        brand: part.brand,
        number: part.number,
        warehouse: warehouse.code || warehouse.id || 'Склад',
        price:
          warehouse.price === null || warehouse.price === undefined
            ? null
            : Number(warehouse.price),
        stock:
          warehouse.stock === null || warehouse.stock === undefined ? '—' : Number(warehouse.stock),
        isAnalogue,
      });
    });
  };

  goods.forEach((part) => {
    addPartOffers(part, false);

    if (Array.isArray(part.analogues)) {
      part.analogues.forEach((analogue) => addPartOffers(analogue, true));
    }
  });

  return offers;
};
