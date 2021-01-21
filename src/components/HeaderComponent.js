import React from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { ProgressSpinner } from 'primereact/progressspinner'
import logo from '../assets/images/logo.svg'

const HeaderComponent = ({
  loading
}) => (
  <header>
    {
      loading && (
        <div className="loader-box">
          <ProgressSpinner
            className="spinner"
            strokeWidth="4"
          />
        </div>
      )
    }
    <div className="logo">
      <img
        src={logo}
        alt="Highways England"
      />
    </div>
  </header>
)

HeaderComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
}

const mapToProps = ({
  loading,
}) => ({
  loading,
})

export default connect(
  mapToProps,
)(HeaderComponent)
