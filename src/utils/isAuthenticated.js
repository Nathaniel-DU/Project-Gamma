const axios = require(`axios`);

function isAuthenticated() {
    return new Promise((resolve, reject) => resolve(axios.get(`/auth/isauthenticated`).then(res => res.status === 200)))
}

export default isAuthenticated;


