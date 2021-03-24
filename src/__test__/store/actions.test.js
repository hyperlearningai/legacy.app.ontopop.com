// import { DataSet } from 'vis-data'
import actions from '../../store/actions'

describe('Actions', () => {
  it('updateStoreValue should work correctly when single key and add type', () => {
    const keys = [
      'parent',
    ]
    const value = 1
    const type = 'add'

    const state = {
      parent: 1
    }

    const newState = {
      parent: 2
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when single key and push type', () => {
    const keys = [
      'parent',
    ]

    const value = 'new'
    const type = 'push'

    const state = {
      parent: []
    }

    const newState = {
      parent: ['new']
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when single key and toggle type', () => {
    const keys = [
      'parent',
    ]

    const value = 'new'
    const type = 'toggle'

    const state = {
      parent: ['old', 'new']
    }

    const newState = {
      parent: ['old']
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when single key and update type', () => {
    const keys = [
      'parent',
    ]

    const value = 'new'
    const type = 'update'

    const state = {
      parent: 'old'
    }

    const newState = {
      parent: value
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multi key and push type', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = 'new'
    const type = 'push'

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: []
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: ['new']
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multi key and push type', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = 'new'
    const type = 'push'

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: []
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: ['new']
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multi key and toggle type', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = 'new'
    const type = 'toggle'

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: ['old', 'new']
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: ['old']
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multi key and delete type', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const type = 'delete'

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: 'new'
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test'
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multi key and add type', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = 1
    const type = 'add'

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: 1
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: 2
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multi key and update type', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = {
      subsubchild: 'test'
    }
    const type = 'update'

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: 1
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: value
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })
})
