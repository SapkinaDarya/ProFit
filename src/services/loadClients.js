import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function loadClients(id) {
  const q1 = query(collection(db, "Client"), where("client_couchId", "==", id))
  const docSnap1 = await getDocs(q1)
  let clients = []
  docSnap1.forEach(async (docum) => {
    clients.push({
      client_login: docum.data().client_login,
      client_id: docum.data().client_id,
    })
  })
  return clients
}
