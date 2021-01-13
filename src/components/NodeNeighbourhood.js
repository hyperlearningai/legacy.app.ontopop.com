import { useState, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import { ALGO_TYPE_NEIGHBOURHOOD } from '../constants/algorithms'

const NodeNeighbourhood = ({
  setStoreState,
  lastGraphIndex,
  classesFromApi,
  selectedNeighbourNode,
  updateGraphData,
  triplesPerNode
}) => {
  const { t } = useTranslation()

  const newGraphIndex = lastGraphIndex + 1
  const newCurrentGraph = `graph-${lastGraphIndex + 1}`

  const [separationDegree, setSeparationDegree] = useState(1)

  useEffect(() => () => {
    setStoreState('isNeighbourNodeSelectable', false)
    setStoreState('selectedNeighbourNode', '')
  }, [])

  return (
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
                  <td>{t('label')}</td>
                  <td>{classesFromApi[selectedNeighbourNode].label}</td>
                </tr>
                <tr>
                  <td>{t('id')}</td>
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
        <input
          name="separationDegree"
          type="number"
          min="1"
          step="1"
          value={separationDegree}
          onChange={(e) => setSeparationDegree(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="node-neighbourhood-button"
        title={t('showNeighbourhood')}
        disabled={selectedNeighbourNode === ''}
        onClick={() => {
          const selectedNodeId = classesFromApi[selectedNeighbourNode] ? classesFromApi[selectedNeighbourNode].id : ''
          const label = `neighbourhood-${newCurrentGraph}`

          const graphValue = {
            label,
            type: ALGO_TYPE_NEIGHBOURHOOD,
            options: {
              selectedNodeId,
              separationDegree,
              triplesPerNode
            }
          }

          updateGraphData(newCurrentGraph, graphValue)
          setStoreState('currentGraph', newCurrentGraph)
          setStoreState('lastGraphIndex', newGraphIndex)
          setStoreState('sidebarView', SIDEBAR_VIEW_GRAPHS)
        }}
      >
        {t('show')}
      </button>
    </div>
  )
}

NodeNeighbourhood.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  lastGraphIndex: PropTypes.number.isRequired,
  selectedNeighbourNode: PropTypes.string.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  updateGraphData: PropTypes.func.isRequired,
  triplesPerNode: PropTypes.shape().isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  lastGraphIndex,
  classesFromApi,
  selectedNeighbourNode,
  triplesPerNode
}) => ({
  graphData,
  currentGraph,
  lastGraphIndex,
  classesFromApi,
  selectedNeighbourNode,
  triplesPerNode
})

export default connect(
  mapToProps,
  actions
)(NodeNeighbourhood)
