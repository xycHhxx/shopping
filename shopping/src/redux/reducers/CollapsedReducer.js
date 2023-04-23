const CollapsedReducer = (
  prevState = {
    isCollapsed: false
  },
  action
) => {
  switch (action.type) {
    case 'change-collapsed':
      const newState = { ...prevState }
      newState.isCollapsed = !newState.isCollapsed
      return newState
    default:
      return prevState
  }
}

export default CollapsedReducer
