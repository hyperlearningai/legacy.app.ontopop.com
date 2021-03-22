import {
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import {
  RiAddBoxLine,
  RiCheckboxIndeterminateLine
} from 'react-icons/ri'
import actions from '../store/actions'
import { SIDEBAR_VIEW_BOUNDING_BOX } from '../constants/views'
import setBoundingBoxNodes from '../utils/boundingBoxSelection/setBoundingBoxNodes'
import getNodesFromBoundingBox from '../utils/boundingBoxSelection/getNodesFromBoundingBox'
import resetNodesStyles from '../utils/networkStyling/resetNodesStyles'

const BoundingBoxSelection = ({
  setStoreState,
  selectedBoundingBoxNodes,
  addToObject,
  isBoundingBoxSelectionInternal,
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    setStoreState('isBoundingBoxSelectable', true)

    return () => {
      resetNodesStyles()
      setStoreState('isBoundingBoxSelectable', false)
      setStoreState('isBoundingBoxDrawable', false)
      setStoreState('isBoundingBoxSelectionInternal', true)
      setStoreState('selectedBoundingBoxNodes', [])
      setStoreState('boundingBoxGeometry', {
        fixedPointX: 0,
        fixedPointY: 0,
        boundingBoxPosX: 0,
        boundingBoxPosY: 0,
        boundingBoxWidth: 0,
        boundingBoxHeight: 0,
      })
    }
  }, [])

  useEffect(() => {
    resetNodesStyles()

    getNodesFromBoundingBox({
      setStoreState
    })
  }, [
    isBoundingBoxSelectionInternal,
  ])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_BOUNDING_BOX)}
      </div>
      <div className="bounding-box">
        <div className="bounding-box-selection">
          {t('drawBoundingBox')}
        </div>
        <div className="bounding-box-selection-steps">
          {t('drawBoundingBoxFirstClick')}
        </div>
        <div className="bounding-box-selection-steps">
          {t('drawBoundingBoxSecondClick')}
        </div>

        <div className="bounding-box-selected">
          <table>
            <tbody>
              <tr>
                <td className="bold">
                  {t('selectedNodes')}
                  :
                </td>
                <td>{selectedBoundingBoxNodes.length}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bounding-box-input">
          <div className="label">
            {t('selectionDirection')}
          </div>
          <div className="network-settings-buttons">
            <Button
              aria-label={t('insideBoundingBox')}
              tooltip={t('insideBoundingBox')}
              tooltipOptions={{ position: 'top' }}
              className={isBoundingBoxSelectionInternal ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('isBoundingBoxSelectionInternal', true)}
            >
              <RiAddBoxLine />
            </Button>
            <Button
              aria-label={t('outsideBoundingBox')}
              tooltip={t('outsideBoundingBox')}
              tooltipOptions={{ position: 'top' }}
              className={!isBoundingBoxSelectionInternal ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('isBoundingBoxSelectionInternal', false)}
            >
              <RiCheckboxIndeterminateLine />
            </Button>
          </div>
        </div>

        <Button
          aria-label={t('showSelectedNodes')}
          tooltip={t('showSelectedNodes')}
          className="bounding-box-button"
          disabled={selectedBoundingBoxNodes.length < 1}
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => setBoundingBoxNodes({
            setStoreState,
            addToObject
          })}
        />
      </div>
    </>
  )
}

BoundingBoxSelection.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  selectedBoundingBoxNodes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addToObject: PropTypes.func.isRequired,
  isBoundingBoxSelectionInternal: PropTypes.bool.isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  selectedBoundingBoxNodes,
  isBoundingBoxSelectionInternal,
}) => ({
  graphData,
  currentGraph,
  selectedBoundingBoxNodes,
  isBoundingBoxSelectionInternal,
})

export default connect(
  mapToProps,
  actions
)(BoundingBoxSelection)
