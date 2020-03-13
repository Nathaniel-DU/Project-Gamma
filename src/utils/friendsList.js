

function friendsList() {
    const friends = [{ name: "Billy", location: "Mexico" }, { name: "Bradley", location: "United States" }];
    return new Promise((resolve, reject) => resolve(friends))
}

export default friendsList;


