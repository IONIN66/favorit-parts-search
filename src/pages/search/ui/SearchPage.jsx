import { NumberSearch } from '../../../features/search-by-number';
import { BrandList } from '../../../features/select-brand';
import { ThemeSwitcher } from '../../../features/change-theme';
import { OffersTable } from '../../../widgets/offers';

export const SearchPage = () => (
  <main className="container py-5">
    <header className="mb-5">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
        <div>
          <span className="eyebrow">КАТАЛОГ АВТОЗАПЧАСТЕЙ</span>
          <h1 className="display-5 fw-bold mt-2">Поиск деталей и аналогов</h1>
          <p className="lead text-secondary mb-0">
            Найдите производителя по артикулу и сравните доступные предложения.
          </p>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
    <NumberSearch />
    <BrandList />
    <OffersTable />
  </main>
);
