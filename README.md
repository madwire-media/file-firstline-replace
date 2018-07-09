# file-firstline-replace
Replace the first line of a file with something else.

# Use case
If you need to replace the first line in a file, this module will allow you to do that. Particularly built for CSVs, https://github.com/madwire-media/lets-make-csvs, but you can use it for anything.

# Installation

```bash
npm install file-firstline-replace
```

# Usage
```javascript
var filename = "thing.csv"
var newHeader = `"foo","bar","baz","bang"`
replaceFirstLineOfFile(filename, newHeader, function(err) {
  if (err) throw err
  /* ... */
})
```
