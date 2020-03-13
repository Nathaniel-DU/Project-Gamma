const axios = require(`axios`);

function friendsList() {
    let friends;
    axios.get(`/user/friends`)
        .then(res => {
            console.log(res.data);
            friends = res.data;
        });
    console.log(friends);
    return new Promise((resolve, reject) => resolve(axios.get(`/user/friends`).then(res => res.data)))
    // const friends = ["Billy", "Brian"]
}

export default friendsList;


