import getNetworkStyling from './getNetworkStyling'
import store from '../../store'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Load saved styling options
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const loadStyling = async ({
  updateStoreValue,
  t
}) => {
  const savedStyle = await getNetworkStyling({
    updateStoreValue,
    t
  })

  const state = store.getState()

  if (savedStyle) {
    Object.keys(savedStyle).map((option) => {
      const optionValue = Array.isArray(state[option])
        ? [...state[option], ...savedStyle[option]]
        : { ...state[option], ...savedStyle[option] }

      return updateStoreValue([option], OPERATION_TYPE_UPDATE, optionValue)
    })
  }

  return true
}

export default loadStyling
