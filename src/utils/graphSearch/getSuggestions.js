/**
 * Get search suggestions
 * @param  {Object}   params
 * @param  {String}   params.query                  Search query
 * @param  {Array}    params.suggestions            Available suggestions
 * @param  {Function} params.setSuggestions         Set suggestions function
 * @return { undefined }
 */
const getSuggestions = ({
  query,
  suggestions,
  setSuggestions
}) => {
  const newSuggestions = suggestions.slice()

  const firstSuggestion = {
    label: query,
    value: query
  }

  if (newSuggestions[0]) {
    newSuggestions[0] = firstSuggestion
  } else {
    newSuggestions.push(firstSuggestion)
  }

  setSuggestions(newSuggestions)
}

export default getSuggestions
