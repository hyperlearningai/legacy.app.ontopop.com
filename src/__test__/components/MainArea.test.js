import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainArea from '../../components/MainArea'

const setup = ({
  currentGraph
}) => {
  const props = {
    graphData: {
      'graph-0': {
        label: 'Main',
        noDelete: true
      }
    },
    currentGraph
  }

  const component = shallow(<MainArea {...props} />)

  return {
    component,
    props
  }
}

describe('MainArea', () => {
  it('should match snapshot when currentGraph does not exists', () => {
    const {
      component
    } = setup({
      currentGraph: 'graph-1',
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when currentGraph exists', () => {
    const {
      component
    } = setup({
      currentGraph: 'graph-0',
    })
    expect(toJson(component)).toMatchSnapshot()
  })
})
