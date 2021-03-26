import loadStyling from '../networkStyling/loadStyling'
import getGraphData from '../apiCalls/getGraphData'
import setNodesIdsToDisplay from './setNodesIdsToDisplay'
import notesGetNotes from '../notes/notesGetNotes'

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
}

export default startupActions
