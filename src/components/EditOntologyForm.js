import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { InputTextarea } from 'primereact/inputtextarea'
import { orderBy } from 'lodash'
import actions from '../store/actions'

const EditOntologyForm = ({
  selectedElementProperties,
  setSelectedElementProperties,
  annotationProperties,
  operation,
  initialData,
}) => (
  <>
    {
        annotationProperties.length > 0
        && orderBy(annotationProperties.map((property) => ({
          ...property,
          search: property.value.toLowerCase()
        })), ['search'], ['asc']).map((property) => {
          const id = property.value
          const label = property.value

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
              className="edit-ontology-row"
              key={`element-property-${id}`}
            >
              <label className="form-label" htmlFor={`element-property-${id}`}>
                {label}
              </label>

              <InputTextarea
                id={`element-property-${id}`}
                value={value}
                onChange={(e) => {
                  const elementProperties = JSON.parse(JSON.stringify(selectedElementProperties))

                  elementProperties[id] = e.target.value
                  setSelectedElementProperties(elementProperties)
                }}
                placeholder={label}
              />
            </div>
          )
        })
      }
  </>
)

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
