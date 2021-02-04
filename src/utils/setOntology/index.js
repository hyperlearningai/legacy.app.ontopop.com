import setOntologyDeleteNode from './setOntologyDeleteNode'
import setOntologyUpdateNode from './setOntologyUpdateNode'
import setOntologyAddNode from './setOntologyAddNode'

/**
 * Set graph full data
 * @param  {Object}         params
 * @param  {String}         params.operation                  Operation mode [add / update / delete / restore]
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {String}         params.type                       Element type (node / edge)
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @return {undefined}
 */
const setOntology = ({
  operation,
  type,
  selectedElement,
  setStoreState,
  selectedElementProperties,
  addToObject
}) => {
  if (operation === 'delete') {
    if (type === 'node') {
      setOntologyDeleteNode({
        selectedElement,
        setStoreState,
        addToObject
      })
    }
  }

  if (operation === 'update') {
    if (type === 'node') {
      setOntologyUpdateNode({
        selectedElement,
        setStoreState,
        selectedElementProperties,
        addToObject
      })
    }
  }

  if (operation === 'add') {
    if (type === 'node') {
      setOntologyAddNode({
        setStoreState,
        selectedElementProperties,
        addToObject
      })
    }
  }
}

export default setOntology
