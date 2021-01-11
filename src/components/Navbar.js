import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  FaRegHandPointer
} from 'react-icons/fa'
import {
  BsSearch,
} from 'react-icons/bs'
import actions from '../store/actions'

const Navbar = ({
  setStoreState,
  isSearchOpen,
  availableNodes,
  isNodeSelectable
}) => {
  const { t } = useTranslation()

  return (
    <nav>
      <div className="nav-left">
        <button
          type="button"
          title={t(isNodeSelectable ? 'disallowNodeSelection' : 'allowNodeSelection')}
          className={isNodeSelectable ? 'nav-left-button-selected' : ''}
          onClick={() => {
            if (isNodeSelectable) setStoreState('selectedNodes', [])

            setStoreState('isNodeSelectable', !isNodeSelectable)
          }}
        >
          <FaRegHandPointer />
        </button>

        <span>
          {`${t('nodes')}: ${availableNodes.length}`}
        </span>
      </div>

      <div className="nav-right">
        <button
          type="button"
          title={t('search')}
          className={isSearchOpen ? 'nav-right-button-selected' : ''}
          onClick={() => setStoreState('isSearchOpen', !isSearchOpen)}
        >
          <BsSearch />
        </button>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  isSearchOpen: PropTypes.bool.isRequired,
  setStoreState: PropTypes.func.isRequired,
  availableNodes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isNodeSelectable: PropTypes.bool.isRequired,
}

const mapToProps = ({
  isSearchOpen,
  availableNodes,
  isNodeSelectable
}) => ({
  isSearchOpen,
  availableNodes,
  isNodeSelectable
})

export default connect(
  mapToProps,
  actions
)(Navbar)
