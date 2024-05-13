import { createSlice } from '@reduxjs/toolkit'

const initialState = 'prepair1'

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    update(state, action) {
      return action.payload
    },
  },
})

export const { update } = currentPageSlice.actions
export default currentPageSlice.reducer
