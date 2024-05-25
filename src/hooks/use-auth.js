import { useSelector } from 'react-redux'

export function useAuth() {
  const {id} = useSelector(state => state.user);
  return {
    isAuth: !!id,
  }
}
