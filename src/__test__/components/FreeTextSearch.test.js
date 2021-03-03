import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import FreeTextSearch from '../../components/FreeTextSearch'
import { classesFromApi } from '../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../fixtures/objectPropertiesFromApi'

const setup = () => {
  const props = {
    classesFromApi,
    freeTextSelection: {
      'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n': 'node',
      'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay': 'edge',
      'http://webprotege.stanford.edu/Rr60siMdu9IEvdag4DhF7M': 'node',
    },
    freeTextSelectedElement: 'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
    objectPropertiesFromApi,
    removeFromObject: jest.fn(),
    setStoreState: jest.fn(),
    globalEdgeStyling: {
      stylingEdgeCaptionProperty: 'rdfsLabel',
    },
    userDefinedEdgeStyling: {
      stylingEdgeCaptionProperty: 'rdfsLabel',
    },
    globalNodeStyling: {
      stylingNodeCaptionProperty: 'rdfsLabel',
    },
    userDefinedNodeStyling: {
      stylingNodeCaptionProperty: 'rdfsLabel',
    },
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
