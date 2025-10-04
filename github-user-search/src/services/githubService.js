import axios from 'axios';

export default async function fetchUserData(username){
    try{
        const response = await axios.get (`https://api.github.com/users/${username}`);
        return response.data;
    
        }
        catch (error) {
            throw error;
        }
}
