import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchParts } from '../api/partsApi';

export const fetchBrands = createAsyncThunk('parts/fetchBrands', async (number, thunkApi) => {
  return fetchParts(number, null, thunkApi.signal);
});

export const fetchOffers = createAsyncThunk('parts/fetchOffers', async (selection, thunkApi) => {
  return fetchParts(selection.number, selection.brand, thunkApi.signal);
});

const INITIAL_STATE = {
  number: '',
  selectedBrand: '',
  brands: [],
  goods: [],
  brandsStatus: 'idle',
  offersStatus: 'idle',
  brandsError: '',
  offersError: '',
  brandsRequestId: '',
  offersRequestId: '',
};

const partsSlice = createSlice({
  name: 'parts',
  initialState: INITIAL_STATE,
  reducers: {
    setNumber(state, action) {
      state.number = action.payload;
      state.selectedBrand = '';
      state.brands = [];
      state.goods = [];
      state.brandsStatus = 'idle';
      state.offersStatus = 'idle';
      state.brandsError = '';
      state.offersError = '';
      state.brandsRequestId = '';
      state.offersRequestId = '';
    },
    selectBrand(state, action) {
      state.selectedBrand = action.payload;
      state.goods = [];
      state.offersStatus = 'idle';
      state.offersError = '';
      state.offersRequestId = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        state.brandsStatus = 'loading';
        state.brandsError = '';
        state.brandsRequestId = action.meta.requestId;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        if (state.brandsRequestId !== action.meta.requestId) return;
        state.brands = [
          ...new Set(action.payload.map((part) => part.brand?.trim()).filter(Boolean)),
        ];
        state.brandsStatus = 'success';
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        if (state.brandsRequestId !== action.meta.requestId) return;
        state.brandsStatus = 'error';
        state.brandsError = action.error.message || 'Не удалось получить производителей.';
      })
      .addCase(fetchOffers.pending, (state, action) => {
        state.offersStatus = 'loading';
        state.offersError = '';
        state.offersRequestId = action.meta.requestId;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        if (state.offersRequestId !== action.meta.requestId) return;
        state.goods = action.payload;
        state.offersStatus = 'success';
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        if (state.offersRequestId !== action.meta.requestId) return;
        state.offersStatus = 'error';
        state.offersError = action.error.message || 'Не удалось получить предложения.';
      });
  },
});

export const { setNumber, selectBrand } = partsSlice.actions;
export const partsReducer = partsSlice.reducer;
