const axios = require(`axios`);
async function friendsList() {
    const result = await axios.get(`/user/friends`).then((res) => res.data);
    return result;
}
export default friendsList;