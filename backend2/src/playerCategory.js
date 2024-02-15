


function calculateYearDiff(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    return today.getFullYear() - birthDate.getFullYear();
}



function categorizePlayer(birthdate) {

    const diff = calculateYearDiff(birthdate)
    if (diff <= 13) return "U13";
    if (diff <= 16) return "U16";
    if (diff <= 21) return "U21";
    if (diff <= 26) return "U26";
    if (diff <= 28) return "U28";
    if (diff <= 31) return "U31";
    if (diff >= 65) "Senior";
    return null;
}


module.exports = { categorizePlayer };