import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { User, LoginUserData, RegisterUserData } from "@/types/types";
import { getErrorMessage, createTypedAsyncThunk } from "@/app/hooks";
//May need for selector functions, as per Redux+TS docs
//import type { RootState } from "../../app/store";

//get user from local storage; becomes part of global redux store upon initialization
const user: User = JSON.parse(localStorage.getItem('user') || 'null')

//types for the initialState
export interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Check Redux toolkit if experiencing any authState issues.
const initialState: AuthState = {
  user: user, 
  isError: false, 
  isSuccess: false, 
  isLoading: false, // For loading spinner.
  message: "",
};


/**
 * Thunk action to register user; handles Axios-specific and general errors with help of getErrorMessage()
 */
export const register = createTypedAsyncThunk<
  User,
  RegisterUserData
>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * Thunk action to login user; handles Axios-specific and general errors with help of getErrorMessage()
 */
export const login = createAsyncThunk<
  User,
  LoginUserData,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * Thunk action to logout user
 */
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Create a slice with typed state and payload.
export const authSlice = createSlice({
  name: "auth",
  initialState,

  // Reducers for synchronous actions.
  reducers: {
    // 'Reset' state properties, retaining the user.
    reset: (state: AuthState) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  // Handle asynchronous actions using extraReducers.
  extraReducers: (builder) => {
    builder
      // Handle actions fired upon register submission.
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string
        state.user = null;
      })

      // Handle actions fired upon login submission.
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: AuthState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; //action.payload is response from backend
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? "An unexpected error occurred."; //payload is error message to return in thunk's catch block
        state.user = null;
      })

      // Handle logout action.
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

//export authSlice so we can import it in src/app/store.js
//reducers like reset must be exported from authSlice.actions
export const { reset } = authSlice.actions;
export default authSlice.reducer;
