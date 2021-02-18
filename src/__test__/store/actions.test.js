import { DataSet } from 'vis-data'
import actions from '../../store/actions'

describe('Actions', () => {
  it('addSubValueToObject should work correctly', () => {
    const state = {
      graphData: {
        'graph-0': {
          label: 'Main',
          description: 'Main description'
        }
      }
    }

    const key = 'graph-0'
    const subkey = 'description'
    const value = 'New'

    const newState = {
      graphData: {
        'graph-0': {
          label: 'Main',
          description: value
        }
      }
    }

    expect(actions.addSubValueToObject(state, 'graphData', key, subkey, value)).toEqual(newState)
  })

  it('addToObject should work correctly', () => {
    const state = {
      graphData: {
        'graph-0': {
          label: 'Main'
        }
      }
    }

    const key = 'graph-0'
    const value = {
      label: 'New'
    }

    const newState = {
      graphData: {
        'graph-0': value
      }
    }

    expect(actions.addToObject(state, 'graphData', key, value)).toEqual(newState)
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

  it('removeFromArray should work correctly when selectedNodes', () => {
    const state = {
      selectedNodes: ['123'],
      availableNodes: new DataSet([{ id: '123' }])
    }

    const id = '123'

    const newState = {
      selectedNodes: []
    }

    expect(actions.removeFromArray(state, 'selectedNodes', id)).toEqual(newState)
  })

  it('removeFromArray should work correctly when selectedEdges', () => {
    const state = {
      selectedEdges: ['123'],
      availableEdges: new DataSet([{ id: '123' }])
    }

    const id = '123'

    const newState = {
      selectedEdges: []
    }

    expect(actions.removeFromArray(state, 'selectedEdges', id)).toEqual(newState)
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

  it('addToArray should work correctly with options', () => {
    const state = {
      selectedNodes: ['123']
    }

    const id = '123'

    const newState = {
      selectedNodes: ['123', '123']
    }

    expect(actions.addToArray(state, 'selectedNodes', id, { alwaysAdd: true })).toEqual(newState)
  })

  it('setStoreState should work correctly', () => expect(actions.setStoreState({ field: '' }, 'field', 'value')).toEqual({
    field: 'value'
  }))
})
