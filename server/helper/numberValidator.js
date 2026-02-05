function limitQueryChecker(query) {
    const allowedLimits = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return allowedLimits.includes(query);
}

module.exports = { limitQueryChecker };