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
import { DATASET_REPO_URL } from '../constants/routes'

const GraphSearchCard = ({
  updateStoreValue,
  searchResult,
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
          onClick={() => setSearchNeighbourNodes({
            separationDegree: 1,
            updateStoreValue,
            searchResult,
          })}
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
              onClick={() => {
                setSearchNeighbourNodes({
                  separationDegree: 1,
                  updateStoreValue,
                  searchResult,
                })

                updateStoreValue(['selectedElement'], OPERATION_TYPE_UPDATE, { [id]: 'node' })
                updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_NOTES)
              }}
            />

            <Button
              aria-label={t('synonyms')}
              label={t('synonyms')}
              onClick={() => {
                setSearchNeighbourNodes({
                  separationDegree: 1,
                  updateStoreValue,
                  searchResult,
                })

                updateStoreValue(['selectedElement'], OPERATION_TYPE_UPDATE, { [id]: 'node' })
                updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_SYNONYMS)
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
