'use strict'

var remote = require('remote');
var fileUtil = remote.require('./lib/fileUtil');
var baseDir = process.cwd();

var ngModule = angular.module('javaDict', []);

ngModule.controller('MainController', function($scope) {
  var main = this;

  main.getFile = function(file) {
    console.log(file.filepath);
    main.fileText = fileUtil.getAsText(file.filepath);
  };

  fileUtil.fetchContentList(baseDir, function(err, fileList) {
    if (err) console.error(err);
    fileList.forEach(elem => {
      console.log(elem.filepath);
      console.log(elem.name);
    });
    $scope.$apply(function() {
      main.fileList = fileList;
    });
  });
});

ngModule.directive('mdPreview', function() {
  return function($scope, $elem, $attrs) {
    $scope.$watch($attrs.mdPreview, function(source) {
      $elem.html(marked(source));
    });
  };
});

// fileUtil.fetchReadmeList(function(err, matches) {
//   if(!err) document.write(matches.join());
// });
