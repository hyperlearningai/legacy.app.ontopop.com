import loadStyling from '../networkStyling/loadStyling'
import getGraphData from '../apiCalls/getGraphData'
import setNodesIdsToDisplay from './setNodesIdsToDisplay'
import notesGetNotes from '../notes/notesGetNotes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import { STYLING_LS } from '../../constants/localStorage'

/**
 * Graph data loading at startup
 * @param  {Object}     params
 * @param  {Function}   params.t                  Internationalisation function
 * @param  {Function}   params.updateStoreValue   updateStoreValue action
 * @return { undefined }
\ */
const startupActions = async ({
  updateStoreValue,
  t
}) => {
  const {
    user
  } = store.getState()

  if (!user.isGuest) {
    // load saved styling options
    loadStyling({
      updateStoreValue,
      t
    })

    // get graph comments
    notesGetNotes({
      updateStoreValue,
      t
    })

    // get node comments
    notesGetNotes({
      updateStoreValue,
      type: 'node',
      t
    })

    // get edge comments
    notesGetNotes({
      updateStoreValue,
      type: 'edge',
      t
    })
  } else if (localStorage.getItem(STYLING_LS)) {
    const stylingObject = JSON.parse(localStorage.getItem(STYLING_LS))

    Object.keys(stylingObject).forEach((stylingKey) => updateStoreValue([stylingKey], OPERATION_TYPE_UPDATE, stylingObject[stylingKey]))
  }

  // get graph data
  await getGraphData({
    updateStoreValue,
    t
  })

  setNodesIdsToDisplay({
    updateStoreValue,
    t
  })

  if (localStorage.getItem('showTour')) {
    updateStoreValue(['showTour'], OPERATION_TYPE_UPDATE, JSON.parse(localStorage.getItem('showTour')))
  }
}

export default startupActions
