var config = module.exports;

config["predicate.js tests"] = {
    rootPath: "./",
    environment: "browser",
    sources: [
        "lib/**/*.js"
    ],
    tests: [
        "test/predicate_objects_test.js"
        //"test/predicate_arrays_test.js"
    ]
};