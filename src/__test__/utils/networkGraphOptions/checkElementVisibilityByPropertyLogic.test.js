import checkElementVisibilityByPropertyLogic from '../../../utils/networkGraphOptions/checkElementVisibilityByPropertyLogic'

const element = {
  rdfsLabel: 'Traffic Signal',
}

describe('checkElementVisibilityByPropertyLogic', () => {
  it('should work correctly if no element property', async () => {
    const filter = {
      operation: 'contains',
      property: 'test',
      value: 'test',
    }

    expect(checkElementVisibilityByPropertyLogic({
      filter,
      element
    })).toEqual(false)
  })

  it('should work correctly if contains and false', async () => {
    const filter = {
      operation: 'contains',
      property: 'rdfsLabel',
      value: 'test',
    }

    expect(checkElementVisibilityByPropertyLogic({
      filter,
      element
    })).toEqual(false)
  })

  it('should work correctly if contains', async () => {
    const filter = {
      operation: 'contains',
      property: 'rdfsLabel',
      value: 'sig',
    }

    expect(checkElementVisibilityByPropertyLogic({
      filter,
      element
    })).toEqual(true)
  })

  it('should work correctly if not contains and true', async () => {
    const filter = {
      operation: 'notContains',
      property: 'rdfsLabel',
      value: 'test',
    }

    expect(checkElementVisibilityByPropertyLogic({
      filter,
      element
    })).toEqual(true)
  })

  it('should work correctly if not contains', async () => {
    const filter = {
      operation: 'notContains',
      property: 'rdfsLabel',
      value: 'sig',
    }

    expect(checkElementVisibilityByPropertyLogic({
      filter,
      element
    })).toEqual(false)
  })

  it('should work correctly if equal and false', async () => {
    const filter = {
      operation: 'equal',
      property: 'rdfsLabel',
      value: 'sig',
    }

    expect(checkElementVisibilityByPropertyLogic({
      filter,
      element
    })).toEqual(false)
  })

  it('should work correctly if equal', async () => {
    const filter = {
      operation: 'equal',
      property: 'rdfsLabel',
      value: 'Traffic Signal',
    }

    expect(checkElementVisibilityByPropertyLogic({
      filter,
      element
    })).toEqual(true)
  })

  it('should work correctly if not equal', async () => {
    const filter = {
      operation: 'notEqual',
      property: 'rdfsLabel',
      value: 'sig',
    }

    expect(checkElementVisibilityByPropertyLogic({
      filter,
      element
    })).toEqual(true)
  })

  it('should work correctly if not equal and false', async () => {
    const filter = {
      operation: 'notEqual',
      property: 'rdfsLabel',
      value: 'Traffic Signal',
    }

    expect(checkElementVisibilityByPropertyLogic({
      filter,
      element
    })).toEqual(false)
  })
})
