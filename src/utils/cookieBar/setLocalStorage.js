/**
 * Set as local storage
 * @param  {Object} params
 * @param  {String} params.name   LocalStorage name
 * @param  {*}      params.value  LocalStorage value
 * @return { undefined }
 */
const setLocalStorage = ({
  name,
  value
}) => {
  if (value === undefined || value === null) {
    return false
  }

  localStorage.setItem(name, value.toString())
}

export default setLocalStorage
