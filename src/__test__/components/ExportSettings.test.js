import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ExportSettings from '../../components/ExportSettings'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
  }

  const component = shallow(<ExportSettings {...props} />)

  return {
    component,
    props
  }
}

describe('ExportSettings', () => {
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
