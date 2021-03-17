import getNetworkStyling from './getNetworkStyling'
import store from '../../store'

/**
 * Load saved styling options
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const loadStyling = async ({
  setStoreState,
  addNumber,
  t
}) => {
  const savedStyle = await getNetworkStyling({
    addNumber,
    t
  })

  const state = store.getState()

  if (savedStyle) {
    Object.keys(savedStyle).map((option) => {
      const optionValue = Array.isArray(state[option])
        ? [...state[option], ...savedStyle[option]]
        : { ...state[option], ...savedStyle[option] }

      return setStoreState(option, optionValue)
    })
  }

  return true
}

export default loadStyling
