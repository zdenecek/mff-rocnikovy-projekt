
function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports = { choose };