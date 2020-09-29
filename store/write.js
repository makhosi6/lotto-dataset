const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: `__csv_files__/__results_${Date.now()}__.csv`,
    header: [
        {id: 'date', title: 'DATE'},
        {id: 'ball_one', title: 'BALL ONE'},
        {id: 'ball_two', title: 'BALL TWO'},
        {id: 'ball_three', title: 'BALL THREE'},
        {id: 'ball_four', title: 'BALL FOUR'},
        {id: 'ball_five', title: 'BALL FIVE'},
        {id: 'bonus', title: 'BONUS'},
    ]
});
 

module.exports = csvWriter;





