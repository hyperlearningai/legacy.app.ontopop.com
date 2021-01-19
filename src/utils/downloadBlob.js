const downloadBlob = async ({
  blob,
  fileName
}) => {
  const element = document.createElement('a')
  element.href = URL.createObjectURL(blob)
  element.download = fileName
  element.id = 'output'
  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)

  return element
}

export default downloadBlob
