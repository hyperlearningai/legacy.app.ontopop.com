import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgesSelectionDetails from '../../components/EdgesSelectionDetails'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'

const setup = () => {
  const props = {
    edgesConnections: [{
      from: 'http://webprotege.stanford.edu/R9BdIrtS5xNdcAPHLf4JaEE',
      predicate: 'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM',
      to: 'http://webprotege.stanford.edu/Rf8re1EdmLU47EIlLtCpzx'
    }],
    objectPropertiesFromApi: OwlObjectProperties,
    edgeId: 'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM'
  }

  const component = shallow(<EdgesSelectionDetails {...props} />)

  return {
    component,
    props
  }
}

describe('EdgesSelectionDetails', () => {
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
