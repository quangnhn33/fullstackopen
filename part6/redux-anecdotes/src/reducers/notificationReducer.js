import { createSlice } from "@reduxjs/toolkit";

const notificaitonSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = notificaitonSlice.actions

let timeoutId = null
export const notify = (message, time) => {
  return async dispatch => {
    console.log(timeoutId)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    dispatch(setNotification(message))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
      timeoutId = null
    }, time * 1000)
  }
}

export default notificaitonSlice.reducer
