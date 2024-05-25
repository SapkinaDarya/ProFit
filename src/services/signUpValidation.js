import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function signUpValidation(email, pass, name, surname, sex, heigth, weight, clientTrainer, login) {
  let countLogin = 0
  const q1 = query(collection(db, "Client"), where("client_login", "==", String(login)));
  const querySnapshot1 = await getDocs(q1);
  querySnapshot1.forEach(() => {
    countLogin++;
  });
  const q2 = query(collection(db, "Couch"), where("couch_login", "==", String(login)));
  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach(() => {
    countLogin++;
  });
  if(!email || !pass || !name || !surname || !sex || !heigth || !weight || !clientTrainer || !login)
    return 'Не все поля заполнены'
  if ( String(clientTrainer).toUpperCase() !== "КЛИЕНТ" && String(clientTrainer).toUpperCase() !== "ТРЕНЕР")
    return 'Введите одно из двух значений (Клиент/Тренер)'
  if ( String(sex).toUpperCase() !== "М" && String(sex).toUpperCase() !== "Ж")
    return 'Введите одно из двух значений (М/Ж)'
  if (countLogin > 0)
    return 'Логин уже используется'
  if (String(pass).length < 6)
    return 'Пароль должен состоять хотя бы из 6 символов'
}
