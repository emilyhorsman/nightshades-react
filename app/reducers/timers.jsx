const timers = (state = [], action) => {
  switch (action.type) {
    case 'RESET_TIMER':
      return state.map(timer => {
        if (timer.id !== action.id) {
          return timer
        }

        return {
          ...timer,
          time: timer.initialTime
        }
      })
    case 'FETCHING_TIMERS_SUCCESS':
      return action.timers
    case 'TICK':
      return state.map(timer => (
        {
          ...timer,
          time: Math.max(timer.time - 1, 0)
        }
      ))
    default:
      return state
  }
}

export default timers
