import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { BsSearch } from 'react-icons/bs'
import actions from '../store/actions'

const SearchBox = ({
  searchFilter,
  setStoreState
}) => {
  const { t } = useTranslation()

  return (
    <div className="search-box">
      <div className="search-box-title">
        {t('searchNode')}
      </div>

      <div className="search-box-input">
        <input
          value={searchFilter}
          onChange={(e) => {
            setStoreState('selectedNodes', [])
            setStoreState('selectedEdges', [])
            setStoreState('searchFilter', e.target.value)
          }}
        />
        <BsSearch />
      </div>
    </div>
  )
}

SearchBox.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
}

const mapToProps = ({
  searchFilter
}) => ({
  searchFilter
})

export default connect(
  mapToProps,
  actions
)(SearchBox)
