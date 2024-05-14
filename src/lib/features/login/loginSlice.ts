import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return initialState
    },
  },
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer
