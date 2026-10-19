import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, setNumber } from '../../../entities/part';
import { Loader } from '../../../shared/ui/Loader';
import { StatusMessage } from '../../../shared/ui/StatusMessage';

export const NumberSearch = () => {
  const dispatch = useDispatch();
  const { number, brands, brandsStatus, brandsError } = useSelector((state) => state.parts);
  const pendingRequestRef = useRef(null);

  useEffect(() => {
    const trimmedNumber = number.trim();

    if (!trimmedNumber) return undefined;

    const timeoutId = setTimeout(() => {
      pendingRequestRef.current = dispatch(fetchBrands(trimmedNumber));
    }, 450);

    return () => {
      clearTimeout(timeoutId);
      pendingRequestRef.current?.abort();
    };
  }, [dispatch, number]);

  const handleChange = (event) => {
    dispatch(setNumber(event.target.value));
  };

  return (
    <section className="card shadow-sm border-0 p-4" aria-labelledby="number-heading">
      <div className="step-label">Шаг 1 / 2</div>
      <h2 id="number-heading" className="h4 mt-2">
        Найдите производителей
      </h2>
      <p className="text-secondary mb-3">Введите артикул детали. Поиск начнётся автоматически.</p>
      <label htmlFor="part-number" className="form-label fw-semibold">
        Артикул детали
      </label>
      <input
        id="part-number"
        className="form-control form-control-lg"
        value={number}
        onChange={handleChange}
        placeholder="Например, 7160500039S"
        maxLength={100}
        autoComplete="off"
      />
      <div className="mt-3" aria-live="polite">
        {number.trim() && brandsStatus === 'idle' && <Loader message="Ожидаем ввод…" />}
        {brandsStatus === 'loading' && <Loader message="Ищем производителей…" />}
        {brandsStatus === 'error' && <StatusMessage variant="danger" message={brandsError} />}
        {brandsStatus === 'success' && brands.length === 0 && (
          <StatusMessage message="По этому артикулу производители не найдены." />
        )}
      </div>
    </section>
  );
};
