const axios = require(`axios`);

function profileData() {
    return new Promise((resolve, reject) => resolve(axios.get(`/user/profile`).then(res => res.data)));
}

export default profileData;
