import {
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_BOUNDING_BOX } from '../constants/views'
import setBoundingBoxNodes from '../utils/setBoundingBoxNodes'

const BoundingBoxSelection = ({
  setStoreState,
  selectedBoundingBoxNodes,
  updateGraphData,
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    setStoreState('isBoundingBoxSelectable', true)
    // setStoreState('isBoundingBoxDraggable', true)

    return () => {
      setStoreState('isBoundingBoxSelectable', false)
      setStoreState('isBoundingBoxDraggable', false)
      setStoreState('selectedBoundingBoxNodes', [])
      setStoreState('boundingBoxGeometry', {
        boundingBoxPosX: 0,
        boundingBoxPosY: 0,
        boundingBoxWidth: 0,
        boundingBoxHeight: 0,
      })
    }
  }, [])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_BOUNDING_BOX)}
      </div>
      <div className="bounding-box">
        <div className="bounding-box-selection">
          {t('drawBoundingBox')}
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

        <Button
          tooltip={t('showSelectedNodes')}
          className="bounding-box-button"
          disabled={selectedBoundingBoxNodes.length < 1}
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => setBoundingBoxNodes({
            setStoreState,
            updateGraphData
          })}
        />
      </div>
    </>
  )
}

BoundingBoxSelection.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  selectedBoundingBoxNodes: PropTypes.string.isRequired,
  updateGraphData: PropTypes.func.isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  selectedBoundingBoxNodes,
}) => ({
  graphData,
  currentGraph,
  selectedBoundingBoxNodes,
})

export default connect(
  mapToProps,
  actions
)(BoundingBoxSelection)
