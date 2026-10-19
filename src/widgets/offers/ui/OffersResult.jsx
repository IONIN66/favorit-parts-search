import { getOffers } from '../../../entities/part';
import { StatusMessage } from '../../../shared/ui/StatusMessage';
import { OfferRow } from './OfferRow';

export const OffersResult = (props) => {
  const { goods } = props;
  const offers = getOffers(goods);

  if (offers.length === 0) {
    return <StatusMessage message="Предложения и аналоги не найдены." />;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">Название / производитель</th>
            <th scope="col">Артикул</th>
            <th scope="col">Склад</th>
            <th scope="col" className="text-end">
              Цена
            </th>
            <th scope="col" className="text-end">
              Остаток
            </th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <OfferRow key={offer.id} offer={offer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
