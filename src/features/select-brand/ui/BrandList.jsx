import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffers, selectBrand } from '../../../entities/part';

export const BrandList = () => {
  const dispatch = useDispatch();

  const { number, brands, brandsStatus, selectedBrand } = useSelector((state) => state.parts);

  const pendingRequestRef = useRef(null);

  if (brandsStatus !== 'success' || brands.length === 0) return null;

  const handleBrandClick = (brand) => {
    pendingRequestRef.current?.abort();
    dispatch(selectBrand(brand));
    pendingRequestRef.current = dispatch(fetchOffers({ number: number.trim(), brand }));
  };

  return (
    <section className="card shadow-sm border-0 p-4 mt-4" aria-labelledby="brands-heading">
      <div className="step-label">Шаг 2 / 2</div>
      <h2 id="brands-heading" className="h4 mt-2">
        Выберите производителя
      </h2>
      <p className="text-secondary mb-3">
        Найдено: {brands.length}. Выберите бренд для поиска аналогов и предложений.
      </p>
      <div className="d-flex flex-wrap gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            className={`btn ${selectedBrand === brand ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleBrandClick(brand)}
            aria-pressed={selectedBrand === brand}
          >
            {brand}
          </button>
        ))}
      </div>
    </section>
  );
};
