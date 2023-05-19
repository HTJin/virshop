import { createSlice } from "@reduxjs/toolkit";

interface PullSheetState {
  product_name: string;
  condition: string;
  card_number: string;
  card_set: string;
  rarity: number;
  quantity: boolean;
  file_name: string;
}

const initialState: PullSheetState = {
  product_name: "",
  condition: "",
  card_number: "",
  card_set: "",
  rarity: 0,
  quantity: false,
  file_name: "",
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    getProductName: (state, action) => {
      state.product_name = action.payload;
    },
    getCondition: (state, action) => {
      state.condition = action.payload;
    },
    getCardNumber: (state, action) => {
      state.card_number = action.payload;
    },
    getCardSet: (state, action) => {
      state.card_set = action.payload;
    },
    getRarity: (state, action) => {
      state.rarity = action.payload;
    },
    getQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    getFileName: (state, action) => {
      state.file_name = action.payload;
    },
  },
});

export const reducer = rootSlice.reducer;
export const {
  getProductName,
  getCondition,
  getCardNumber,
  getCardSet,
  getRarity,
  getQuantity,
  getFileName,
} = rootSlice.actions;
