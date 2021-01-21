import React from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { ProgressBar } from 'primereact/progressbar'

const FooterComponent = ({
  networkLoadingProgress,
  isNetworkLoading
}) => (
  <footer>
    {isNetworkLoading
      ? (
        <ProgressBar
          showValue={false}
          value={networkLoadingProgress.toFixed(0)}
        />
      ) : null}
  </footer>
)

FooterComponent.propTypes = {
  isNetworkLoading: PropTypes.bool.isRequired,
  networkLoadingProgress: PropTypes.number.isRequired,
}

const mapToProps = ({
  networkLoadingProgress,
  isNetworkLoading
}) => ({
  networkLoadingProgress,
  isNetworkLoading
})

export default connect(
  mapToProps
)(FooterComponent)
