import axios from 'axios'
import {
  NOTIFY_WARNING
} from '../constants/notifications'
import showNotification from './showNotification'
import { GET_GRAPH } from '../constants/api'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {Function} params.t                          i18n translation function
 * @return
 */
const getGraphData = async ({
  t
}) => axios.get(GET_GRAPH).then((res) => {
  console.log(res.data)

  return ({
    classesFromApi: [],
    objectPropertiesFromApi: []
  })
})
  .catch((err) => {
    console.log(err.message)
    showNotification({
      message: t('couldNotGetGraphData'),
      type: NOTIFY_WARNING
    })

    return ({
      classesFromApi: [],
      objectPropertiesFromApi: []
    })
  })

export default getGraphData
