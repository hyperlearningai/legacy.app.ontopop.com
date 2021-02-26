/* eslint max-len:0 */

import { DataSet } from 'vis-data'
import { objectPropertiesFromApi } from './objectPropertiesFromApi'

export const availableEdges = new DataSet(
  Object.keys(objectPropertiesFromApi).map(
    (edgeId) => ({
      ...objectPropertiesFromApi[edgeId],
      id: edgeId.toString(),
      from: objectPropertiesFromApi[edgeId].from.toString(),
      to: objectPropertiesFromApi[edgeId].to.toString(),
    })
  )
)
