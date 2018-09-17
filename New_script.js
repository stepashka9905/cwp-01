var path = process.argv[2];
var array =[]; //выыод стр

var fs = require('fs');

var data = "var fs = require('fs');\n" +
    "fs.readdir(path.resolve(_dirname, 'settings.json'), function (err, items) {\n" +
    "    for (let i = 0; i < items.length; i++) {\n" +
    "        console.log(items[i]);\n" +
    "    }\n" +
    "}"

fs.writeFile(path, data, function(err){if (err) console.log("ERROR");})


//----------------
fs.open(fname, "w+", 0644, function(err, file_handle) {
    if (!err) {
        fs.write(file_handle, fname, null, 'ascii', function(err, written) {
            if (!err) {
                console.log("Текст успешно записан в файл");
            } else {
                console.log("Произошла ошибка при записи");
            }
        });
    } else {
        console.log("Произошла ошибка при открытии");
    }
});
/-----------------
var fs = require('fs')
var file = process.argv[2]

fs.writeFile(file, function (err, contents) {
    var lines = contents.toString().split('\n').length - 1
    console.log("Кол-во переносов: "+lines)
    console.log(contents.toString())
})