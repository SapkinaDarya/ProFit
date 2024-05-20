import { createSlice } from "@reduxjs/toolkit";

const saveUserToLocalStorage = (exercise) => {
	try {
		const serializedExercise = JSON.stringify(exercise);
		localStorage.setItem("exercise", serializedExercise);
	} catch (error) {
		console.error("Ошибка при сохранении пользователя в локальное хранилище:", error);
	}
};

const initialState = {
	exercise: []
}

const exSlice = createSlice({
	name: 'exercise',
	initialState,
	reducers: {
		setExs(state){
			state.exercise = [];
			saveUserToLocalStorage(state)
		},
		removeExs(state){
			state.exercise = [];
			localStorage.removeItem("exercise")
		},
		addEx(state,action) {
			state.exercise.push ({
				name: action.payload.name,
				repetitions: action.payload.repetitions,
				sets: action.payload.sets,
				done: action.payload.done,
			})
			saveUserToLocalStorage(state)
		},
		removeEx(state,action) {
			state.exercise = state.exercise.filter(
				item => item.name !== action.payload.name && 
				item.repetitions !== action.payload.repetitions &&
				item.sets !== action.payload.sets
			)
			saveUserToLocalStorage(state)
		}
	}
})

export const { setExs, removeExs, addEx, removeEx } = exSlice.actions;
export default exSlice.reducer;