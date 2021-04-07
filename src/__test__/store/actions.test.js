import { OPERATION_TYPE_ARRAY_DELETE, OPERATION_TYPE_OBJECT_ADD, OPERATION_TYPE_PUSH_UNIQUE } from '../../constants/store'
import actions from '../../store/actions'

describe('Actions', () => {
  it('updateStoreValue should work correctly when single key and objectAdd type', () => {
    const keys = [
      'parent',
    ]
    const value = { b: '2' }
    const type = OPERATION_TYPE_OBJECT_ADD

    const state = {
      parent: {
        a: '1'
      }
    }

    const newState = {
      parent: {
        a: '1',
        b: '2'
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when single key and pushUnique type and value existing', () => {
    const keys = [
      'parent',
    ]
    const value = 'two'
    const type = OPERATION_TYPE_PUSH_UNIQUE

    const state = {
      parent: ['one', 'two', 'three']
    }

    const newState = {
      parent: ['one', 'two', 'three']
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when single key and pushUnique type', () => {
    const keys = [
      'parent',
    ]
    const value = 'three'
    const type = OPERATION_TYPE_PUSH_UNIQUE

    const state = {
      parent: ['one', 'two']
    }

    const newState = {
      parent: ['one', 'two', 'three']
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when single key and arrayDelete type', () => {
    const keys = [
      'parent',
    ]
    const value = 'two'
    const type = OPERATION_TYPE_ARRAY_DELETE

    const state = {
      parent: ['one', 'two', 'three']
    }

    const newState = {
      parent: ['one', 'three']
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

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

  it('updateStoreValue should work correctly when multikey and arrayDelete type', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = 'two'

    const type = OPERATION_TYPE_ARRAY_DELETE

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: ['one', 'two', 'three']
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
          subchild: ['one', 'three']
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multikey and arrayDelete type and no subkey', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = 'two'

    const type = OPERATION_TYPE_ARRAY_DELETE

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: 'test',
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multikey and pushUnique type and value existing', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = 'one'

    const type = OPERATION_TYPE_PUSH_UNIQUE

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: ['one'],
          subchild: ['one'],
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: ['one'],
          subchild: ['one'],
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multikey and pushUnique type and value not existing', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = 'two'

    const type = OPERATION_TYPE_PUSH_UNIQUE

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: ['one'],
          subchild: ['one'],
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: ['one'],
          subchild: ['one', 'two'],
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })

  it('updateStoreValue should work correctly when multi key and objectAdd type', () => {
    const keys = [
      'parent',
      'child',
      'subchild'
    ]
    const value = { b: '2' }
    const type = OPERATION_TYPE_OBJECT_ADD

    const state = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: ['one'],
          subchild: {
            a: '1'
          },
        }
      }
    }

    const newState = {
      parent: {
        otherChild: 'test',
        child: {
          otherSubchild: ['one'],
          subchild: {
            a: '1',
            b: '2'
          },
        }
      }
    }

    expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
  })
})
