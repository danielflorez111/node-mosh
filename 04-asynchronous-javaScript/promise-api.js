const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Operation 1');
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Operation 2');
        resolve(2);
    }, 3000);
});

const p3 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Operation 3');
        resolve(3);
    }, 5000);
});

// All
Promise.all([p1, p2, p3]).then(result => {
    console.log('All 3 promises were resolved: ', result);
});

// Race
Promise.race([p1, p2, p3]).then(result => {
    console.log('All 3 promises were resolved: ', result);
});