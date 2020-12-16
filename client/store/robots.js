import axios from 'axios'
import history from '../history'

// Actions
const GET_ROBOTS = 'GET_ROBOTS'
const GET_ROBOTS_BY_BRAND = 'GET_ROBOTS_BY_BRAND'



// Initial State
const defaultRobotsList = {
  robots : []
}

// Action creator
export const getRobots = robots => (
  {
    type: GET_ROBOTS,
    robots
  }
)

export const getRobotsByBrand = (robots, brand) => (
  {
    type: GET_ROBOTS_BY_BRAND,
    robots,
    brand
  }
)

//Thunk creator
export const fetchRobots = () => {
  return async (dispatch) => {
      try {
          const response = await axios.get('/api/robots')
          const robots = response.data
          dispatch(getRobots(robots))
      }
      catch (err) { console.log(err) }
  }
}

export const fetchRobotsByBrand = (brand) => {
  return async (dispatch) => {
      try {
          const response = await axios.get('/api/robots/byBrand' + brand)
          const robots = response.data
          dispatch(getRobotsByBrand(robots, brand))
      }
      catch (err) { console.log(err) }
  }
}

// Reducer
 const robotsReducer = (state = defaultRobotsList, action) => {
   switch(action.type) {
     case GET_ROBOTS:
        return { ...state, robots: action.robots}
     case GET_ROBOTS_BY_BRAND:
        return {...state, robots: action.robots}

     default:
        return state
   }
 }

 export default robotsReducer



