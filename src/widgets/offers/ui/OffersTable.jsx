import { useSelector } from 'react-redux';
import { Loader } from '../../../shared/ui/Loader';
import { StatusMessage } from '../../../shared/ui/StatusMessage';
import { OffersResult } from './OffersResult';

export const OffersTable = () => {
  const { selectedBrand, goods, offersStatus, offersError } = useSelector((state) => state.parts);

  if (!selectedBrand) return null;

  const statusContent = {
    loading: <Loader message="Загружаем предложения…" />,
    error: <StatusMessage variant="danger" message={offersError} />,
    success: <OffersResult goods={goods} />,
  };

  return (
    <section className="card shadow-sm border-0 p-4 mt-4" aria-labelledby="offers-heading">
      <h2 id="offers-heading" className="h4 mb-1">
        Предложения и аналоги
      </h2>
      <p className="text-secondary mb-4">Производитель: {selectedBrand}</p>
      <div aria-live="polite">{statusContent[offersStatus] ?? null}</div>
    </section>
  );
};
