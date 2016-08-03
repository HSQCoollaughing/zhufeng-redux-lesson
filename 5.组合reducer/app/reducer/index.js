import { combineReducers } from 'redux'
import health from './health.js'
import magic from './magic.js'

export default combineReducers({
  health,
  magic
})
