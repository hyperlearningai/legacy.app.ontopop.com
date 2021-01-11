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
import {
  ImInfo
} from 'react-icons/im'
import actions from '../store/actions'

const Navbar = ({
  setStoreState,
  isSearchOpen,
  isInfoOpen,
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
            if (isNodeSelectable) setStoreState('isNodeSelectable', [])

            setStoreState('isNodeSelectable', !isNodeSelectable)
          }}
        >
          <FaRegHandPointer />
        </button>

        <button
          type="button"
          title={t(isInfoOpen ? 'hideInfo' : 'showInfo')}
          className={isInfoOpen ? 'nav-left-button-selected' : ''}
          onClick={() => setStoreState('isInfoOpen', !isInfoOpen)}
        >
          <ImInfo />
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
          onClick={() => {
            setStoreState('isInfoOpen', false)
            setStoreState('isSearchOpen', !isSearchOpen)
          }}
        >
          <BsSearch />
        </button>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  isInfoOpen: PropTypes.bool.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  setStoreState: PropTypes.func.isRequired,
  availableNodes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isNodeSelectable: PropTypes.bool.isRequired,
}

const mapToProps = ({
  isInfoOpen,
  isSearchOpen,
  availableNodes,
  isNodeSelectable
}) => ({
  isInfoOpen,
  isSearchOpen,
  availableNodes,
  isNodeSelectable
})

export default connect(
  mapToProps,
  actions
)(Navbar)
