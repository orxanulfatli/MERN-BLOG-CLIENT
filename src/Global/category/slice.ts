import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../models/Category";
import { deleteCategory } from "../../services/categoryService";
import { createCategoryAC, deleteCategoryAC, getCategoriesAC, updateCategoryAC } from "./action";

interface ICategoryState {
  categories: ICategory[];
}
const initialState: ICategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create category
    builder.addCase(createCategoryAC.fulfilled, (state, action) => {
      const { payload } = action;
      state.categories.push(payload);
    });

    //get categories
    builder.addCase(getCategoriesAC.fulfilled, (state, action) => {
      const { payload } = action;
      state.categories = payload;
    });

    //update category
    builder.addCase(updateCategoryAC.fulfilled, (state, action) => {
      const { payload } = action;
      state.categories = state.categories.map((category) => {
        return category._id === payload._id
          ? { ...category, name: payload.name }
          : category;
      });
    });
      
    //delete category
      builder.addCase(deleteCategoryAC.fulfilled, (state, action) => {
          const { payload } = action;
          state.categories= state.categories.filter(category=>category._id!==payload.id)
      })
  },
});

export const categoryReducer = categorySlice.reducer;
