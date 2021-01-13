const getEdge = ({
  from,
  predicate,
  to,
  objectPropertiesFromApi,
  classesFromApi
}) => {
  const edgeUniqueId = `${predicate}___${from}___${to}`
  const edgeLabel = objectPropertiesFromApi[predicate].rdfsLabel
  const fromObject = classesFromApi[from]
  fromObject.id = from
  fromObject.label = fromObject.rdfsLabel
    ? fromObject.rdfsLabel.replace(/ /g, '\n') : ''

  const fromLabel = fromObject.rdfsLabel
  const toObject = classesFromApi[to]
  toObject.id = to
  toObject.label = toObject.rdfsLabel
    ? toObject.rdfsLabel.replace(/ /g, '\n') : ''

  const toLabel = toObject.rdfsLabel

  const edgeConnection = {
    from,
    fromLabel,
    to,
    toLabel,
  }

  const edge = {
    ...edgeConnection,
    label: edgeLabel,
    edgeId: predicate,
    id: edgeUniqueId
  }

  return ({
    edgeUniqueId,
    edgeConnection,
    edge,
    fromObject,
    toObject
  })
}

export default getEdge
