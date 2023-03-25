import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ICategory, ICategoryRequest } from "../../models/Category";
import { IApiError } from "../../models/Error";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../services/categoryService";
import { alertAC } from "../alert/alertSlice";

export const createCategoryAC = createAsyncThunk<
  ICategory,
  ICategoryRequest,
  { rejectValue: IApiError }
>("create_category", async (newCategory, { dispatch, rejectWithValue }) => {
  try {
    dispatch(alertAC.startLoading());
    const { data } = await createCategory(newCategory);
    dispatch(alertAC.success("Category created!"));
    return data;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;
    if (err.response) {
      dispatch(alertAC.error(err.response.data));
    } else {
      dispatch(alertAC.error(error));
    }
    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});

export const getCategoriesAC = createAsyncThunk<
  ICategory[],
  undefined,
  { rejectValue: IApiError }
>("get_categories", async (_, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await getCategories();
    return data.categories;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;
    if (err.response) {
      dispatch(alertAC.error(err.response.data));
    } else {
      dispatch(alertAC.error(error));
    }
    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});

export const updateCategoryAC = createAsyncThunk<
  ICategory,
  ICategory,
  { rejectValue: IApiError }
>("update_category", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(alertAC.startLoading());
    const { data } = await updateCategory(payload);
    dispatch(alertAC.success(data.message));
    return payload

  } catch (error: any) {
    let err: AxiosError<IApiError> = error;
    if (err.response) {
      dispatch(alertAC.error(err.response.data));
    } else {
      dispatch(alertAC.error(error));
    }
    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
}
);


export const deleteCategoryAC = createAsyncThunk<{ id: string }, { id: string }, { rejectValue: IApiError }
>('delete_category', async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(alertAC.startLoading());
    const { data } = await deleteCategory(payload.id)
    dispatch(alertAC.success(data.message));
    return payload
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;
    if (err.response) {
      dispatch(alertAC.error(err.response.data));
    } else {
      dispatch(alertAC.error(error));
    }
    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
})