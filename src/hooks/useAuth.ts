export const useAuth = () => {

    const user_id = localStorage.getItem('user_id')
    const session_key = localStorage.getItem('session_key')

    if (!session_key || !user_id) return false

    return true

};
  