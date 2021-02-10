import validateGraphVersionFile from '../../../utils/versioning/validateGraphVersionFile'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'

describe('validateGraphVersionFile', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be false if key missing', async () => {
    const graphVersion = {
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      classesFromApiBackup: OwlClasses,
      objectPropertiesFromApiBackup: OwlObjectProperties,
      deletedNodes: ['test'],
      addedNodes: [],
      deletedEdges: [],
      addedEdges: [],
      updatedEdges: [],
      deletedConnections: [],
      addedConnections: [],
    }

    const isValid = validateGraphVersionFile({
      graphVersion
    })

    expect(isValid).toEqual(false)
  })

  it('should be false if object key is not an object', async () => {
    const graphVersion = {
      classesFromApi: 'OwlClasses',
      objectPropertiesFromApi: OwlObjectProperties,
      classesFromApiBackup: OwlClasses,
      objectPropertiesFromApiBackup: OwlObjectProperties,
      deletedNodes: ['test'],
      addedNodes: [],
      updatedNodes: ['id123'],
      deletedEdges: [],
      addedEdges: [],
      updatedEdges: [],
      deletedConnections: [],
      addedConnections: [],
    }

    const isValid = validateGraphVersionFile({
      graphVersion
    })

    expect(isValid).toEqual(false)
  })

  it('should be false if object key is missing minimal low level properties', async () => {
    const graphVersion = {
      classesFromApi: {
        'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': {
          rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          // rdfsLabel: 'Communication Document',
          skosDefinition: 'Document storing the information conveyed between two or more parties.',
          skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
          skosExample: null,
          owlAnnotationProperties: {
            'http://www.w3.org/2004/02/skos/core#definition': 'Document storing the information conveyed between two or more parties.',
            'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Communications',
            'http://www.w3.org/2004/02/skos/core#comment': 'A communication will typically have the Licence Holder (Highways England) as one of the parties.'
          },
          rdfsSubClassOf: [{
            classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
            owlRestriction: null
          }, {
            classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
              classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
            }
          }]
        }
      },
      objectPropertiesFromApi: OwlObjectProperties,
      classesFromApiBackup: OwlClasses,
      objectPropertiesFromApiBackup: OwlObjectProperties,
      deletedNodes: [{ test: 'test' }],
      addedNodes: '[]',
      updatedNodes: ['id123'],
      deletedEdges: [],
      addedEdges: [],
      updatedEdges: [],
      deletedConnections: [],
      addedConnections: [],
    }

    const isValid = validateGraphVersionFile({
      graphVersion
    })

    expect(isValid).toEqual(false)
  })

  it('should be false if array key is not an array', async () => {
    const graphVersion = {
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      classesFromApiBackup: OwlClasses,
      objectPropertiesFromApiBackup: OwlObjectProperties,
      deletedNodes: ['test'],
      addedNodes: '[]',
      updatedNodes: ['id123'],
      deletedEdges: [],
      addedEdges: [],
      updatedEdges: [],
      deletedConnections: [],
      addedConnections: [],
    }

    const isValid = validateGraphVersionFile({
      graphVersion
    })

    expect(isValid).toEqual(false)
  })

  it('should be false if array key values are not all strings', async () => {
    const graphVersion = {
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      classesFromApiBackup: OwlClasses,
      objectPropertiesFromApiBackup: OwlObjectProperties,
      deletedNodes: [{ test: 'test' }],
      addedNodes: '[]',
      updatedNodes: ['id123'],
      deletedEdges: [],
      addedEdges: [],
      updatedEdges: [],
      deletedConnections: [],
      addedConnections: [],
    }

    const isValid = validateGraphVersionFile({
      graphVersion
    })

    expect(isValid).toEqual(false)
  })

  it('should be valid', async () => {
    const graphVersion = {
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      classesFromApiBackup: OwlClasses,
      objectPropertiesFromApiBackup: OwlObjectProperties,
      deletedNodes: ['test'],
      addedNodes: [],
      updatedNodes: ['id123'],
      deletedEdges: [],
      addedEdges: [],
      updatedEdges: [],
      deletedConnections: [],
      addedConnections: [],
    }

    const isValid = validateGraphVersionFile({
      graphVersion
    })

    expect(isValid).toEqual(true)
  })
})
