import axios from 'axios'
import {
  NOTIFY_WARNING
} from '../constants/notifications'
import showNotification from './showNotification'
import { GET_GRAPH } from '../constants/api'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {Object}   output
 * @return {Array}    output.classes                    Array of classes
 * @return {Array}    output.objectProperties           Array of object properties
 */
const getGraphData = async ({
  setStoreState,
  t
}) => {
  setStoreState('loading', true)

  try {
    const response = await axios.get(GET_GRAPH)

    setStoreState('loading', false)

    if (response.status !== 200) {
      showNotification({
        message: t('couldNotGetGraphData'),
        type: NOTIFY_WARNING
      })

      return ({
        classes: [],
        objectProperties: []
      })
    }

    const {
      // owlAnnotationPropertyMap,
      owlObjectPropertyMap,
      owlClassMap
    } = response.data

    return ({
      classes: owlClassMap,
      objectProperties: owlObjectPropertyMap
    })
  } catch (error) {
    setStoreState('loading', false)
    showNotification({
      message: t('couldNotGetGraphData'),
      type: NOTIFY_WARNING
    })

    return ({
      classes: [],
      objectProperties: []
    })
  }
}

export default getGraphData
