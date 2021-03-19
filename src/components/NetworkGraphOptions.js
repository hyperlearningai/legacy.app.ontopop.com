/* eslint react/no-array-index-key:0 */
import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { SelectButton } from 'primereact/selectbutton'
import { Checkbox } from 'primereact/checkbox'
import actions from '../store/actions'
import { SIDEBAR_VIEW_GRAPH_OPTIONS } from '../constants/views'
import setNetworkGraphOptions from '../utils/networkGraphOptions/setNetworkGraphOptions'

const NetworkGraphOptions = ({
  toggleFromSubArray,
  addNumber,
  addToObject,
  annotationProperties,
  currentGraph,
  graphData,
  toggleFromArrayInKey,
  setStoreState
}) => {
  const { t } = useTranslation()

  const {
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible
  } = graphData[currentGraph]

  const defaultNodeFilter = {
    property: '',
    value: '',
  }

  const checkEmptyRow = (filters) => filters.filter((filter) => filter.property === '' && filter.value === '').length > 0

  const [filters, setFilters] = useState([defaultNodeFilter])
  const [queryLogic, setQueryLogic] = useState('and')
  const [isUpperOntologyVisibleLocal, setUpperOntologyVisibleLocal] = useState(isUpperOntologyVisible)
  const [isSubClassEdgeVisibleLocal, setSubClassEdgeVisibleLocal] = useState(isSubClassEdgeVisible)
  const [isDatasetVisibleLocal, setDatasetVisibleLocal] = useState(isDatasetVisible)

  const logicButtons = [{
    value: 'and',
    label: t('and'),
    icon: 'pi-plus'
  }, {
    value: 'or',
    label: t('or'),
    icon: 'pi-minus'
  }]

  const itemTemplate = (option) => (
    <span className="graph-options-selection-row-select-option">
      <i className={`pi ${option.icon}`} />
      {` ${option.label}`}
    </span>
  )

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_GRAPH_OPTIONS)}
      </div>
      <div className="graph-options">
        <div className="graph-options-text">{t('chooseGraphOptions')}</div>

        <div className="graph-options-toggle p-col-12">
          <Checkbox
            id="upper-ontology-checkbox"
            onChange={(e) => setUpperOntologyVisibleLocal(e.checked)}
            checked={isUpperOntologyVisibleLocal}
          />
          <label htmlFor="upper-ontology-checkbox" className="p-checkbox-label">
            {t('showUpperOntologyLayers')}
          </label>
        </div>

        <div className="graph-options-toggle p-col-12  m-t-10">
          <Checkbox
            id="subclass-checkbox"
            onChange={(e) => setSubClassEdgeVisibleLocal(e.checked)}
            checked={isSubClassEdgeVisibleLocal}
          />
          <label htmlFor="overlay-checkbox" className="p-checkbox-label">
            {t('showSubclassRelationships')}
          </label>
        </div>

        <div className="graph-options-toggle p-col-12  m-t-10">
          <Checkbox
            id="dataset-checkbox"
            onChange={(e) => setDatasetVisibleLocal(e.checked)}
            checked={isDatasetVisibleLocal}
          />
          <label htmlFor="upper-ontology-checkbox" className="p-checkbox-label">
            {t('showDatasets')}
          </label>
        </div>

        <div
          className="graph-options-select-button"
        >
          <label htmlFor="logic-select">
            {t('chooseLogic')}
          </label>
          <SelectButton
            id="logic-select"
            value={queryLogic}
            options={logicButtons}
            onChange={(e) => {
              setQueryLogic(e.value)
            }}
            itemTemplate={itemTemplate}
          />
        </div>

        <div
          className="graph-options-selection"
        >
          {
            filters.map(
              (nodefilter, index) => {
                const selectId = `graph-options-property-${index}`
                const inputTextId = `graph-options-value-${index}`

                return (
                  <div
                    className="graph-options-selection-row"
                    key={`graph-options-${index}`}
                  >
                    {
                      filters.length > 1 && (
                        <div className="p-field remove-button p-col-12">
                          <Button
                            icon="pi pi-times"
                            className="p-button-rounded p-button-danger"
                            tooltip={t('removeFilter')}
                            onClick={() => {
                              const newNodeFilter = filters.slice()

                              newNodeFilter.splice(index, 1)

                              if (!checkEmptyRow(newNodeFilter)) {
                                newNodeFilter.push(JSON.parse(JSON.stringify(defaultNodeFilter)))
                              }

                              setFilters(newNodeFilter)
                            }}
                          />
                        </div>
                      )
                    }

                    <div className="p-field p-col-12">
                      <label htmlFor={selectId}>{t('selectProperty')}</label>
                      <Dropdown
                        id={selectId}
                        value={filters[index].property}
                        options={annotationProperties}
                        filter
                        onChange={(e) => {
                          const newFilter = {
                            ...filters[index],
                            property: e.value
                          }

                          let newNodesFilters = [
                            ...filters.slice(0, index),
                            newFilter,
                            ...filters.slice(index + 1),
                          ]

                          if (!checkEmptyRow(newNodesFilters)) {
                            newNodesFilters = [
                              ...newNodesFilters,
                              JSON.parse(JSON.stringify(defaultNodeFilter))
                            ]
                          }

                          setFilters(newNodesFilters)
                        }}
                        className="m-t-10"
                        placeholder={t('selectProperty')}
                      />
                    </div>

                    <div className="p-field p-col-12 m-t-20">
                      <label htmlFor={inputTextId}>{t('searchString')}</label>
                      <InputText
                        id={inputTextId}
                        value={filters[index].value}
                        placeholder={t('searchString')}
                        onChange={(e) => {
                          const newFilter = {
                            ...filters[index],
                            value: e.target.value
                          }

                          setFilters([
                            ...filters.slice(0, index),
                            newFilter,
                            ...filters.slice(index + 1)
                          ])
                        }}
                        className="m-t-10"
                      />
                    </div>
                  </div>
                )
              }
            )
          }
        </div>

        <div className="graph-options-button-wrapper">
          <Button
            tooltip={t('save')}
            id="network-graph-options-save"
            className="graph-options-button m-t-30"
            icon="pi pi-save"
            iconPos="right"
            label={t('show')}
            onClick={() => setNetworkGraphOptions({
              isUpperOntologyVisible: isUpperOntologyVisibleLocal,
              isSubClassEdgeVisible: isSubClassEdgeVisibleLocal,
              isDatasetVisible: isDatasetVisibleLocal,
              addToObject,
              toggleFromSubArray,
              addNumber,
              toggleFromArrayInKey,
              setStoreState
            })}
          />
        </div>

      </div>
    </>
  )
}

NetworkGraphOptions.propTypes = {
  currentGraph: PropTypes.string.isRequired,
  graphData: PropTypes.shape().isRequired,
  addToObject: PropTypes.func.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
  toggleFromSubArray: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
  toggleFromArrayInKey: PropTypes.func.isRequired,
  setStoreState: PropTypes.func.isRequired,
}

const mapToProps = ({
  annotationProperties,
  currentGraph,
  graphData
}) => ({
  annotationProperties,
  currentGraph,
  graphData
})

export default connect(
  mapToProps,
  actions
)(NetworkGraphOptions)
