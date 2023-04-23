const CurrentUserIdReducer = (
  prevState = {
    currentUserId: ''
  },
  action
) => {
  switch (action.type) {
    case 'change-userId':
      const newState = { ...prevState }
      newState.currentUserId = action.payload
      return newState
    default:
      return prevState
  }
}

export default CurrentUserIdReducer
