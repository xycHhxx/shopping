const CurrentUsernameReducer = (
  prevState = {
    currentUsername: ''
  },
  action
) => {
  switch (action.type) {
    case 'change-username':
      const newState = { ...prevState }
      newState.currentUsername = action.payload
      return newState
    default:
      return prevState
  }
}

export default CurrentUsernameReducer
