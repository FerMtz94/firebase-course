import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore"

export const showDocuments = (querySnapshot: QuerySnapshot<DocumentData>) => {
  const documents: any[] = []
  querySnapshot.forEach((record: QueryDocumentSnapshot<DocumentData>) => {
    documents.push({
      id: record.id,
      ...record.data(),
    })
  })
  return documents
}
