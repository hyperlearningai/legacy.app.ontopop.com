import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import FreeTextSearch from '../../components/FreeTextSearch'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'

const setup = () => {
  const props = {
    classesFromApi: OwlClasses,
    freeTextSelection: {
      'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n': 'node',
      'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay': 'edge',
      'http://webprotege.stanford.edu/Rr60siMdu9IEvdag4DhF7M': 'node',
    },
    freeTextSelectedElement: 'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
    objectPropertiesFromApi: OwlObjectProperties,
    removeFromObject: jest.fn(),
    setStoreState: jest.fn(),
    stylingNodeCaptionProperty: 'rdfsLabel',
    stylingEdgeCaptionProperty: 'rdfsLabel',
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
