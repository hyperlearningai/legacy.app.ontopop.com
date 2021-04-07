import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { AutoComplete } from 'primereact/autocomplete'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import getSuggestions from '../utils/graphSearch/getSuggestions'
import searchGraph from '../utils/graphSearch/searchGraph'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const SearchBar = ({
  updateStoreValue,
  entrySearchValue,
  isSearchLoading
}) => {
  const { t } = useTranslation()

  const [suggestions, setSuggestions] = useState([])

  return (
    <>
      {
        isSearchLoading
          ? (
            <div className="graph-search-loader">
              <ProgressSpinner
                className="spinner"
                strokeWidth="4"
              />
            </div>
          ) : (
            <div className="graph-search-bar">
              <form onSubmit={(e) => {
                e.preventDefault()

                updateStoreValue(['searchPageSelected'], OPERATION_TYPE_UPDATE, 0)

                searchGraph({
                  updateStoreValue,
                })
              }}
              >
                <AutoComplete
                  name="search"
                  value={entrySearchValue}
                  id="main-search"
                  suggestions={suggestions}
                  completeMethod={(e) => {
                    const { query } = e

                    getSuggestions({
                      query,
                      setSuggestions,
                      updateStoreValue,
                      t
                    })
                  }}
                  field="label"
                  autoHighlight
                  scrollHeight="200px"
                  delay={500}
                  onSelect={(e) => {
                    const { value } = e.value

                    updateStoreValue(['searchPageSelected'], OPERATION_TYPE_UPDATE, 0)
                    updateStoreValue(['entrySearchValue'], OPERATION_TYPE_UPDATE, value)

                    searchGraph({
                      updateStoreValue,
                      t
                    })
                  }}
                  onChange={(e) => updateStoreValue(['entrySearchValue'], OPERATION_TYPE_UPDATE, e.value)}
                />
                <Button
                  icon="pi pi-search"
                  id="search-icon"
                  className="p-button-rounded"
                  onClick={() => {
                    updateStoreValue(['searchPageSelected'], OPERATION_TYPE_UPDATE, 0)

                    searchGraph({
                      updateStoreValue,
                      t
                    })
                  }}
                />
                <input
                  name="submit"
                  className="hidden"
                  type="submit"
                />
              </form>
            </div>
          )
        }
    </>
  )
}

SearchBar.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  entrySearchValue: PropTypes.string.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
}

const mapToProps = ({
  entrySearchValue,
  isSearchLoading
}) => ({
  entrySearchValue,
  isSearchLoading
})

export default connect(
  mapToProps,
  actions
)(SearchBar)
