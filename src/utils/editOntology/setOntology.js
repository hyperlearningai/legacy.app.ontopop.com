import setOntologyDeleteNode from './setOntologyDeleteNode'
import setOntologyUpdateNode from './setOntologyUpdateNode'
import setOntologyAddNode from './setOntologyAddNode'
import setOntologyRestoreNode from './setOntologyRestoreNode'
import setOntologyAddEdge from './setOntologyAddEdge'
import setOntologyUpdateEdge from './setOntologyUpdateEdge'
import setOntologyDeleteEdge from './setOntologyDeleteEdge'
import setOntologyRestoreEdge from './setOntologyRestoreEdge'
import setOntologyAddConnection from './setOntologyAddConnection'
import setOntologyDeleteConnection from './setOntologyDeleteConnection'
import setOntologyRestoreConnection from './setOntologyRestoreConnection'

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
  addToObject,
  t
}) => {
  if (operation === 'restore') {
    if (type === 'node') {
      setOntologyRestoreNode({
        selectedElement,
        setStoreState,
      })
    }

    if (type === 'edge') {
      setOntologyRestoreEdge({
        selectedElement,
        setStoreState,
      })
    }

    if (type === 'connection') {
      setOntologyRestoreConnection({
        selectedElement,
        setStoreState,
      })
    }
  }

  if (operation === 'delete') {
    if (type === 'node') {
      setOntologyDeleteNode({
        selectedElement,
        setStoreState,
      })
    }

    if (type === 'edge') {
      setOntologyDeleteEdge({
        selectedElement,
        setStoreState,
      })
    }

    if (type === 'connection') {
      setOntologyDeleteConnection({
        setStoreState,
        selectedElement,
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

    if (type === 'edge') {
      setOntologyUpdateEdge({
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
        t
      })
    }

    if (type === 'edge') {
      setOntologyAddEdge({
        setStoreState,
        selectedElementProperties,
        t
      })
    }

    if (type === 'connection') {
      setOntologyAddConnection({
        setStoreState,
        selectedElementProperties,
        t,
      })
    }
  }
}

export default setOntology
