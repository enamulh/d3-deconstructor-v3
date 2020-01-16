/**
 * Created by enamul on 6/11/2017.
 */
'use strict';
var fs = require('fs');

function searchandReplace(str,pos) {
  var previousStr = "";
  //console.log(pos, str.length);
  if(pos=== str.length-1) {
    console.log('return '+str);
    return str;
  }
  else if(pos>0){
    previousStr = str.substring(0,pos);
    str = str.substring(pos);
    //console.log(previousStr);
  }
  var n = str.search(/\".*\..*\":/i);

  if(n!=-1){
    var end = str.indexOf(":",n);
    var substring = str.substring(n, end);
    substring = substring.replace('.','_');
    var newString = previousStr + str.substring(0, n)+ substring + str.substring(n+substring.length);
    //console.log("new string:"+newString);
    return searchandReplace(newString, previousStr.length+ n + substring.length);
  }
  else return previousStr + str;
}
exports.searchandReplace = searchandReplace;



function readFilesFromADirectory(dirname, onFileContent, onError) {
  console.log(dirname);
  fs.readdir(dirname, function(err, filenames) {
    console.log('file names');
    console.log(filenames);
    if (err) {
      console.log('error occured');
      //onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      console.log('reading file '+filename);
      fs.readFileSync(dirname + filename, 'utf-8', function(err, content) {
        console.log('reading complete:'+filename);
        if (err) {
          console.log('error occured reading file');
          //onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

exports.readFilesFromADirectory = readFilesFromADirectory;
