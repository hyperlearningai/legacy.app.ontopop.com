import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { InputTextarea } from 'primereact/inputtextarea'
import { orderBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import { RDF_ABOUT_PROPERTY } from '../constants/graph'

const EditOntologyForm = ({
  selectedElementProperties,
  setSelectedElementProperties,
  annotationProperties,
  operation,
  initialData,
}) => {
  const { t } = useTranslation()

  return (
    <>
      {
        annotationProperties.length > 0
        && orderBy(annotationProperties.map((property) => ({
          ...property,
          search: property.value.toLowerCase()
        })), ['search'], ['asc']).map((property) => {
          const id = property.value
          const label = property.value
          const isRequired = property.value === RDF_ABOUT_PROPERTY

          const isValid = operation === 'add' && isRequired ? selectedElementProperties[id]?.length > 0 : true

          const initialDataValue = initialData ? (initialData[id]
            || (
              initialData
              && initialData[id]
                ? initialData[id]
                : ''
            )) : ''

          const defaultValue = operation === 'add' ? '' : initialDataValue

          const value = selectedElementProperties && (
            selectedElementProperties[id]
            || selectedElementProperties[id] === ''
          ) ? selectedElementProperties[id] : defaultValue

          return (
            <div
              className="edit-ontology-row m-t-30"
              key={`element-property-${id}`}
            >
              <label className="sidebar-main-body-label form-label" htmlFor={`element-property-${id}`}>
                {`${label}${isRequired ? ' *' : ''}`}
              </label>

              <InputTextarea
                id={`element-property-${id}`}
                value={value}
                className={!isValid ? 'p-invalid' : ''}
                // disabled={isDisabled}
                onChange={(e) => {
                  const elementProperties = JSON.parse(JSON.stringify(selectedElementProperties))

                  elementProperties[id] = e.target.value
                  setSelectedElementProperties(elementProperties)
                }}
                placeholder={label}
              />

              {
                !isValid && (
                  <small
                    id="username2-help"
                    className="p-error p-d-block"
                  >
                    {t('requiredField')}
                  </small>
                )
              }
            </div>
          )
        })
      }
    </>
  )
}

EditOntologyForm.propTypes = {
  selectedElementProperties: PropTypes.shape().isRequired,
  setSelectedElementProperties: PropTypes.func.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
  operation: PropTypes.string.isRequired,
  initialData: PropTypes.shape(),
}

EditOntologyForm.defaultProps = {
  initialData: undefined
}

const mapToProps = ({
  annotationProperties,
  classesFromApi,
}) => ({
  annotationProperties,
  classesFromApi,
})

export default connect(
  mapToProps,
  actions
)(EditOntologyForm)
