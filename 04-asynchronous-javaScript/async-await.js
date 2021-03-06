console.log('Before');

// Promises
getUser(1)
    .then(user => getRepositories(user.username))
    .then(repos => console.log(repos));

// Async and await
async function displayRepos() {
    const user = await getUser(1);
    const repos = await getRepositories(user.username);
    console.log('Async and await', repos);
}
displayRepos();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from db...');
            resolve({ id: id, username: 'danielflorez111' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting repos...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}