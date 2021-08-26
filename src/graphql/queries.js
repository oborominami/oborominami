/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      college
      image
      dzagaku
      nanido
      keisiki
      good
      manzokudo
      kansou
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        college
        image
        dzagaku
        nanido
        keisiki
        good
        manzokudo
        kansou
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
