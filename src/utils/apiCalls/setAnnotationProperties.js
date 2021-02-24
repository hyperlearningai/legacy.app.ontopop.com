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

  nodes.map((node) => {
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
}

export default setAnnotationProperties
