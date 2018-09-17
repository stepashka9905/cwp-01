// var name = process.argv[2];
// var surname = process.argv[3];
// console.log(name);
// console.log(surname);

// 4 task
// {
//
// for (let i = 0;i<process.argv.length-2; i++){
//     console.log(process.argv[i+2]);
// }}

// 5 task
{
    const path = require('path');
    const fs = require('fs');

    if (process.argv.length < 3) {
        console.log("Error (arguments) ");
        process.exit();
    }
    if (process.argv.length > 3) {
        console.log("Error (arguments) ");
        process.exit();
    }

    const DIR_PATH = process.argv[2];
    const NEW_DIRECTORY = DIR_PATH + '\\' + path.basename(DIR_PATH);
    let prefix = "";
    const sum = fs.createWriteStream('summary.js');
    let copyright = "";

// разбор и копирование содержимого директория
    let readAndCopyDirectory = function (dir, prefix) {
        fs.readdir(dir, (err, files) => {
            if (err) {
                console.error("Error (read files) " + dir);
            } else {
                files.forEach(function (element) {
                    let new_unit = dir + '\\' + element;
                    if (fs.statSync(new_unit).isDirectory()) {
                        readAndCopyDirectory(new_unit, prefix + element + '/');
                    } else {
                        sum.write('console.log(\'' + prefix + element + '\');\n');
                        // копирование файлов с добавлением copyright
                        let new_file = `${NEW_DIRECTORY}\\${path.basename(new_unit)}`;
                        let logger = fs.createWriteStream(new_file);
                        fs.readFile(new_unit, (err, data) => {
                            if (err) console.error("Error (copy files) ")
                            else logger.write(copyright + '\n\n-------\n' + data + '\n--------\n\n' + copyright);
                        });

                    }
                }, this);
            }
        });
    }

    let createDir = function (callback) {
        // создание нового директория
        fs.access(NEW_DIRECTORY, (err) => {
            if (err && err.code == 'ENOENT') {
                fs.mkdir(NEW_DIRECTORY, (err) => {
                    if (err) console.error("Error (mkdir) ");
                });
                fs.watch(NEW_DIRECTORY, (eventType, filename) => {
                    console.log(`${eventType} - ${filename}`);
                });
            }
            else console.log("Error (mkdir) ");
        });
        // получение copyright
        fs.readFile("config.json", (err, data) => {
            if (err) console.error("Error (read .json files) ")
            else {
                copyright = JSON.parse(data).copyright;
            }
        });
        callback();
    }

    createDir(() => readAndCopyDirectory(DIR_PATH, prefix));

}
