const formidable = require('formidable');
const Tesseract = require('tesseract.js')
var fs = require('fs');
var pdf2img = require('pdf2img');
const upload_path = "Storage/fileOCR";
const mainController = {
    index(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write(' Welcome to about us page');
        res.end();
    },
    upload(req, res) {
        var images = []
        var texts = []
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            let file = files.file;
            console.log(file.name.split(".")[1]);
            let extension = file.name.split(".")[1];
            
            var oldpath = file.path;
            var newpath = upload_path + "/" + file.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                /* res.write('File uploaded and moved!');
                res.end(); */
            });
            if (extension == "pdf") {
                pdf2img.setOptions({
                    type: 'png',
                    size: 1024,
                    density: 600,
                    outputdir: upload_path,
                    outputname: 'test',
                    page: null,
                    quality: 100
                });
                pdf2img.convert(newpath, function (err, info) {
                    if (err) {
                        console.log("error");
                        console.log(err);
                    } else {
                        info.message.forEach(element => {
                            Tesseract.recognize(element.path, 'eng', { logger: m => console.log(m) }).then(({ data: { text } }) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'text/plain');
                                res.write(text);
                                res.end();
                            })
                        });
                    }
                });
            }else if(extension == "JPEG" || "jpeg" || "PNG" || "png" || "GIF" || "gif"){
                Tesseract.recognize(newpath, 'eng', { logger: m => console.log(m) }).then(({ data: { text } }) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.write(text);
                    res.end();
                })
            }
            
        });
    }
}

function convert(text) {
    var output="";
    var input = text;
    for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output;
}
function OCR(img) {
    var output="";
    var input = text;
    for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output;
}
module.exports = mainController