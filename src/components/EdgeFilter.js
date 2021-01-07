import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { BsSearch } from 'react-icons/bs'
import actions from '../store/actions'

const EdgeFilter = ({
  edgesToIgnore,
  objectPropertiesFromApi,
  setStoreState,
  edgeFilter
}) => {
  const { t } = useTranslation()

  const edgesList = objectPropertiesFromApi
    && objectPropertiesFromApi.OwlObjectProperties
    ? Object.entries(objectPropertiesFromApi.OwlObjectProperties).map(([id, objectValue]) => ({
      id,
      label: objectValue.rdfsLabel
    }))
    : []

  return (
    <div className="edge-filter">
      <div className="edge-filter-title">
        {t('edgesList')}
      </div>

      <div className="edge-filter-input">
        <input
          value={edgeFilter}
          onChange={(e) => setStoreState('edgeFilter', e.target.value)}
        />
        <BsSearch />
      </div>

      {
        objectPropertiesFromApi
        && _.orderBy(edgesList, ['label'], ['asc']).filter((edge) => {
          if (edgeFilter === '') return true

          return edge.label ? edge.label.toLowerCase().includes(edgeFilter) : false
        }).map((edge) => {
          const { id, label } = edge

          return (
            <div
              key={`edge-filter-item-${id}`}
              className="edge-filter-item"
            >
              <input
                type="checkbox"
                checked={!edgesToIgnore.includes(id)}
                name={`edge-filter-item-${id}`}
                onClick={() => {
                  const newEdgesToIgnore = edgesToIgnore.slice()

                  if (newEdgesToIgnore.includes(id)) {
                    newEdgesToIgnore.splice(newEdgesToIgnore.indexOf(id), 1)
                    return setStoreState('edgesToIgnore', newEdgesToIgnore)
                  }

                  newEdgesToIgnore.push(id)
                  return setStoreState('edgesToIgnore', newEdgesToIgnore)
                }}
              />
              <label htmlFor={`edge-filter-item-${id}`}>
                {label}
              </label>
            </div>
          )
        })
        }
    </div>
  )
}

EdgeFilter.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  edgeFilter: PropTypes.string.isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  edgesToIgnore: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapToProps = ({
  objectPropertiesFromApi,
  edgesToIgnore,
  edgeFilter
}) => ({
  objectPropertiesFromApi,
  edgesToIgnore,
  edgeFilter
})

export default connect(
  mapToProps,
  actions
)(EdgeFilter)
