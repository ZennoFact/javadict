'use strict'

var glob = require('glob');
var path = require('path');
var fs = require('fs');

var fileUtil = {
  fetchContentList: function (baseDir, callback) {
    glob('markdowns/*.md',  function (err, matches) {
      if(err) {
        callback(err, null);
        return;
      }
      callback(null, matches.map(function (filename){
        var split = filename.split('/');
        var fileNames = [];
        split.filter(elem => {
          return elem !== ('markdowns');
        }).forEach(elem => {
          fileNames.push(elem.split('.md')[0]);
        });
        // for (var i = split.length - 1; i >= 0; i--) {
        //   if(split[i] === 'markdowns') break;
        //   fileNames.push(split[i].split('.md')[0]);
        // }
        return {
          filepath: path.join(baseDir, filename),
          name: fileNames.join('/')
        };
      }));
    });
  },
  getAsText: function (filename) {
    return fs.readFileSync(filename, 'utf-8');
  },
  fetchReadmeList: function (callback) {
    glob('markdowns/*.md', function (err, matches) {
      if(err) {
        callback(err, null);
        return;
      }
      callback(null, matches);
    });
  }
};

module.exports = fileUtil;