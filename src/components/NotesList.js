import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import {SIDEBAR_VIEW_NOTES, SIDEBAR_VIEW_STYLING} from '../constants/views'
import PropTypes from "prop-types";
import {connect} from "redux-zero/react";
import actions from "../store/actions";
import resetSelectedNode from "../utils/nodesSelection/resetSelectedNode";
import highlightSelectedNode from "../utils/nodesSelection/highlightSelectedNode";

const NotesList = ({
 notes,
 selectedNode,
 setStoreState
}) => {

  console.log('selectedNode', selectedNode)
  const { t } = useTranslation()

  const [isSaved, setSaved] = useState(false)

  useEffect(() => () => {
    setStoreState('selectedNode', undefined)

    resetSelectedNode({
      setStoreState
    })
  }, [])

  useEffect(() => {
    if (selectedNode && selectedNode !== '') {
      resetSelectedNode({
        setStoreState
      })

      highlightSelectedNode({
        setStoreState,
        selectedNode
      })
    }
  }, [selectedNode])

  const icon = isSaved ? 'pi pi-check' : 'pi pi-save'

  const filteredNotes = selectedNode ?
    Object.keys(notes).filter(noteKey => notes[noteKey].nodeId === selectedNode) :
    notes;

  console.log('filteredNotes', filteredNotes)

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NOTES)}
      </div>
      <div className="notes-list">
        <div className="card">

          {filteredNotes && Object.keys(filteredNotes).map((noteKey)=>
            <div key={noteKey} className="notes-list-note">
             <h5>{notes[noteKey].contents}</h5>

              <div className="notes-list-content">
                <p>{notes[noteKey].contents}</p>
              </div>

              <div className="notes-list-date">
                <span> {t('dateCreated')}</span>
                <span>{new Date(notes[noteKey].dateCreated).toLocaleString()}</span>
              </div>
              <div className="notes-list-date">
                <span> {t('dateLastUpdated')}</span>
                <span>{new Date(notes[noteKey].dateLastUpdated).toLocaleString()}</span>
              </div>

              <div className="notes-list-date">
                <span> {t('userId')}</span>
                <span>{notes[noteKey].userId}</span>
              </div>

              <div className="notes-list-date">
                <span> {t('nodeId')}</span>
                <span>{notes[noteKey].nodeId}</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </>
  )
}

NotesList.propTypes = {
  stylingNodeHoverBackgroundColor: PropTypes.shape(),
  selectedNode: PropTypes.string,
  setStoreState: PropTypes.func.isRequired
}

const mapToProps = ({
  notes,
  selectedNode
}) => ({
  notes,
  selectedNode
})

export default connect(
  mapToProps,
  actions
)(NotesList)

