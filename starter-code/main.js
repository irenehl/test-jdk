async function getUsername({ username }) {
    const response = await fetch(`https://api.github.com/users/${username}`)

    const user = await response.json();
    console.log(user);
}


const test = getUsername("octacat")
console.log(test);

const user = document.querySelector('#input')
console.log(user);
