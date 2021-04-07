import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EntrySearch from '../../components/EntrySearch'

const setup = () => {
  const props = {
    updateStoreValue: jest.fn(),
    annotationProperties: [{
      value: 'rdfAbout',
      label: 'rdfAbout'
    }],
    advancedSearchFilters: [{
      value: 'name',
      label: 'road'
    }],
    dataTypeSearch: 'any',
    upperOntologySearch: 'any',
  }

  const component = shallow(<EntrySearch {...props} />)

  return {
    component,
    props
  }
}

describe('EntrySearch', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
