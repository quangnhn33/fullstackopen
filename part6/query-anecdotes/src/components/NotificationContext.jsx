import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  return useContext(NotificationContext).notification
}

export const useNotificationDispatch = () => {
  return useContext(NotificationContext).dispatch
}

export default NotificationContext
