import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Шаги поиска разделены на отдельные фичи.
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
