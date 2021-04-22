import loadStyling from '../networkStyling/loadStyling'
import getGraphData from '../apiCalls/getGraphData'
import setNodesIdsToDisplay from './setNodesIdsToDisplay'
import notesGetNotes from '../notes/notesGetNotes'
import {OPERATION_TYPE_UPDATE} from "../../constants/store";

/**
 * Graph data loading at startup
 * @param  {Object}     params
 * @param  {Function}   params.t                  Internationalisation function
 * @param  {Function}   params.updateStoreValue   updateStoreValue action
 * @return { undefined }
\ */
const startupActions = async ({
  showTour,
  updateStoreValue,
  t
}) => {
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
  } else {
    localStorage.setItem('showTour',  JSON.stringify(showTour))
  }


}

export default startupActions
