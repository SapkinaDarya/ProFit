import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    if (serializedUser === null) {
      return undefined;
    }
    return JSON.parse(serializedUser);
  } catch (error) {
    console.error("Ошибка при загрузке пользователя из локального хранилища:", error);
    return undefined;
  }
};

const saveUserToLocalStorage = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem("user", serializedUser);
  } catch (error) {
    console.error("Ошибка при сохранении пользователя в локальное хранилище:", error);
  }
}

const initialState = loadUserFromLocalStorage() || {
  role: null,
  id: null,
  name: null,
  surname: null,
  sex: null,
  login: null,
  email: null,
  heigth: null,
  weight: null,
  couchId: null,
  couchLogin: null,
  coop: [],
  clients: [],
  water: 0,
  dishes: [],
  sport: [],
  message: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state,action) {
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.sex = action.payload.sex;
      state.login = action.payload.login;
      state.email = action.payload.email;
      state.heigth = action.payload.heigth;
      state.weight = action.payload.weight;
      state.couchId = action.payload.couchId;
      state.couchLogin = action.payload.couchLogin;
      state.coop = action.payload.coop;
      state.clients = action.payload.clients;
      state.water = action.payload.water;
      state.dishes = action.payload.dishes;
      state.sport = action.payload.sport;
      state.message = action.payload.message;
      saveUserToLocalStorage(state)
    },
    removeUser(state) {
      state.role = null;
      state.id = null;
      state.name = null;
      state.surname = null;
      state.sex = null;
      state.login = null;
      state.email = null;
      state.heigth = null;
      state.weight = null;
      state.couchId = null;
      state.couchLogin = null;
      state.coop = [];
      state.clients = [];
      state.water = 0;
      state.dishes = [];
      state.sport = [];
      state.message = [];
      localStorage.removeItem("user");
    },
    changeMainData(state, action) {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.heigth = action.payload.heigth;
      state.weight = action.payload.weight;
      saveUserToLocalStorage(state);
    },
    removeCoop(state, action) {
      state.coop = state.coop.filter(coopItem => coopItem.request_id !== action.payload.request_id);
      saveUserToLocalStorage(state);
    },
    setCouch(state, action) {
      state.couchId = action.payload.couchId;
      state.couchLogin = action.payload.couchLogin;
      saveUserToLocalStorage(state);
    },
    addClient(state, action) {
      state.clients.push({
        client_login: action.payload.client_login,
        client_id: action.payload.client_id,
      })
      saveUserToLocalStorage(state);
    },
    removeClient(state, action) {
      state.clients = state.clients.filter(coopItem => coopItem.client_id !== action.payload.client_id);
      saveUserToLocalStorage(state);
    },
    addWaterMl(state,action) {
      state.water = Number(state.water) + Number(action.payload);
      saveUserToLocalStorage(state);
    },
    addDish(state,action) {
      state.dishes.push({
        name: action.payload.name,
        callDish: action.payload.callDish,
        bDish: action.payload.bDish,
        gDish: action.payload.gDish,
        uDish: action.payload.uDish,
        nowDate: action.payload.nowDate,
        type: action.payload.type
      })
      saveUserToLocalStorage(state);
    },
    addSport(state,action) {
      state.sport.push({
        id: action.payload.id,
        name: action.payload.name,
        date: action.payload.date,
        exercises: action.payload.exercises,
        done: action.payload.done,
      })
      saveUserToLocalStorage(state);
    },
    setDoneExercise(state,action){
      const sportIndex = state.sport.findIndex(sport => sport.id === action.payload.sportId);
      if (sportIndex !== -1) {
        state.sport[sportIndex].exercises[action.payload.exerciseIndex].done = action.payload.done;
      }
    },
    removeDoneWorkout(state,action){
      state.sport = state.sport.filter(sport => sport.id !== action.payload.id);
      saveUserToLocalStorage(state);
    }
  }
})

export const { removeDoneWorkout, setDoneExercise, addSport, setUser, removeUser, changeMainData, addClient, setCouch, removeCoop, removeClient, addWaterMl, addDish} = userSlice.actions;
export default userSlice.reducer;
