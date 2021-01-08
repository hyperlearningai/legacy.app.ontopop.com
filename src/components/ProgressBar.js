import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const ProgressBar = ({
  progress
}) => {
  const { t } = useTranslation()
  const width = `${progress * 2}px`

  return (
    <div className="progress-bar">
      <div className="progress-bar-title">
        {t('loading')}
      </div>

      <div className="progress-bar-box">
        <div
          className="progress-bar-box-filler"
          style={{ width }}
        />
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default ProgressBar
