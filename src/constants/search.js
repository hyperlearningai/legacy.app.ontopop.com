export const DISPLAYED_RESULTS_PER_PAGE = 10
export const DISPLAYED_PAGE_NUMBERS_ON_PAGINATOR = 7

export const ADVANCED_SEARCH_TEMPLATE = {
  property: '',
  value: ''
}

export const ENUMERATION_PROPERTIES = [
  'name',
  'Subdomain',
  'Business Area'
]

export const PROPERTY_ODATA_FILTER_MAPPING = {
  'Business Area': 'business_area',
  'Data Source': 'source',
  Subdomain: 'subdomain',
  Type: 'item_type',
}

export const PROPERTYIES_TO_EXCLUDE_FROM_ADVANCED_SEARCH = [
  'Subdomain',
  'rdfAbout',
  'synonyms',
  'upperOntology',
  'skosExample',
]
