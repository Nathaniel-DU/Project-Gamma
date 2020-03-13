import axios from 'axios';

function isAuthenticated(){
    axios.get(`/auth/isauthenticated`)
        .then(res => {
            if(res.data === true){
                return true;
            }else{
                return false;
            }
        })
        .catch(err => console.log(err));
}

export default isAuthenticated;