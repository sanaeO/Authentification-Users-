import axios from "axios"

// 
const API_URL = "/api/users"

// Register User : 
 const register = async(userData) => {
    // axios.post(url , data )
    const response = await axios.post(API_URL , userData)
    
 
    if(response.data)
    {
        //Les données stockées dans le localStorage n'ont pas de délai d'expiration
        localStorage.setItem("user" , JSON.stringify(response.data))
    }
    return response.data
} 

// 
 const login = async(userData) => {
    // axios.get(url )
    const response = await axios.post(API_URL + 'login' , userData)
    
     if(response.data)
     {
         //Les données stockées dans le localStorage n'ont pas de délai d'expiration
         localStorage.setItem("user" , JSON.stringify(response.data))
     }
     return response.data
} 



//logout 
export const logout = () => {
    localStorage.removeItem('user')
}
// authService.logout
const authService = {
    register, 
    logout,
    login
}
export default authService
