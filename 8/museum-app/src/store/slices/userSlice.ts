import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { login as loginApi, register as registerApi } from '../api/userActions';

interface User {
  id: string;
  email?: string;
  username: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const storedToken = localStorage.getItem('token');
const isValidToken = storedToken && storedToken !== 'undefined' && storedToken !== 'null';

const initialState: UserState = {
  user: null,
  token: isValidToken ? storedToken : null,
  isAuthenticated: !!isValidToken,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials.username, credentials.password);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await registerApi(credentials.username, credentials.password);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('User logged out, token removed.');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        console.log('Login Payload from Server:', action.payload);

        const token = action.payload.access_token || action.payload.token;
        const userObj: User = {
            id: action.payload.userId || action.payload.user?.id || '0',
            username: action.payload.userName || action.payload.user?.username || 'User',
            email: action.payload.email
        };

        if (token) {
          state.token = token;
          state.user = userObj;
          state.isAuthenticated = true;
          
          localStorage.setItem('token', token);
          
          localStorage.setItem('user', JSON.stringify(userObj)); 
          console.log('SUCCESS: Token saved:', token);
        } else {
          console.error('ERROR: access_token not found in response!', action.payload);
          state.isAuthenticated = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        console.log('Register Payload:', action.payload);

        const token = action.payload.access_token || action.payload.token;

        if (token) {
          state.token = token;
          state.isAuthenticated = true;
          localStorage.setItem('token', token);
          
          const userObj = {
            id: action.payload.userId || '0',
            username: action.payload.userName || 'User',
          };
          state.user = userObj;
          localStorage.setItem('user', JSON.stringify(userObj));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const { loginSuccess, logout, clearError } = userSlice.actions;
export default userSlice.reducer;