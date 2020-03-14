const axios = require(`axios`);

function friendsList() {
    let friends;
    axios.get(`/user/friends`)
        .then(res => {
            friends = res.data;
        });
    return new Promise((resolve, reject) => resolve(axios.get(`/user/friends`).then(res => res.data)))
}

export default friendsList;


