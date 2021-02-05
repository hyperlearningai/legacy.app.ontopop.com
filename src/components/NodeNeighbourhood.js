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
          <div className="p-field p-col-12 p-md-3 m-t-20">
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
  classesFromApi: PropTypes.shape().isRequired,
  addToObject: PropTypes.func.isRequired,
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
