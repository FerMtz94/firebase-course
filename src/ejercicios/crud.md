# Ejercicios de firebase v9

## Importación de métodos de firebase/firestore

    import {
        collection,
        addDoc,
        updateDoc,
        doc,
        setDoc,
        deleteDoc,
        onSnapshot,
        where,
        query,
        getDocs,
        orderBy,
        limit,
        startAfter,
        endBefore
    } from "firebase/firestore"

## Un objeto para añadir a una base de usuarios

    const user = {
        name: "Susana",
        active: false,
        birthDate: 0,
        salario: 3650,
    }

<br>

## Referencia a la colección de documentos (firebase v9)

    const usersCollection = collection(db, "users")

<br>

## Insertion of data

    const insertUser = async () => {
        const addDocument = await addDoc(usersCollection, user)
    }

> `insertUser()`

<br>

## Updating of data

    const updateUser = async () => {
        const documentRef = doc(db, "users/gRSUsOaAQKm4xHQ31LaC")
        const updateDocument = await updateDoc(documentRef, {
            active: false,
        })
    }

> `updateUser()`

<br>

## Setting of data (destructive)

    const setUser = async () => {
        const documentRef = doc(db, "users/gRSUsOaAQKm4xHQ31LaC")
        const setDocument = await setDoc(documentRef, {
            active: false,
        })
    }

> `setUser()`

<br>

## Deletion of data

### delete from users where id = '???'

    const deleteUser = async () => {
        const documentRef = doc(db, "users/gRSUsOaAQKm4xHQ31LaC")
        const deleteDocument = await deleteDoc(documentRef)
    }

> `deleteUser()`

<br>

## Retrieval of data

### select \* from users

    const selectUsers = async () => {
        const querySnapshot = await getDocs(usersCollection)
        const users = showDocuments(querySnapshot)
        console.log(users)
    }

> `selectUsers()`

### select with observable pattern

    function selectUsersWithSnapshot() {
        onSnapshot(usersCollection, (snapshot) => {
            for (const doc of snapshot.docs) {
                console.log(doc.data())
            }
        })
    }

> `selectUsersWithSnapshot()`

<br>

## Selection with conditions

### Select \* from usuarios where campo = valor

    async function whereActive() {
        const q = query(usersCollection, where("active", "==", true))
        const querySnapshot = await getDocs(q)
        console.log(showDocuments(querySnapshot))
    }

> `whereActive()`

    async function whereSalary() {
        const q = query(usersCollection, where("salario", ">", 1800))
        const querySnapshot = await getDocs(q)
        console.log(showDocuments(querySnapshot))
    }

> `whereSalary()`

### Select \* from usuarios where campo between valor1 and valor2

    async function whereSalaryAnd() {
        const q = query(
            usersCollection,
            where("salario", ">=", 1800),
            where("salario", "<=", 2300)
        )
        const querySnapshot = await getDocs(q)
        console.log(showDocuments(querySnapshot))
    }

> `whereSalaryAnd()`

    async function whereSalaryAndBoolean() {
        const q = query(
            usersCollection,
            where("salario", ">=", 1800),
            where("active", "==", true)
        )
        const querySnapshot = await getDocs(q)
        console.log(showDocuments(querySnapshot))
    }

> `whereSalaryAndBoolean()`

<br/>

## Ordering selections

### Order users by their name

    async function orderByName() {
        const q = query(usersCollection, orderBy("name", "desc"))
        const querySnapshot = await getDocs(q)
        console.log(showDocuments(querySnapshot))
    }

> `orderByName()`

### Order users by their name and salary

    async function orderByNameWithIndex() {
        const q = query(
        usersCollection,
        orderBy("name", "asc"),
        orderBy("salario", "asc")
        )
        const querySnapshot = await getDocs(q)
        console.log(showDocuments(querySnapshot))
    }

> `orderByNameWithIndex()`

<br/>

## Limit Rows

```
    const limitRows = async () => {
        const q = query(usersCollection, limit(3))
        const querySnapshot = await getDocs(q)
        console.log(showDocuments(querySnapshot))
    }
```

> `limitRows()`

<hr/>
<br/>

## Pagination example

```
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
```
