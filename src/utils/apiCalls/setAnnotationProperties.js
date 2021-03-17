import { RESERVED_PROPERTIES } from '../../constants/graph'

/**
 * Set annotation properties
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Array}    params.nodes                      Nodes from API
 * @return {undefined}
 */
const setAnnotationProperties = ({
  setStoreState,
  nodes
}) => {
  let annotationProperties = []
  let annotationPropertiesDatasets = []

  Object.keys(nodes).map((nodeId) => {
    const node = nodes[nodeId]

    if (node.label === 'dataset') {
      const properties = Object.keys(node).filter(
        (key) => !annotationPropertiesDatasets.includes(key)
        && !RESERVED_PROPERTIES.includes(key)
      )

      if (properties.length > 0) {
        annotationPropertiesDatasets = [
          ...annotationPropertiesDatasets,
          ...properties
        ]
      }

      return true
    }

    const properties = Object.keys(node).filter(
      (key) => !annotationProperties.includes(key)
      && !RESERVED_PROPERTIES.includes(key)
    )

    if (properties.length > 0) {
      annotationProperties = [
        ...annotationProperties,
        ...properties
      ]
    }

    return true
  })

  setStoreState('annotationProperties', annotationProperties.sort().map((property) => ({
    label: property,
    value: property
  })))
  setStoreState('annotationPropertiesDatasets', annotationPropertiesDatasets.sort().map((property) => ({
    label: property,
    value: property
  })))
}

export default setAnnotationProperties
