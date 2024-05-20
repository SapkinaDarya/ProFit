import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function loadDishes(id) {
	const q1 = query(collection(db, "Dishes"), where("dishes_userId", "==", id))
	const docSnap1 = await getDocs(q1)
	let dishes = []
	docSnap1.forEach(async (docum) => {
		dishes.push({
			name: docum.data().dishes_name,
			callDish: docum.data().dishes_cal,
			bDish: docum.data().dishes_b,
			gDish: docum.data().dishes_g,
			uDish: docum.data().dishes_u,
			nowDate: docum.data().dishes_date,
			type: docum.data().dishes_type
		})
	})
	return dishes
}