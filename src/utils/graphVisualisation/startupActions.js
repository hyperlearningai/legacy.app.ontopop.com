import loadStyling from '../networkStyling/loadStyling'
import getGraphData from '../apiCalls/getGraphData'
import setNodesIdsToDisplay from './setNodesIdsToDisplay'
import notesGetNotes from '../notes/notesGetNotes'

/**
 * Graph data loading at startup
 * @param  {Object}     params
 * @param  {Function}   params.t                  Internationalisation function
 * @param  {Function}   params.addNumber          addNumber action
 * @param  {Function}   params.setStoreState      setStoreState action
 * @param  {Function}   params.removeFromObject   removeFromObject action
 * @return { undefined }
\ */
const startupActions = async ({
  addNumber,
  setStoreState,
  removeFromObject,
  t
}) => {
  // load saved styling options
  loadStyling({
    setStoreState,
    addNumber,
    t
  })

  // get graph comments
  notesGetNotes({
    addNumber,
    setStoreState,
    t
  })

  // get node comments
  notesGetNotes({
    addNumber,
    setStoreState,
    type: 'node',
    t
  })

  // get edge comments
  notesGetNotes({
    addNumber,
    setStoreState,
    type: 'edge',
    t
  })

  // get graph data
  await getGraphData({
    addNumber,
    setStoreState,
    t
  })

  setNodesIdsToDisplay({
    setStoreState,
    removeFromObject,
    t
  })
}

export default startupActions
