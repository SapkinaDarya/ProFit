import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const compareDates = (a, b) => {
  const dateA = new Date(`${a.date.split('.')[1]}.${a.date.split('.')[0]}.${a.date.split('.')[2]}`);
  const dateB = new Date(`${b.date.split('.')[1]}.${b.date.split('.')[0]}.${b.date.split('.')[2]}`);
  return dateA - dateB;
};

export async function loadMessage(id) {
  const q1 = query(collection(db, "Message"), where("mes_clientId", "==", id))
  const docSnap1 = await getDocs(q1)
  let message = []
  docSnap1.forEach(async (docum) => {
    message.push({
      date: docum.data().mes_date,
      text: docum.data().mes_text
    })
  })
  message.sort(compareDates)
  return message
}
