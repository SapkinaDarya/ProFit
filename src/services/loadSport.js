import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function loadSport(id) {
  const q1 = query(collection(db, "Workout"), where("workout_userId", "==", id))
  let sports = []
  let exercises
  const docSnap1 = await getDocs(q1)
  docSnap1.forEach(async (docum) => {
    if (docum.data().workout_done === false){
      exercises = []
      docum.data().workout_exercises.map(item => {
        exercises.push({
          name: item.name,
          repetitions: item.repetitions,
          sets: item.sets,
          done: item.done,
        })
      })
      sports.push({
        id: docum.id,
        name: docum.data().workout_name,
        date: docum.data().workout_date,
        done: docum.data().workout_done,
        exercises: exercises,
      })
    }
  })
  return sports
}
