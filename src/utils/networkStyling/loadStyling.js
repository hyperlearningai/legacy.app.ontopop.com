import { STYLING_LS } from '../../constants/localStorage'
/**
 * Load saved styling options
 * @param  {Function} params.setStoreState           setStoreState action
 * @return {undefined}
 */
const loadStyling = ({
  setStoreState
}) => {
  const savedStyle = localStorage.getItem(STYLING_LS)

  if (savedStyle) {
    const savedStyleJson = JSON.parse(savedStyle)

    Object.keys(savedStyleJson).map((option) => setStoreState(option, savedStyleJson[option]))
  }

  return true
}

export default loadStyling
