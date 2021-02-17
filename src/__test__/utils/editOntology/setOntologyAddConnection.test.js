/* eslint max-len:0 */
import setOntologyAddConnection from '../../../utils/editOntology/setOntologyAddConnection'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyAddConnection'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import showNotification from '../../../utils/showNotification'
import en from '../../../i18n/en'
import { LABEL_PROPERTY } from '../../../constants/graph'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import setEdgeStylesByProperty from '../../../utils/networkStyling/setEdgeStylesByProperty'
import { generatePredicateId } from '../../../constants/functions'

jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/showNotification')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/networkStyling/setEdgeStylesByProperty')

const setStoreState = jest.fn()
const t = (id) => en[id]

describe('setOntologyAddConnection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when node exists', async () => {
    const selectedElementProperties = {
      from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      predicate: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
      to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    }

    getEdge.mockImplementationOnce(() => ({ id: '123' }))

    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      addedConnections: [],
      stylingNodeCaptionProperty: LABEL_PROPERTY,
      nodesConnections: {
        [selectedElementProperties.from]: [],
        [selectedElementProperties.to]: []
      },
      triplesPerNode: {
        [selectedElementProperties.from]: [],
        [selectedElementProperties.to]: []
      },
      edgesConnections: {
        [selectedElementProperties.predicate]: []
      }
    }))

    await setOntologyAddConnection({
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Connection already exists: http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    const selectedElementProperties = {
      from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      predicate: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
      to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    }

    getEdge.mockImplementationOnce(() => null)

    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      addedConnections: [],
      stylingNodeCaptionProperty: LABEL_PROPERTY,
      triplesPerNode: {
        [selectedElementProperties.from]: [],
        [selectedElementProperties.to]: []
      },
      nodesConnections: {
        [selectedElementProperties.from]: [],
        [selectedElementProperties.to]: []
      },
      edgesConnections: {
        [selectedElementProperties.predicate]: []
      }
    }))

    await setOntologyAddConnection({
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(addEdge).toHaveBeenLastCalledWith({
      predicate: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
      from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      id: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'Selected in',
      owlAnnotationProperties: { 'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Causality', 'http://www.w3.org/2004/02/skos/core#definition': 'Relationship that specifies when or where another Entity has been chosen.' },
      rdfAbout: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
      rdfsLabel: 'Selected in',
      rdfsSubPropertyOf: ['http://webprotege.stanford.edu/RD3fuHtzxeYkMf46qK7HAsD'],
      skosComment: null,
      skosDefinition: 'Relationship that specifies when or where another Entity has been chosen.',
      to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
    })

    expect(setNodeStyle.mock.calls).toEqual([
      [
        { nodeId: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY' }
      ],
      [
        { nodeId: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M' }
      ]
    ])

    expect(setEdgeStylesByProperty).toHaveBeenCalledWith({
      edgeId: generatePredicateId(selectedElementProperties)
    })

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
