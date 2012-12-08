var config = module.exports;

config["predicatejs tests"] = {
    rootPath: "./",
    environment: "browser",
    sources: [
        "lib/**/*.js"
    ],
    tests: [
        "test/predicate_arrays_test.js"
    ]
};