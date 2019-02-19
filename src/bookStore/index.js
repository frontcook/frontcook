import cStore from './c'
import frameStore from './frame'
import esStore from './es'
import netStore from './net'
import javaStore from './java'
import pythonStore from './python'
import otherStore from './other'

const store = [
  ...cStore,
  ...frameStore,
  ...esStore,
  ...netStore,
  ...javaStore,
  ...pythonStore,
  ...otherStore
]
export default store
