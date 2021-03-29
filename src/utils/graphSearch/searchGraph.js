import { API_ENDPOINT_SEARCH, API_ENDPOINT_SEARCH_KEY, API_ENDPOINT_SEARCH_VERSION } from '../../constants/api'
import { NOTIFY_WARNING } from '../../constants/notifications'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import showNotification from '../notifications/showNotification'

/**
 * Search graph
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue        updateStoreValue action
 * @param  {Function} params.setLoading              Set loading function
 * @return { undefined }
 */
const searchGraph = async ({
  updateStoreValue,
  setLoading,
  t
}) => {
  const {
    // classesFromApi,
    // objectPropertiesFromApi,
    // entrySearchFilter,
    // entrySearchAnnotationProperties,
    classesFromApi,
    entrySearchValue
  } = store.getState()

  const entrySearchResults = []

  if (!entrySearchValue || typeof entrySearchValue !== 'string' || entrySearchValue === '') {
    return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, entrySearchResults)
  }

  // if (entrySearchAnnotationProperties.length === 0) {
  //   return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, entrySearchResults)
  // }

  setLoading(true)

  // eslint-disable-next-line
  // const route = `${API_ENDPOINT_SEARCH}?search=${entrySearchValue}&searchFields=${entrySearchAnnotationProperties.join(',')}&api-version=${API_ENDPOINT_SEARCH_VERSION}&$top=50&minimumCoverage=99`
  const route = `${API_ENDPOINT_SEARCH}?search=${entrySearchValue}&api-version=${API_ENDPOINT_SEARCH_VERSION}&$top=50&minimumCoverage=99`

  const response = await httpCall({
    updateStoreValue,
    withAuth: false,
    route,
    method: 'get',
    additionalHeaders: {
      'api-key': API_ENDPOINT_SEARCH_KEY
    },
    t
  })

  const {
    error,
    data
  } = response

  if (error || !data) {
    showNotification({
      message: t('couldNotGetSearchResults'),
      type: NOTIFY_WARNING
    })

    updateStoreValue(['isQueried'], OPERATION_TYPE_UPDATE, true)
    return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, [])
  }

  const { value } = data

  if (value.length > 0) {
    value.forEach((item) => {
      const {
        // @search.score: 11.637328
        // business_area: "Maintain Plan Operate Construct Plan"
        // entities,
        id,
        // images_videos: null
        // item_type: null
        label, // : "class"
        // name,
        // owner: null
        // path: null
        // pii_info: null
        // rdfAbout: "http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep"
        // rdfsLabel: "Strategic Road Network Asset"
        // related_terms, //eslint-disable-line
        // sensitive_data: null
        // skosComment: null
        // skosDefinition:
        // source: null
        // synonyms,
        // upperOntology: false
        // used_by: null
        // used_for: null
        // userDefined: false
      } = item

      // console.log({
      //   id,
      //   entities,
      //   related_terms,
      //   synonyms
      // })

      const nodeElement = classesFromApi[id]

      switch (label) {
        case 'dataset':
          nodeElement.type = 'dataset'
          break
        default:
          nodeElement.type = 'node'
          break
      }

      entrySearchResults.push(nodeElement)
    })
  }

  // if (entrySearchFilter !== 'edges') {
  //   const nodeIds = Object.keys(classesFromApi)

  //   if (nodeIds.length > 0) {
  //     for (let index = 0; index < nodeIds.length; index++) {
  //       const nodeId = nodeIds[index]
  //       const nodeElement = classesFromApi[nodeId]

  //       const isAnnotationPropertyContainingSearch = entrySearchAnnotationProperties.some(
  //         (property) => nodeElement[property]
  //         && nodeElement[property].toString().toLowerCase().includes(entrySearchValue.toLowerCase())
  //       )

  //       nodeElement.type = 'node'

  //       if (isAnnotationPropertyContainingSearch) {
  //         entrySearchResults.push(nodeElement)
  //       }
  //     }
  //   }
  // }

  // if (entrySearchFilter !== 'nodes') {
  //   const edgesIds = Object.keys(objectPropertiesFromApi)

  //   if (edgesIds.length > 0) {
  //     for (let index = 0; index < edgesIds.length; index++) {
  //       const edgeId = edgesIds[index]

  //       const edgeElement = objectPropertiesFromApi[edgeId]

  //       const isContainingSearch = entrySearchAnnotationProperties.some((property) => edgeElement[property]
  //         && edgeElement[property].toString().toLowerCase().includes(entrySearchValue.toLowerCase()))

  //       edgeElement.type = 'edge'

  //       if (isContainingSearch) {
  //         entrySearchResults.push(edgeElement)
  //       }
  //     }
  //   }
  // }

  setLoading(false)

  updateStoreValue(['isQueried'], OPERATION_TYPE_UPDATE, true)
  return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, entrySearchResults)
}

export default searchGraph
