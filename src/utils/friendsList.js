const axios = require(`axios`);

function friendsList() {
    return new Promise((resolve) => resolve(axios.get(`/user/friends`).then(res => res.data)));
}

export default friendsList;


