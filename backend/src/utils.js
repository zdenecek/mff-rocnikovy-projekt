
function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function only(source, keys) {
    return Object.keys(source)
        .filter(key => keys.includes(key))
        .reduce((obj, key) => {
            obj[key] = source[key];
            return obj;
        }, {});
}

module.exports = { choose, only};