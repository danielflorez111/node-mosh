console.log('Before');

getUser(1, user => {
    console.log(user);

    getRepositories(user.username, repos => {
        console.log(repos);
    });
});

console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from db...');
        callback({ id: id, username: 'danielflorez111' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Getting repos...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}