import db from "./firebase/config"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  endBefore,
} from "firebase/firestore"
import { showDocuments } from "./helpers/show-documents"

const usersCollection = collection(db, "users")

const btnNext = document.createElement("button")
btnNext.innerText = "Next Page"
document.body.append(btnNext)

let lastDocument: DocumentData | null = null
let firstDocument: DocumentData | null = null

btnNext.addEventListener("click", () => {
  const q = query(
    usersCollection,
    orderBy("name"),
    limit(2),
    startAfter(lastDocument)
  )

  onSnapshot(q, (snap) => {
    firstDocument = snap.docs[0] || null
    lastDocument = snap.docs[snap.docs.length - 1] || null
    console.log(showDocuments(snap))
  })
})

btnNext.click()

const btnPrev = document.createElement("button")
btnPrev.innerText = "Previous Page"
document.body.append(btnPrev)

btnPrev.addEventListener("click", () => {
  const q = query(
    usersCollection,
    orderBy("name"),
    limit(2),
    endBefore(firstDocument)
  )

  onSnapshot(q, (snap) => {
    firstDocument = snap.docs[0] || null
    lastDocument = snap.docs[snap.docs.length - 1] || null
    console.log(showDocuments(snap))
  })
})
