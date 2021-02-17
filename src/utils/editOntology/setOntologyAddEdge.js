import store from '../../store'
import {
  UNIQUE_PROPERTY,
  LOW_LEVEL_PROPERTIES,
  OWL_ANNOTATION_PROPERTIES
} from '../../constants/graph'
import showNotification from '../showNotification'
import { NOTIFY_WARNING } from '../../constants/notifications'

/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyAddEdge = ({
  setStoreState,
  selectedElementProperties,
  t
}) => {
  const {
    objectPropertiesFromApi,
    addedEdges,
    edgesConnections,
    stylingEdgeCaptionProperty
  } = store.getState()

  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))

  const newEdgeId = selectedElementProperties[UNIQUE_PROPERTY]

  if (objectPropertiesFromApi[newEdgeId]) {
    const message = `${t('edgeIdAlreadyExists')}: ${newEdgeId}`

    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  newObjectPropertiesFromApi[newEdgeId] = {}

  const selectedElementPropertiesKeys = Object.keys(selectedElementProperties)

  selectedElementPropertiesKeys.map((propertyKey) => {
    // add new edge connection as empty array
    if (propertyKey === UNIQUE_PROPERTY) {
      const id = selectedElementProperties[propertyKey]
      newEdgesConnections[id] = []
    }

    if (propertyKey !== UNIQUE_PROPERTY
          && selectedElementProperties[propertyKey]
          && selectedElementProperties[propertyKey] !== ''
    ) {
      if (LOW_LEVEL_PROPERTIES.includes(propertyKey)) {
        newObjectPropertiesFromApi[newEdgeId][propertyKey] = selectedElementProperties[propertyKey]
      } else {
        if (!newObjectPropertiesFromApi[newEdgeId][OWL_ANNOTATION_PROPERTIES]) {
          newObjectPropertiesFromApi[newEdgeId][OWL_ANNOTATION_PROPERTIES] = {}
        }

        newObjectPropertiesFromApi[newEdgeId][OWL_ANNOTATION_PROPERTIES][propertyKey] = selectedElementProperties[propertyKey]
      }

      if (propertyKey === stylingEdgeCaptionProperty) {
        newObjectPropertiesFromApi[newEdgeId].label = selectedElementProperties[propertyKey]
      }
    }

    return true
  })

  const newAddedEdges = [
    ...addedEdges,
    ...[newEdgeId]
  ]

  setStoreState('edgesConnections', newEdgesConnections)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('addedEdges', newAddedEdges)
}

export default setOntologyAddEdge
