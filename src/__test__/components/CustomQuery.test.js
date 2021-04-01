import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CustomQuery from '../../components/CustomQuery'

const setup = ({ customQueryOutput }) => {
  const props = {
    customQueryOutput,
    customQueryStringHistory: ['q.v()'],
    updateStoreValue: jest.fn(),
  }

  const component = shallow(<CustomQuery {...props} />)

  return {
    component,
    props
  }
}

describe('Custom Query', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no customQueryOutput ', () => {
    const {
      component
    } = setup({
      customQueryOutput: undefined
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when customQueryOutput ', () => {
    const {
      component
    } = setup({
      customQueryOutput: '{ items: [] }'
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
