export const fetchParts = async (number, brand, signal) => {
  const parameters = new URLSearchParams({ number });

  if (brand) parameters.set('brand', brand);

  const response = await fetch(`/api/parts?${parameters}`, { signal });

  let payload;

  try {
    payload = await response.json();
  } catch {
    throw new Error('Сервис вернул некорректный ответ.');
  }

  if (!response.ok || payload.error) {
    throw new Error(
      Array.isArray(payload.error)
        ? payload.error.join(', ')
        : payload.error || 'Не удалось выполнить поиск.',
    );
  }

  if (!Array.isArray(payload.goods)) {
    throw new Error('Сервис вернул некорректный список товаров.');
  }

  return payload.goods;
};
