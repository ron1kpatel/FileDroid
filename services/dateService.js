

const getDateMonthYear = ()=> {
    var date = new Date();

    var day = date.getDate().toString();
    var month = date.getMonth().toString();
    var year = date.getFullYear().toString();

    return day + ' ' + month + ' ' + year
}

module.exports.getDateMonthYear = getDateMonthYear; 