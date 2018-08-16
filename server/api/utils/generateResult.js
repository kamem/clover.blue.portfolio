import _ from 'lodash'

export const generateResult = ([
  [updatedEntries, createdEntries],
  savedTags,
  removedEntries,
  removedTags
]) => ({
  updatedEntries,
  createdEntries,
  savedTags,
  removedEntries,
  removedTags: _.chain(removedTags).map('name').value()
})
