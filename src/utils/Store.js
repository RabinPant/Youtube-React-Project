import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import keywordSearchSlice from "./keywordSearchSlice";

const store = configureStore({
  reducer: {
    app: toggleSlice,
    search: searchSlice,
    chat: chatSlice,
    keyword: keywordSearchSlice,
  },
});

export default store;
