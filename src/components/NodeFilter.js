import {
  useState,
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_GRAPHS, SIDEBAR_VIEW_NEIGHBOURHOOD } from '../constants/views'
import { ALGO_TYPE_NEIGHBOURHOOD } from '../constants/algorithms'
import { MultiSelect } from 'primereact/multiselect';

const NodeFilter = ({
  setStoreState,
  lastGraphIndex,
  classesFromApi,
  selectedNeighbourNode,
  updateGraphData,
  triplesPerNode
}) => {
  const { t } = useTranslation()
  const citySelectItems = [
    {label: 'About', value: 'about'},
    {label: 'Definition', value: 'definition'},
    {label: 'Label', value: 'label'},
    {label: 'Comment', value: 'comment'}
];
  const cities = [
    {name: 'About', code: 'about'},
    {name: 'Definition', code: 'definition'},
    {name: 'Label', code: 'label'},
    {name: 'Comment', code: 'comment'}
  ];

  const newGraphIndex = lastGraphIndex + 1
  const newCurrentGraph = `graph-${lastGraphIndex + 1}`

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
      <div className="node-filter">
        

        {/* {
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
        } */}

        <div className="node-filter-input">
          <label htmlFor="separationDegree">
            {t('searchInputText')}
          </label>
          <InputText
            id="separationDegree"
            value=''
          />
        </div>

        <div className="p-b-20 node-filter-selection">
          {t('filterNodesTitle')}
          <MultiSelect value={cities} options={citySelectItems} onChange={(e) => setCities(e.value)} />
        </div>
       
        <Button
          className="node-neighbourhood-button"
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('performSearch')}
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
        />
      </div>
    </>
  )
}

NodeFilter.propTypes = {
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
)(NodeFilter)
