import cStore from './c'
import frameStore from './frame'
import esStore from './es'

const store = [...cStore, ...frameStore, ...esStore]
export default store
