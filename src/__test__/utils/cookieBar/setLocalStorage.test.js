import setLocalStorage from '../../../utils/cookieBar/setLocalStorage'

describe('setLocalStorage', () => {
  it('should return false', () => {
    expect(setLocalStorage({
      name: 'test',
      value: null
    })).toEqual(false)
  })

  it('should set local storage', async () => {
    const setItem = jest.fn()
    Storage.prototype.setItem = setItem

    await setLocalStorage({
      name: 'test',
      value: true
    })

    expect(setItem).toHaveBeenCalledWith(
      'test', 'true'
    )
  })
})
