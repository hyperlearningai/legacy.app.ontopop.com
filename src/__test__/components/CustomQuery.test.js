import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgesSelection from '../../components/EdgesSelection'

const setup = ({ customQueryOutput }) => {
  const props = {
    customQueryOutput,
    customQueryStringHistory: ['q.v()'],
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromArray: jest.fn(),
  }

  const component = shallow(<EdgesSelection {...props} />)

  return {
    component,
    props
  }
}

describe('EdgesSelection', () => {
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
