import actions from '../../store/actions'

describe('Actions', () => {
  it('updateGraphData should work correctly', () => {
    const state = {
      graphData: {
        'graph-0': {
          label: 'Main'
        }
      }
    }

    const graphId = 'graph-1'
    const value = {
      label: 'graph-1'
    }

    const newState = {
      graphData: {
        'graph-0': {
          label: 'Main'
        },
        'graph-1': {
          label: 'graph-1'
        }
      }
    }

    expect(actions.updateGraphData(state, graphId, value)).toEqual(newState)
  })

  it('removeFromObject should work correctly', () => {
    const state = {
      graphData: {
        'graph-0': {
          label: 'Main'
        }
      }
    }

    const id = 'graph-0'

    const newState = {
      graphData: {}
    }

    expect(actions.removeFromObject(state, 'graphData', id)).toEqual(newState)
  })

  it('removeFromArray should work correctly', () => {
    const state = {
      selectedNodes: [0.123]
    }

    const id = '123'

    const newState = {
      selectedNodes: []
    }

    expect(actions.removeFromArray(state, 'selectedNodes', id)).toEqual(newState)
  })

  it('addToArray should work correctly', () => {
    const state = {
      selectedNodes: []
    }

    const id = '123'

    const newState = {
      selectedNodes: ['123']
    }

    expect(actions.addToArray(state, 'selectedNodes', id)).toEqual(newState)
  })

  it('setStoreState should work correctly', () => expect(actions.setStoreState({ field: '' }, 'field', 'value')).toEqual({
    field: 'value'
  }))
})
