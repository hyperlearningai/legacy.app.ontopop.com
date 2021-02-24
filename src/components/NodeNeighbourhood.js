import {
  useState,
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_NEIGHBOURHOOD } from '../constants/views'
import setNeighbourNodes from '../utils/nodeNeighbourhood/setNeighbourNodes'
import getNode from '../utils/nodesEdgesUtils/getNode'

const NodeNeighbourhood = ({
  setStoreState,
  selectedNeighbourNode,
  addToObject,
}) => {
  const { t } = useTranslation()

  const [separationDegree, setSeparationDegree] = useState(1)

  useEffect(() => () => {
    setStoreState('isNeighbourNodeSelectable', false)
    setStoreState('selectedNeighbourNode', '')
  }, [])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NEIGHBOURHOOD)}
      </div>
      <div className="node-neighbourhood">
        <div className="node-neighbourhood-selection">
          {t('selectNodeFromGraph')}
          <div className="p-field p-col-12 m-t-20">
            <label htmlFor="separationDegree">{t('separationDegree')}</label>
            <InputNumber
              id="separationDegree"
              value={separationDegree}
              onValueChange={(e) => setSeparationDegree(e.target.value)}
              showButtons
              buttonLayout="horizontal"
              step={1}
              min={1}
              disabled={selectedNeighbourNode === ''}
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              className="m-t-10"
            />
          </div>
        </div>

        {
          selectedNeighbourNode
          && selectedNeighbourNode !== '' && (
            <div className="node-neighbourhood-selected">
              <table>
                <tbody>
                  <tr>
                    <td className="bold">{t('selectedNode')}</td>
                    <td>{getNode(selectedNeighbourNode).label}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }

        <Button
          tooltip={t('showNeighbourhood')}
          className="node-neighbourhood-button m-t-30"
          disabled={selectedNeighbourNode === ''}
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => setNeighbourNodes({
            separationDegree,
            setStoreState,
            addToObject
          })}
        />
      </div>
    </>
  )
}

NodeNeighbourhood.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  selectedNeighbourNode: PropTypes.string.isRequired,
  addToObject: PropTypes.func.isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  selectedNeighbourNode,
}) => ({
  graphData,
  currentGraph,
  selectedNeighbourNode,
})

export default connect(
  mapToProps,
  actions
)(NodeNeighbourhood)
