/* eslint max-len:0 */

import { DataSet } from 'vis-data'
import { classesFromApi } from './classesFromApi'

export const availableNodes = new DataSet(
  Object.keys(classesFromApi).map(
    (nodeId) => ({
      ...classesFromApi[nodeId],
      id: nodeId
    })
  )
)
