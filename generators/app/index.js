'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();
    this.log(yosay(
      'Bienvenido al ' + chalk.red('generator-ed-grid') + "!"
      ));

    var prompts = [{
      type: 'list',
      name: 'features',
      message: 'Seleccione la version de ed-grid a utilizar',
      //choices : ['version en css','version en sass']
      choices: [
      {name: 'Version en sass (recomendada)', value:'includeSass', default: true},
      {name: 'Version en css', value:'includeCss', default: false}
      ]
    }];

    return this.prompt(prompts).then(function (props) {
       //To access props later use this.props.someAnswer;
      var features = props.features;
      this.hasFeature = function(feat) { return features.indexOf(feat) !==-1; }

      this.includeSass = this.hasFeature('includeSass');
      this.includeCss  = this.hasFeature('includeCss');

      done();
    }.bind(this));
  },

  writing: function () {

    if (this.hasFeature('includeCss')) {
      this.directory( this.templatePath('css'), this.destinationPath('css'));
      this.fs.copy( this.templatePath('css/ed-grid.css'), this.destinationPath('css/ed-grid.css'));
      this.fs.copy( this.templatePath('css/ed-grid.min.css'), this.destinationPath('css/ed-grid.min.css'));
    }
    else {
      this.fs.copy( this.templatePath('package.json'), this.destinationPath('package.json'));
      this.fs.copy( this.templatePath('index.html'), this.destinationPath('index.html'));
      this.fs.copy( this.templatePath('gulpfile.babel.js'), this.destinationPath('gulpfile.babel.js'));

      this.fs.copy( this.templatePath(".babelrc"), this.destinationPath(".babelrc"));
      this.fs.copy( this.templatePath(".editorconfig"), this.destinationPath(".editorconfig"));
      this.fs.copy( this.templatePath("README.md"), this.destinationPath("README.md"));

      //this.directory( this.templatePath('css'), this.destinationPath('css'));

      this.directory( this.templatePath('scss'), this.destinationPath('scss'));
      this.directory( this.templatePath('js'), this.destinationPath('js'));
    }
  },

  install: function () {
    if (this.hasFeature('includeSass')) this.npmInstall();
  }
});
