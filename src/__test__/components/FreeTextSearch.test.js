import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DataSet } from 'vis-data'
import FreeTextSearch from '../../components/FreeTextSearch'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'

const setup = () => {
  const props = {
    availableEdges: new DataSet([{ id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB' }]),
    availableEdgesNormalised: {
      'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___abc___edf': {
        id: '123___abc___edf',
        edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB'
      }
    },
    availableNodes: new DataSet([{
      id: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
      color: 'ffffff'
    }]),
    classesFromApi: OwlClasses,
    edgesIdsToDisplay: [
      'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU'
    ],
    freeTextSelection: {
      'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n': 'node',
      'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay': 'edge',
      'http://webprotege.stanford.edu/Rr60siMdu9IEvdag4DhF7M': 'node',
    },
    freeTextSelectedElement: 'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
    network: {
      focus: jest.fn()
    },
    nodesIdsToDisplay: [],
    objectPropertiesFromApi: OwlObjectProperties,
    removeFromObject: jest.fn(),
    setStoreState: jest.fn(),
  }

  const component = shallow(<FreeTextSearch {...props} />)

  return {
    component,
    props
  }
}

describe('FreeTextSearch', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
