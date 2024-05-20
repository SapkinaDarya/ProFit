import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function loadWater(id, date) {
	let water = 0;
	const q1 = query(collection(db, "Water"), where("water_id", "==", id + '-' + date))
	const docSnap1 = await getDocs(q1)
	docSnap1.forEach(async (docum) => {
		water = water + Number(docum.data().water_ml)
	})
	return water
}