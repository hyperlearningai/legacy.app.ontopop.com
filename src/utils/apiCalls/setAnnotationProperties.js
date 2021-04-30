/* eslint no-loop-func:0 */
import { dashedToCapitalisedString } from '../../constants/functions'
import { PROPERTIES_WITH_I18N, RESERVED_PROPERTIES } from '../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Set annotation properties
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @param  {Function} params.t                          i18n internationalisation function
 * @param  {Array}    params.nodes                      Nodes from API
 * @return {undefined}
 */
const setAnnotationProperties = ({
  updateStoreValue,
  t,
  nodes
}) => {
  let annotationProperties = []
  let annotationPropertiesDatasets = []

  const nodeIds = Object.keys(nodes)
  const nodeIdsLength = nodeIds.length - 1

  for (let index = nodeIdsLength; index >= 0; index--) {
    const nodeId = nodeIds[nodeIdsLength - index]

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

      continue
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
  }

  updateStoreValue(['annotationProperties'], OPERATION_TYPE_UPDATE, annotationProperties.sort().map((property) => ({
    label: PROPERTIES_WITH_I18N.includes(property) ? t(property) : dashedToCapitalisedString(property),
    value: property
  })))
  updateStoreValue(['annotationPropertiesDatasets'], OPERATION_TYPE_UPDATE, annotationPropertiesDatasets.sort().map((property) => ({
    label: PROPERTIES_WITH_I18N.includes(property) ? t(property) : dashedToCapitalisedString(property),
    value: property
  })))
}

export default setAnnotationProperties
