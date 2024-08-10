var environment;
(function (environment) {
    environment["Local"] = "QA";
    environment["Development"] = "Dev";
    environment[environment["Staging"] = 1] = "Staging";
    environment[environment["Production"] = 2] = "Production";
})(environment || (environment = {}));
function runtest(envTest) {
    console.log("Environment to test: ".concat(envTest));
}
runtest(environment.Local);
runtest(environment.Development);
runtest(environment.Staging);
runtest(environment.Production);
