const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error(err));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Js',
        author: 'Daniel',
        tags: ['js', 'frontend'],
        isPublished: true,
        price: 10
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        console.log(ex.message);
    }
}

async function getCourses() {
    // comparison operators
    // eq equal
    // ne not equal
    // gt greater than
    // gte grater than or equal to
    // lt less than
    // lte less than or equal to
    // in
    // nin not in

    // logical operators
    // or
    // and

    // regex
    // .find({ author: /^Daniel/ }) starts with
    // .find({ author: /Daniel$/ }) ends with
    // .find({ author: /.*Daniel.*/ }) contains


    const courses = await Course
        .find({ name: 'Angular 9' })
        // .find({ price: { $gt: 10, $lte: 20 } })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });

    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById(id);

    if (!course) return;

    course.isPublished = false;
    course.author = 'Another Author Name';
    const result = await course.save();
    console.log(result);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

createCourse();
// updateCourse('5e5594fb3881b41b18c8f697');
// removeCourse('5e5594fb3881b41b18c8f697');
getCourses();
