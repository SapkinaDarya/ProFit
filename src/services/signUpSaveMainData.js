import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

export async function signUpSaveMainData(email, name, surname, sex, heigth, weight, clientTrainer, login, id) {
	if (String(clientTrainer).toUpperCase() === 'КЛИЕНТ'){
		console.log('Клиент')
		await setDoc(doc(db, "Client", id), {
			client_id: id,
			client_name: name,
			client_sex: sex,
			client_surname: surname,
			client_heigth: heigth,
			client_weight: weight,
			client_login: login,
			client_email: email,
			client_couchId: ''
		})
	}
	else {
		await setDoc(doc(db, "Couch", id), {
			couch_id: id,
			couch_name: name,
			couch_surname: surname,
			couch_sex: sex,
			couch_heigth: heigth,
			couch_weight: weight,
			couch_login: login,
			couch_email: email
		})
	}
}
