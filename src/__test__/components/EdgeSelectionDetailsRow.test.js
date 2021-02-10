import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgesSelectionDetails from '../../components/EdgesSelectionDetails'

const setup = () => {
  const props = {
    connection: {
      from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      predicate: 'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM',
      to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    },
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
