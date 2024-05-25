import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeMainDataModal: false, //окно для изменения основных данных о пользователе
  showFriendModal: false, //окно для отображения "друзей"
  addWaterModal: false, //окно для добавления воды
  chooseDishModal: false, //окно с выбором продукта
  addDishModal: false, //окно для добавления блюда в рацион
  addNewDishModal: false, //окно с добавлением новых продуктов
  createWorkoutModal: false, //окно для создания тренировки
  createExercise: false, //окно для создания упражнения
  showWorkout: false, //окно для отображения упражнений в тренировке
}

const modalActiveSlice = createSlice({
  name: 'modalActive',
  initialState,
  reducers: {
    closeAll(state){
      state.changeMainDataModal= false;
      state.showFriendModal= false;
      state.addWaterModal= false;
      state.chooseDishModal= false;
      state.addDishModal= false;
      state.addNewDishModal= false;
      state.createWorkoutModal= false;
      state.createExercise= false;
      state.showWorkout= false;
    },
    openModal(state, action){
      state[`${action.payload.name}`] = true;
    },
    closeModal(state, action){
      state[`${action.payload.name}`] = false;
    },
  }
})

export const {closeAll, closeModal, openModal} = modalActiveSlice.actions;
export default modalActiveSlice.reducer;
