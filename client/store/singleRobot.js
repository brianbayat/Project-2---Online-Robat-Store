import axios from 'axios'
import history from '../history'

// Actions
const GET_ROBOT = 'GET_ROBOT'
// Initial State
const defaultSingleRobot = {
  robot: {}
}

// Action creator
export const getRobot = robot => ({
  type: GET_ROBOT,
  robot
})

//Thunk creator
export const fetchRobot = robotId => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/robots/' + robotId)
      const robot = response.data
      dispatch(getRobot(robot))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer
const singleRobotReducer = (state = defaultSingleRobot, action) => {
  switch (action.type) {
    case GET_ROBOT:
      return {...state, robot: action.robot}

    default:
      return state
  }
}

export default singleRobotReducer
