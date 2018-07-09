const fs = require('fs');
const tmp = require('tmp')

module.exports = function(filename, newFirstLine, cb) {
  tmp.file(function _tempFileCreated(err, path, fd, cleanup) {
    if (err) return cb(err)

    var firstLineRemoved = false;
    var writeFile = path

    const file = fs.createReadStream(filename, 'utf8');
    const file2 = fs.createWriteStream(writeFile)
    file2.write(newFirstLine)
    file.on('data', (chunk) => {
      if (!firstLineRemoved) {
        let index = chunk.indexOf('\n');

        if (index >= 0) {

          file2.write(chunk.substr(index + 1));
          firstLineRemoved = true;
        }
      } else {
        file2.write(chunk);
      }

    });
    file.on('end', () => {
      file2.end()

    })
    file2.on('finish', () => {
      fs.rename(writeFile, filename, function(err) {
        if (err) {
          console.log("error on temp file rename", writeFile, "->", filename, err)
          cleanup()
          return cb(err)
        }
        cleanup()
        return cb(null);
      })
    })
  })
}

function generateRando(len) {
  if (typeof len != "number") len = 12
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
