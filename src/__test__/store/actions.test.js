import actions from '../../store/actions'

describe('Actions', () => {
  it('setStoreState should work correctly', () => expect(actions.setStoreState({ field: '' }, 'field', 'value')).toEqual({
    field: 'value'
  }))
})
