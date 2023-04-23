const CurrentRoleReducer = (
  prevState = {
    currentRole: 2
  },
  action
) => {
  switch (action.type) {
    case 'change-role':
      const newState = { ...prevState }
      newState.currentRole = action.payload
      return newState
    default:
      return prevState
  }
}

export default CurrentRoleReducer
