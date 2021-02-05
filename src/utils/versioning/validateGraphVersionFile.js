import {
  GRAPH_VERSION_STRUCTURE,
  MINIMAL_LOW_LEVEL_PROPERTIES
} from '../../constants/graph'

/**
 * Validate graph version json format
 * @param  {Object}   params
 * @param  {String}   params.graphVersion          Graph version name
 * @return {Boolean}  isValid                      Json format validity
\ */
const validateGraphVersionFile = ({
  graphVersion
}) => {
  const objectKeys = [
    'classesFromApi',
    'objectPropertiesFromApi',
    'classesFromApiBackup',
    'objectPropertiesFromApiBackup'
  ]

  const arrayOfStrings = [
    'deletedNodes',
    'addedNodes',
    'updatedNodes',
    'deletedEdges',
    'addedEdges',
    'updatedEdges',
    'deletedConnections',
    'addedConnections'
  ]

  const graphVersionKeys = Object.keys(GRAPH_VERSION_STRUCTURE)

  let isValid = true

  for (let index = 0; index < graphVersionKeys.length; index++) {
    const graphVersionKey = graphVersionKeys[index]
    const graphVersionKeyValue = graphVersion[graphVersionKey]

    if (!graphVersion[graphVersionKey]) {
      isValid = false
      break
    }

    if (objectKeys.includes(graphVersionKey)) {
      if (typeof graphVersionKeyValue !== 'object') {
        isValid = false
        break
      }

      if (graphVersionKeyValue.length > 0) {
        const presentProperties = MINIMAL_LOW_LEVEL_PROPERTIES.map((item) => graphVersionKeyValue[item])

        if (presentProperties.length === MINIMAL_LOW_LEVEL_PROPERTIES.length) {
          isValid = false
          break
        }
      }
    }

    if (arrayOfStrings.includes(graphVersionKey)) {
      if (!Array.isArray(graphVersionKeyValue)) {
        isValid = false
        break
      }

      if (graphVersionKeyValue.length > 0) {
        const containsAllStrings = graphVersionKeyValue.every((item) => typeof item === 'string')

        if (!containsAllStrings) {
          isValid = false
          break
        }
      }
    }
  }

  return isValid
}

export default validateGraphVersionFile
