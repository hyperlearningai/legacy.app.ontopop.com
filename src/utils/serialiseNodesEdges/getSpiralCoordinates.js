/* eslint no-param-reassign:0 */

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {Object}   params.i                       Node index
 * @param  {Object}   params.availableEdges          VisJs Dataset of edges IDs
 * @param  {Object}   params.classesFromApi          Nodes from initial OwlClasses
 * @param  {Array}    params.edgesIdsToDisplay       Array of edges IDs to display
 * @param  {Array}    params.highlightedNodes        Array of nodes IDs to highlight
 * @param  {Boolean}  params.isNodeOverlay           Flag to make non-highlighted nodes transparent
 * @param  {Object}   params.network                 VisJs network object
 * @param  {Array}    params.nodesIdsToDisplay       Array of nodes IDs to display
 * @param  {Object}   params.objectPropertiesFromApi Edges from initial OwlObjectProperties
 * @param  {Function} params.setStoreState           setStoreState action
 * @param  {Object}   params.triplesPerNode          List of triples per node
 * @return { undefined }
 */
const getSpiralCoordinates = ({
  circleMax,
  padding,
  step,
  angle
}) => {
  const d = circleMax + padding

  const radius = Math.sqrt(step + 1)
  angle += Math.asin(1 / radius)
  const x = Math.cos(angle) * (radius * d)
  const y = Math.sin(angle) * (radius * d)

  return {
    x,
    y
  }
}

export default getSpiralCoordinates
