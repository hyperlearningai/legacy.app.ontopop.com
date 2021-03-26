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
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import resetBoundingBoxNodes from '../utils/boundingBoxSelection/resetBoundingBoxNodes'

const BoundingBoxSelection = ({
  updateStoreValue,
  selectedBoundingBoxNodes,
  isBoundingBoxSelectionInternal,
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    updateStoreValue(['isBoundingBoxSelectable'], OPERATION_TYPE_UPDATE, true)

    return () => {
      resetBoundingBoxNodes()

      updateStoreValue(['isBoundingBoxSelectable'], OPERATION_TYPE_UPDATE, false)
      updateStoreValue(['isBoundingBoxDrawable'], OPERATION_TYPE_UPDATE, false)
      updateStoreValue(['isBoundingBoxSelectionInternal'], OPERATION_TYPE_UPDATE, true)
      updateStoreValue(['selectedBoundingBoxNodes'], OPERATION_TYPE_UPDATE, [])
      updateStoreValue(['boundingBoxGeometry'], OPERATION_TYPE_UPDATE, {
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
    resetBoundingBoxNodes()

    getNodesFromBoundingBox({
      updateStoreValue
    })
  }, [
    isBoundingBoxSelectionInternal,
  ])

  return (
    <>
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_BOUNDING_BOX)}
      </h1>
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
              ariaLabel={t('insideBoundingBox')}
              tooltip={t('insideBoundingBox')}
              tooltipOptions={{ position: 'top' }}
              className={isBoundingBoxSelectionInternal ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => updateStoreValue(['isBoundingBoxSelectionInternal'], OPERATION_TYPE_UPDATE, true)}
            >
              <RiAddBoxLine />
            </Button>
            <Button
              ariaLabel={t('outsideBoundingBox')}
              tooltip={t('outsideBoundingBox')}
              tooltipOptions={{ position: 'top' }}
              className={!isBoundingBoxSelectionInternal ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => updateStoreValue(['isBoundingBoxSelectionInternal'], OPERATION_TYPE_UPDATE, false)}
            >
              <RiCheckboxIndeterminateLine />
            </Button>
          </div>
        </div>

        <Button
          ariaLabel={t('showSelectedNodes')}
          tooltip={t('showSelectedNodes')}
          className="bounding-box-button"
          disabled={selectedBoundingBoxNodes.length < 1}
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => setBoundingBoxNodes({
            updateStoreValue
          })}
        />
      </div>
    </>
  )
}

BoundingBoxSelection.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  selectedBoundingBoxNodes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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
