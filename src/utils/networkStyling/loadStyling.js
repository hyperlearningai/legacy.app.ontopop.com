import getNetworkStyling from './getNetworkStyling'

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

  if (savedStyle) {
    const savedStyleJson = JSON.parse(savedStyle)

    Object.keys(savedStyleJson).map((option) => setStoreState(option, savedStyleJson[option]))
  }

  return true
}

export default loadStyling
