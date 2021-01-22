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
import setNeighbourNodes from '../utils/setNeighbourNodes'

const NodeNeighbourhood = ({
  setStoreState,
  classesFromApi,
  selectedNeighbourNode,
  updateGraphData,
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
        </div>

        {
          selectedNeighbourNode
          && selectedNeighbourNode !== '' && (
            <div className="node-neighbourhood-selected">
              <table>
                <tbody>
                  <tr>
                    <td className="bold">{t('label')}</td>
                    <td>{classesFromApi[selectedNeighbourNode].label}</td>
                  </tr>
                  <tr>
                    <td className="bold">{t('id')}</td>
                    <td>{classesFromApi[selectedNeighbourNode].id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }

        <div className="node-neighbourhood-input">
          <label htmlFor="separationDegree">
            {t('separationDegree')}
          </label>
          <InputNumber
            id="separationDegree"
            value={separationDegree}
            min={1}
            step={1}
            onValueChange={(e) => setSeparationDegree(e.target.value)}
          />
        </div>

        <Button
          tooltip={t('showNeighbourhood')}
          className="node-neighbourhood-button"
          disabled={selectedNeighbourNode === ''}
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => setNeighbourNodes({
            separationDegree,
            setStoreState,
            updateGraphData
          })}
        />
      </div>
    </>
  )
}

NodeNeighbourhood.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  selectedNeighbourNode: PropTypes.string.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  updateGraphData: PropTypes.func.isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  classesFromApi,
  selectedNeighbourNode,
}) => ({
  graphData,
  currentGraph,
  classesFromApi,
  selectedNeighbourNode,
})

export default connect(
  mapToProps,
  actions
)(NodeNeighbourhood)
