import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function loadCouchLogin(id) {
	if (id){
		const docRef1 = doc(db, "Couch", id);
		const docSnap1 = await getDoc(docRef1);
		return docSnap1.data().couch_login;
	}
	else
		return ''
}