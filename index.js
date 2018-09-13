// var name = process.argv[2];
// var surname = process.argv[3];
// console.log(name);
// console.log(surname);
var a = [];
for (let i = 0;i<process.argv.length-2; i++){
    a[i] = process.argv[i+2];
    console.log(a[i]);
}
