import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function loadCoop(id, role) {
  let coop
  let coops = []
  if (role === 'КЛИЕНТ') {
    const q1 = query(collection(db, 'RequestsForCooperation'), where('client_id', "==", id))
    const docSnap1 = await getDocs(q1)
    docSnap1.forEach(async (docum) => {
      if (!docum.data().client_answ){
        coop = {
          client_id: id,
          client_login: docum.data().client_login,
          couch_id: docum.data().couch_id,
          couch_login: docum.data().couch_login,
          client_answ: false,
          couch_answ: true,
          request_id: docum.id,
        }
        coops.push(coop)
      }
    })
  } else {
    const q1 = query(collection(db, 'RequestsForCooperation'), where('couch_id', "==", id))
    const docSnap1 = await getDocs(q1)
    docSnap1.forEach(async (docum) => {
      if (!docum.data().couch_answ){
        coop = {
          client_id: docum.data().client_id,
          client_login: docum.data().client_login,
          couch_id: id,
          couch_login: docum.data().couch_login,
          client_answ: true,
          couch_answ: false,
          request_id: docum.id,
        }
        coops.push(coop)
      }
    })
  }
  return coops
}
