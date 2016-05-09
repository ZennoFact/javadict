'use strict'

var remote = require('remote');
var fileUtil = remote.require('./lib/fileUtil');
var baseDir = process.cwd();

var ngModule = angular.module('javaDict', ['ngMaterial'])

ngModule.controller('MainController', function($scope) {
  var main = this;

  // 初期画面の設定
  main.fileText = fileUtil.getAsText("description.md");

  main.getFile = function(file) {
    file.isSelected = true;
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
