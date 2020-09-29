const createCsvWriter = require('csv-writer').createObjectCsvWriter;

 function write(record, file){
    const csvWriter = createCsvWriter({
        path: `__csv_files__/__${file}__.csv`,
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
   csvWriter.writeRecords(record).then(() => {
    console.log('.csv file created @ ', file);
});
};

module.exports = write;



