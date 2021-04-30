import { OPERATION_TYPE_PUSH } from '../../constants/store'
import store from '../../store'
import getElementLabel from '../networkStyling/getElementLabel'

/**
 * Set data table triples labels
 * @param  {Object}   params
 * @param  {Func}    params.updateStoreValue            updateStoreValue action
 * @return {undefined}
 */
const setDataTableTriplesLabels = ({
  updateStoreValue
}) => {
  const {
    dataTableTriples
  } = store.getState()

  if (dataTableTriples.length === 0) return false

  const dataTableTriplesLength = dataTableTriples.length - 1

  for (let index = dataTableTriplesLength; index >= 0; index--) {
    const triple = dataTableTriples[dataTableTriplesLength - index]

    const {
      from,
      edge,
      to
    } = triple

    const fromLabel = getElementLabel({
      type: 'node',
      id: from
    })

    const edgeLabel = getElementLabel({
      type: 'edge',
      id: edge
    })

    const toLabel = getElementLabel({
      type: 'node',
      id: to
    })

    updateStoreValue(['dataTableTriplesWithLabels'], OPERATION_TYPE_PUSH, {
      fromLabel,
      edgeLabel,
      toLabel
    })
  }
}

export default setDataTableTriplesLabels
