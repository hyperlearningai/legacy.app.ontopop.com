import {
  OPERATION_TYPE_ADD,
  OPERATION_TYPE_PUSH,
  OPERATION_TYPE_TOGGLE,
  OPERATION_TYPE_UPDATE,
  OPERATION_TYPE_DELETE,
  OPERATION_TYPE_ARRAY_DELETE,
  OPERATION_TYPE_PUSH_UNIQUE,
  OPERATION_TYPE_OBJECT_ADD,
  OPERATION_TYPE_ARRAY_DELETE_INDEX
} from '../../constants/store'
import actions from '../../store/actions'

describe('Actions', () => {
  describe('OPERATION_TYPE_UPDATE', () => {
    it('updateStoreValue should work correctly when single key', () => {
      const keys = [
        'parent',
      ]

      const value = 'new'
      const type = OPERATION_TYPE_UPDATE

      const state = {
        parent: 'old'
      }

      const newState = {
        parent: value
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multi key', () => {
      const keys = [
        'parent',
        'child',
        'subchild'
      ]
      const value = {
        subsubchild: 'test'
      }
      const type = OPERATION_TYPE_UPDATE

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

  describe('OPERATION_TYPE_ADD', () => {
    it('updateStoreValue should work correctly when single key', () => {
      const keys = [
        'parent',
      ]
      const value = 1
      const type = OPERATION_TYPE_ADD

      const state = {
        parent: 1
      }

      const newState = {
        parent: 2
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multi key', () => {
      const keys = [
        'parent',
        'child',
        'subchild'
      ]
      const value = 1
      const type = OPERATION_TYPE_ADD

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
  })

  describe('OPERATION_TYPE_PUSH', () => {
    it('updateStoreValue should work correctly when single key', () => {
      const keys = [
        'parent',
      ]
      const value = 'two'
      const type = OPERATION_TYPE_PUSH

      const state = {
        parent: ['one', 'two']
      }

      const newState = {
        parent: ['one', 'two', 'two']
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multi key', () => {
      const keys = [
        'parent',
        'child',
        'subchild'
      ]
      const value = 'two'
      const type = OPERATION_TYPE_PUSH

      const state = {
        parent: {
          otherChild: 'test',
          child: {
            subchild: ['one', 'two']
          }
        }
      }

      const newState = {
        parent: {
          otherChild: 'test',
          child: {
            subchild: ['one', 'two', 'two']
          }
        }
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })
  })

  describe('OPERATION_TYPE_PUSH_UNIQUE', () => {
    it('updateStoreValue should work correctly when single key and not existing', () => {
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

    it('updateStoreValue should work correctly when single key and existing', () => {
      const keys = [
        'parent',
      ]
      const value = 'two'
      const type = OPERATION_TYPE_PUSH_UNIQUE

      const state = {
        parent: ['one', 'two']
      }

      const newState = {
        parent: ['one', 'two']
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multi key and not existing', () => {
      const keys = [
        'parent',
        'child',
        'subchild'
      ]
      const value = 'three'
      const type = OPERATION_TYPE_PUSH_UNIQUE

      const state = {
        parent: {
          otherChild: 'test',
          child: {
            subchild: ['one', 'two']
          }
        }
      }

      const newState = {
        parent: {
          otherChild: 'test',
          child: {
            subchild: ['one', 'two', 'three']
          }
        }
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multi key and existing', () => {
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
            subchild: ['one', 'two']
          }
        }
      }

      const newState = {
        parent: {
          otherChild: 'test',
          child: {
            subchild: ['one', 'two']
          }
        }
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })
  })

  describe('OPERATION_TYPE_TOGGLE', () => {
    it('updateStoreValue should work correctly when single key and field not existing', () => {
      const keys = [
        'parent',
      ]

      const value = 'new'
      const type = OPERATION_TYPE_TOGGLE

      const state = {
        parent: ['old']
      }

      const newState = {
        parent: ['old', 'new']
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when single key and field existing', () => {
      const keys = [
        'parent',
      ]

      const value = 'new'
      const type = OPERATION_TYPE_TOGGLE

      const state = {
        parent: ['old', 'new']
      }

      const newState = {
        parent: ['old']
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multi key and field not existing', () => {
      const keys = [
        'parent',
        'child',
        'subchild'
      ]
      const value = 'new'
      const type = OPERATION_TYPE_TOGGLE

      const state = {
        parent: {
          otherChild: 'test',
          child: {
            otherSubchild: 'test',
            subchild: ['old']
          }
        }
      }

      const newState = {
        parent: {
          otherChild: 'test',
          child: {
            otherSubchild: 'test',
            subchild: ['old', 'new']
          }
        }
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multi key and field existing', () => {
      const keys = [
        'parent',
        'child',
        'subchild'
      ]
      const value = 'new'
      const type = OPERATION_TYPE_TOGGLE

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
  })

  describe('OPERATION_TYPE_DELETE', () => {
    it('updateStoreValue should work correctly when single key', () => {
      const keys = [
        'parent',
      ]
      const type = OPERATION_TYPE_DELETE

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
        parent: undefined
      }

      expect(actions.updateStoreValue(state, keys, type)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multi key', () => {
      const keys = [
        'parent',
        'child',
        'subchild'
      ]
      const type = OPERATION_TYPE_DELETE

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
  })

  describe('OPERATION_TYPE_ARRAY_DELETE', () => {
    it('updateStoreValue should work correctly when single key', () => {
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

    it('updateStoreValue should work correctly when multikey', () => {
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
            subchild: ['one', 'two']
          }
        }
      }

      const newState = {
        parent: {
          otherChild: 'test',
          child: {
            otherSubchild: 'test',
            subchild: ['one']
          }
        }
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multikey and no subkey', () => {
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
            subchild: []
          }
        }
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })
  })

  describe('OPERATION_TYPE_ARRAY_DELETE_INDEX', () => {
    it('updateStoreValue should work correctly when single key', () => {
      const keys = [
        'parent',
      ]
      const value = 1
      const type = OPERATION_TYPE_ARRAY_DELETE_INDEX

      const state = {
        parent: ['one', 'two', 'three']
      }

      const newState = {
        parent: ['one', 'three']
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multikey', () => {
      const keys = [
        'parent',
        'child',
        'subchild'
      ]
      const value = 1

      const type = OPERATION_TYPE_ARRAY_DELETE_INDEX

      const state = {
        parent: {
          otherChild: 'test',
          child: {
            otherSubchild: 'test',
            subchild: ['one', 'two']
          }
        }
      }

      const newState = {
        parent: {
          otherChild: 'test',
          child: {
            otherSubchild: 'test',
            subchild: ['one']
          }
        }
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })

    it('updateStoreValue should work correctly when multikey and no subkey', () => {
      const keys = [
        'parent',
        'child',
        'subchild'
      ]
      const value = 1

      const type = OPERATION_TYPE_ARRAY_DELETE_INDEX

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
            subchild: []
          }
        }
      }

      expect(actions.updateStoreValue(state, keys, type, value)).toEqual(newState)
    })
  })

  describe('OPERATION_TYPE_OBJECT_ADD', () => {
    it('updateStoreValue should work correctly when single key', () => {
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

    it('updateStoreValue should work correctly when multi key', () => {
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
})
