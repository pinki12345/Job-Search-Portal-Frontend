import axios from 'axios'

// const backendUrl = process.env.REACT_APP_BASE_URL;
 const backendUrl = import.meta.env.VITE_BASE_URL;

export const login =async({email,password}) => {
    try{
         const reqUrl= "https://job-search-portal-backend.onrender.com/api/v1/login";
         
         const response = await axios.post(reqUrl, {email,password});
         return response;
    }
    catch(err){
        console.error(err);
    }
}

export const signup = async({name,email,password,mobile,agreedToTerms}) => {
    try{
         const reqUrl= `${backendUrl}/signup`;
         const response = await axios.post(reqUrl, {name,email,password,mobile,agreedToTerms});
         return response.data;
    }
    catch(err){
        console.error(err);
    }
}