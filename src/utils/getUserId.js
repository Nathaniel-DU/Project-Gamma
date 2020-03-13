import axios from 'axios';

function getUserId(){
    axios.get(`/user/getuserid`)
        .then(res => {
            if(res){
                return res;
            }
        })
        .catch(err => console.log(err));
}


export default getUserId;