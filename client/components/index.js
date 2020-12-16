/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AddToCart} from './AddToCart'
export {default as AddToCartForm} from './AddToCartForm'
export {default as FullCartList} from './FullCartList'
export {default as FullRobotList} from './FullRobotList'
export {default as ListComponent} from './ListComponent'
export {default as RobotPreview} from './RobotPreview'
export {default as SingleRobot} from './SingleRobot'
export {default as SingleRobotRender} from './SingleRobotRender'
export {default as UpdateRemove} from './UpdateRemove'
export {default as UpdateRemoveForm} from './UpdateRemoveForm'
export {default as OrderHistoryComponent} from './OrderHistoryComponent'
