import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function signInLoadMainData(email) {
  const q1 = query(collection(db, "Client"), where("client_email", "==", email))
  const docSnap1 = await getDocs(q1);
  const numberOfDocuments1 = docSnap1.size;
  let user
  if (numberOfDocuments1 > 0) {
    docSnap1.forEach(async (docum) => {
      user = {
        role: 'КЛИЕНТ',
        id: String(docum.data().client_id),
        name: String(docum.data().client_name),
        surname: String(docum.data().client_surname),
        sex: String(docum.data().client_sex),
        login: String(docum.data().client_login),
        heigth: Number(docum.data().client_heigth),
        weight: Number(docum.data().client_weight),
        couchId: String(docum.data().client_couchId),
      }
    })
  } else {
    const q2 = query(collection(db, "Couch"), where("couch_email", "==", email))
    const docSnap2 = await getDocs(q2);
    docSnap2.forEach(async (docum) => {
      user = {
        role: 'ТРЕНЕР',
        id: String(docum.data().couch_id),
        name: String(docum.data().couch_name),
        surname: String(docum.data().couch_surname),
        sex: String(docum.data().couch_sex),
        login: String(docum.data().couch_login),
        heigth: Number(docum.data().couch_heigth),
        weight: Number(docum.data().couch_weight),
        couchId: '',
      }
    })
  }
  return user
}
