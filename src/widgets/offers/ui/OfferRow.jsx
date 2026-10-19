const priceFormatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 10 });

export const OfferRow = (props) => {
  const { offer } = props;

  return (
    <tr>
      <td>
        <div className="fw-semibold">{offer.name}</div>
        <div className="text-secondary small">
          {offer.brand}{' '}
          {offer.isAnalogue && <span className="badge text-bg-light border ms-1">Аналог</span>}
        </div>
      </td>
      <td>{offer.number}</td>
      <td>{offer.warehouse}</td>
      <td className="text-end text-nowrap">
        {Number.isFinite(offer.price) ? priceFormatter.format(offer.price) : 'Нет цены'}
      </td>
      <td className="text-end">{offer.stock}</td>
    </tr>
  );
};
