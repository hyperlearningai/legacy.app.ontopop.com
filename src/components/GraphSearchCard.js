// import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import actions from '../store/actions'
import setSearchNeighbourNodes from '../utils/graphSearch/setSearchNeighbourNodes'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import { SIDEBAR_VIEW_NOTES, SIDEBAR_VIEW_SYNONYMS } from '../constants/views'
import { DATASET_REPO_URL, ROUTE_NOTES, ROUTE_SYNONYMS } from '../constants/routes'

const GraphSearchCard = ({
  updateStoreValue,
  searchResult,
  index
}) => {
  const { t } = useTranslation()

  const {
    type,
    name,
    id,
    skosDefinition,
    skosComment,
    description,
    path
  } = searchResult

  const infoDescription = type === 'dataset' ? description : (
    skosDefinition || skosComment
  )

  return (
    <Card>
      <div className="p-card-info">
        <div className="p-card-row bold">
          {type === 'dataset' ? t(type) : t('dataEntity')}
        </div>

        <div className="p-card-row p-card-info-title">
          {name}
        </div>

        <p className="p-text-justify">
          {infoDescription}
        </p>
      </div>

      <div className="p-card-buttons">
        <Button
          aria-label={t('visualise')}
          label={t('visualise')}
          id={`card-visualise-btn-${index}`}
          onClick={() => {
            setSearchNeighbourNodes({
              separationDegree: 1,
              updateStoreValue,
              searchResult,
            })
            updateStoreValue(['selectedNotesType'], OPERATION_TYPE_UPDATE, 'node')
            updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, id)
            updateStoreValue(['selectedElement'], OPERATION_TYPE_UPDATE, { [id]: 'node' })
          }}
        />

        {type === 'dataset' ? (
          <a
            href={`${DATASET_REPO_URL}${path}`}
            aria-label={t('open')}
            className="p-button p-text-center link"
            rel="noopener nofollow noreferrer"
            target="_blank"
          >
            {t('open')}
          </a>
        ) : (
          <>
            <Button
              aria-label={t('notes')}
              label={t('notes')}
              id={`card-notes-btn-${index}`}
              onClick={() => {
                setSearchNeighbourNodes({
                  separationDegree: 1,
                  updateStoreValue,
                  searchResult,
                })

                updateStoreValue(['selectedNotesType'], OPERATION_TYPE_UPDATE, 'node')
                updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, id)
                updateStoreValue(['selectedElement'], OPERATION_TYPE_UPDATE, { [id]: 'node' })
                updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_NOTES)
                window.history.pushState('', '', ROUTE_NOTES)
              }}
            />

            <Button
              aria-label={t('synonyms')}
              label={t('synonyms')}
              id={`card-synonyms-btn-${index}`}
              onClick={() => {
                setSearchNeighbourNodes({
                  separationDegree: 1,
                  updateStoreValue,
                  searchResult,
                })
                updateStoreValue(['selectedNotesType'], OPERATION_TYPE_UPDATE, 'node')
                updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, id)
                updateStoreValue(['selectedElement'], OPERATION_TYPE_UPDATE, { [id]: 'node' })
                updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_SYNONYMS)
                window.history.pushState('', '', ROUTE_SYNONYMS)
              }}
            />
          </>
        ) }

      </div>
    </Card>
  )
}

GraphSearchCard.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  searchResult: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
}

const mapToProps = ({
  entrySearchResults,
}) => ({
  entrySearchResults,
})

export default connect(
  mapToProps,
  actions
)(GraphSearchCard)
