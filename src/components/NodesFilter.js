/* eslint react/no-array-index-key:0 */
import {
  useEffect,
  useState,
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_NODES_FILTER } from '../constants/views'
import setFilteredNodes from '../utils/nodesFilter/setFilteredNodes'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const NodesFilter = ({
  updateStoreValue,
  annotationProperties,
}) => {
  const { t } = useTranslation()

  useEffect(() => () => {
    updateStoreValue(['isNodeSelectable'], OPERATION_TYPE_UPDATE, false)
  }, [])

  const defaultNodeFilter = {
    property: '',
    value: '',
  }

  const checkEmptyRow = (filters) => filters.filter((filter) => filter.property === '' && filter.value === '').length > 0

  const [nodesFilters, setNodesFilters] = useState([defaultNodeFilter])

  return (
    <>
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NODES_FILTER)}
      </h1>

      <div className="nodes-filter">
        <div>{t('filterNodesByArbitraryPropsCombination')}</div>

        <div
          className="nodes-filter-selection"
        >
          {
            nodesFilters.map(
              (nodefilter, index) => {
                const selectId = `nodes-filter-property-${index}`
                const inputTextId = `nodes-filter-value-${index}`

                return (
                  <div
                    className="nodes-filter-selection-row"
                    key={`nodes-filter-${index}`}
                  >
                    {
                      nodesFilters.length > 1 && (
                      <div className="p-field remove-button p-col-12">
                        <Button
                          ariaLabel={t('removeFilter')}
                          icon="pi pi-times"
                          className="p-button-rounded p-button-danger"
                          tooltip={t('removeFilter')}
                          onClick={() => {
                            const newNodeFilter = nodesFilters.slice()

                            newNodeFilter.splice(index, 1)

                            if (!checkEmptyRow(newNodeFilter)) {
                              newNodeFilter.push(JSON.parse(JSON.stringify(defaultNodeFilter)))
                            }

                            setNodesFilters(newNodeFilter)
                          }}
                        />
                      </div>
                      )
                    }

                    <div className="p-field p-col-12">
                      <label htmlFor={selectId}>{t('selectProperty')}</label>
                      <Dropdown
                        ariaLabel="notes-select-element"
                        id={selectId}
                        value={nodesFilters[index].property}
                        options={annotationProperties}
                        filter
                        onChange={(e) => {
                          const newFilter = {
                            ...nodesFilters[index],
                            property: e.value
                          }

                          let newNodesFilters = [
                            ...nodesFilters.slice(0, index),
                            newFilter,
                            ...nodesFilters.slice(index + 1),
                          ]

                          if (!checkEmptyRow(newNodesFilters)) {
                            newNodesFilters = [
                              ...newNodesFilters,
                              JSON.parse(JSON.stringify(defaultNodeFilter))
                            ]
                          }

                          setNodesFilters(newNodesFilters)
                        }}
                        className="m-t-10"
                        placeholder={t('selectProperty')}
                      />
                    </div>

                    <div className="p-field p-col-12 m-t-20">
                      <label htmlFor={inputTextId}>{t('searchString')}</label>
                      <InputText
                        id={inputTextId}
                        value={nodesFilters[index].value}
                        placeholder={t('searchString')}
                        onChange={(e) => {
                          const newFilter = {
                            ...nodesFilters[index],
                            value: e.target.value
                          }

                          setNodesFilters([
                            ...nodesFilters.slice(0, index),
                            newFilter,
                            ...nodesFilters.slice(index + 1)
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

        <Button
          ariaLabel={t('removeFilter')}
          tooltip={t('showFilteredNodes')}
          className="nodes-filter-button m-t-30"
          disabled={nodesFilters.length < 2}
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => setFilteredNodes({
            updateStoreValue,
            nodesFilters,
            t
          })}
        />
      </div>
    </>
  )
}

NodesFilter.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  annotationProperties
}) => ({
  annotationProperties
})

export default connect(
  mapToProps,
  actions
)(NodesFilter)
