import store from '../../store'
import {
  UNIQUE_PROPERTY,
} from '../../constants/graph'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Update ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node ID
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @return {undefined}
 */
const setOntologyUpdateNode = ({
  selectedElement,
  setStoreState,
  selectedElementProperties,
}) => {
  const {
    classesFromApi,
    updatedNodes,
    stylingNodeCaptionProperty
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const selectedElementPropertiesKeys = Object.keys(selectedElementProperties)

  const options = {}

  selectedElementPropertiesKeys.map((propertyKey) => {
    if (propertyKey !== UNIQUE_PROPERTY
          && selectedElementProperties[propertyKey]
          && selectedElementProperties[propertyKey] !== ''
    ) {
      options[propertyKey] = selectedElementProperties[propertyKey]
      newClassesFromApi[selectedElement][propertyKey] = selectedElementProperties[propertyKey]

      if (propertyKey === stylingNodeCaptionProperty) {
        options.label = selectedElementProperties[propertyKey]
      }
    }

    return true
  })

  newClassesFromApi[selectedElement] = {
    ...newClassesFromApi[selectedElement],
    ...options
  }

  updateNodes({ id: selectedElement, ...options })

  const newUpdatedNodes = [
    ...updatedNodes,
    ...[selectedElement]
  ]

  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('updatedNodes', newUpdatedNodes)
}

export default setOntologyUpdateNode
