import cStore from './c'
import esStore from './es'
import netStore from './net'
import javaStore from './java'
import pythonStore from './python'
import otherStore from './other'
import goStore from './go'

const store = [
  ...goStore,
  ...cStore,
  ...esStore,
  ...netStore,
  ...javaStore,
  ...pythonStore,
  ...otherStore
]
export default store
