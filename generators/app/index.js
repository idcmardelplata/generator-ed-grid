'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('generator-ed-grid') + ' generator!'
    ));

    //var prompts = [{
      //type: 'confirm',
      //name: 'someAnswer',
      //message: 'Would you like to enable this option?',
      //default: true
    //}];

    //return this.prompt(prompts).then(function (props) {
       //To access props later use this.props.someAnswer;
      //this.props = props;
    //}.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
    this.fs.copy(
      this.templatePath('index.html'),
      this.destinationPath('index.html')
    );
    this.fs.copy(
      this.templatePath('gulpfile.babel.js'),
      this.destinationPath('gulpfile.babel.js')
    );

    this.fs.copy(
        this.templatePath(".babelrc"),
        this.destinationPath(".babelrc")
    );

    this.fs.copy(
        this.templatePath(".editorconfig"),
        this.destinationPath(".editorconfig")
    );

    this.fs.copy(
        this.templatePath("README.md"),
        this.destinationPath("README.md")
    );

    this.directory(
      this.templatePath('css'),
      this.destinationPath('css')
    );

    this.directory(
      this.templatePath('scss'),
      this.destinationPath('scss')
    );
    this.directory(
      this.templatePath('js'),
      this.destinationPath('js')
    );
  },

  install: function () {
    this.npmInstall();
    this.installDependencies();
  }
});
