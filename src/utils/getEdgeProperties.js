import axios from 'axios'
import {
  NOTIFY_WARNING
} from '../constants/notifications'
import showNotification from './showNotification'
import { GET_PROPERTIES_OBJECTS } from '../constants/api'

/**
 * Get node properties from API
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {Array}    propertiesList                    Array of objects with property id and label
 */
const getEdgeProperties = async ({
  setStoreState,
  t
}) => {
  setStoreState('loading', true)

  try {
    const response = await axios.get(GET_PROPERTIES_OBJECTS)

    setStoreState('loading', false)

    if (response.status !== 200) {
      showNotification({
        message: t('couldNotQueryAnnotationProperties'),
        type: NOTIFY_WARNING
      })

      return []
    }

    const { data } = response
    const edgesProperties = Object.keys(data)

    return edgesProperties
  } catch (error) {
    setStoreState('loading', false)
    showNotification({
      message: t('couldNotQueryAnnotationProperties'),
      type: NOTIFY_WARNING
    })

    return []
  }
}

export default getEdgeProperties
