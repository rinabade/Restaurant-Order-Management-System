export default function useToken() {  
  
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);


    return userToken?.token ? userToken.token : null 
  };
  
   const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  };

  return {
    setToken: saveToken,
    getToken: getToken
  }
}
