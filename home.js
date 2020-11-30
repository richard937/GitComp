const client_id = '';
const client_secret = '';


let followers = [];
let followings = [];

async function getUser(user) {

    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);

    const profile = await profileResponse.json();

    return {
        profile
    };
}

async function getFollowers(user) {
    const response = await fetch(`https://api.github.com/users/${user}/followers`);

    const result = await response.json();

    return {
        result
    };
}

async function getFollowings(user) {
    const response = await fetch(`https://api.github.com/users/${user}/following`);

    const result = await response.json();

    return {
        result
    };
}

const showAlert = (data) => {
    //clearAlert();

    const alert = document.getElementById(`${data}`);
    alert.style.display = "block";

    // Timeout after 3 secs
    setTimeout(() => {
        clearAlert(data);
    }, 3000);
}

// Clear Alert message
const clearAlert = (data) => {

    const alert = document.getElementById(`${data}`);
    alert.style.display = "none";
}

const printCommonElements = () => {

    let res = followers.filter(x => followings.includes(x));
    let output = "";
    res.forEach((data, ind) => {
        output += (ind + ".  " + data + "<br>");
    });

    const result = document.getElementById('result');
    result.innerHTML = output;
    result.style.display = "block";
}


const getData = (e) => {
    // Get input text

    const user = e.previousElementSibling.value;
    const parent = e.parentNode;

    console.log(user);

    if (user !== '') {
        // Make HTTP call
        getUser(user)
            .then(data => {

                if (data.profile.message === 'Not Found') {
                    // Show alert
                    showAlert("danger");

                } else {
                    // Show alert
                    showAlert("success");

                    if (e.id == "user1") {
                        getFollowers(user)
                            .then(data => {

                                let array = data.result;
                                array.forEach(element => {
                                    followers.push(element.login);
                                });

                                //console.log(followers);
                            })

                    } else {
                        getFollowings(user)
                            .then(data => {

                                let array = data.result;
                                array.forEach(element => {
                                    followings.push(element.login);
                                });

                                //console.log(followings);
                            })
                    }
                }
            })
    } else {

        console.log("no user");
    }
}




