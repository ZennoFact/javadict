'use strict'

var remote = require('remote');
var fileUtil = remote.require('./lib/fileUtil');
var baseDir = process.cwd();

// TODO:マークダウンをBowerにからnpmでのインストールに変更する？
console.log(marked('I am using __markdown__.'));

var ngModule = angular.module('javaDict', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
  });

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
