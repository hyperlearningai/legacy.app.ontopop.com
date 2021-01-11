import actions from '../../store/actions'

describe('Actions', () => {
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
