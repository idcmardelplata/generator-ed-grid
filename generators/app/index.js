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

    //var prompts = [{
      //type: 'list',
      //name: 'features',
      //message: 'Seleccione la version de ed-grid a utilizar',
      //choices: [
      //{name: 'Version en sass con soporte para babel (recomendada)', value:'includeSass', default: true},
      //{name: 'Version sass', value:'includeWithoutBabel', default: false},
      //{name: 'Version en css', value:'includeCss', default: false}
      //]
    //}];

    var prompts = [
    { type: 'input', name: 'name', message: 'Nombre del proyecto?: ', default: this.appname },
    { type: 'list', name: 'features', message: 'seleccione la version que desea utilizar',
      choices:[
        { name: 'Utilizar con Sass', value: 'includeSass', default: true },
        { name: 'Solo Css', value: 'includeCss' }
      ]
    },
    {
      type: 'list', name: 'engines', message: 'Seleccione el sistema de templates a utilizar',
      choices: [
      {name: 'Jade', value: 'includeJade', default:true },
      {name: 'Handlebars', value: 'includeHandlebars', default:false },
      {name: 'Html puro', value: 'includeHtml', default:false },
      ]
    },
    {type: 'checkbox', name: 'includeExtras', message: 'Seleccione algunas herramientas extras' , default: false,
      choices: [
      { name: 'Incluir babel', value: 'includeBabel', checked: false },
      { name: 'Incluir Bourbon', value: 'includeBourbon', checked: false },
      { name: 'Incluir archivos de test', value: 'includeTest', checked: false },
      { name: 'Incluir documentacion', value: 'includeDoc', checked: true }
      ]},
    {type: 'confirm', name: 'todoOk', message: 'Listo para generar el proyecto?'}
    ];

    return this.prompt(prompts).then(function (props) {
       //To access props later use this.props.someAnswer;
      //var features = props.features;
      //this.hasFeature = function(feat) { return features.indexOf(feat) !==-1; }

      //this.includeSass = this.hasFeature('includeSass');
      //this.includeCss  = this.hasFeature('includeCss');
      //this.includeWithoutBabel = this.hasFeature('includeWithoutBabel');

      //this.copyFile = function(file) {
        //this.fs.copy( this.templatePath(file), this.destinationPath(file));
      //}
      //this.copyDir = function(dir) {
        //this.directory( this.templatePath(dir), this.destinationPath(dir));
      //}

      //done();
      this.log(this.props.name);

      done();
    }.bind(this));
  },

  writing: function () {

    if (this.includeCss) {
      this.copyDir('css');
      this.copyFile('css/ed-grid.css');
      this.copyFile('css/ed-grid.min.css');
    }
    else if(this.includeWithoutBabel) {
      this.copyFile('gulpfile.js');
      this.copyFile('index.html');
      this.copyFile('README.md');
      this.copyDir('scss');
      this.copyDir('js');
      this.fs.copyTpl(
          this.templatePath('package.json'), 
          this.destinationPath('package.json'),{
            includeBabel : false
          });
    }
    else if(this.includeSass) {
      this.fs.copyTpl(
          this.templatePath('package.json'), 
          this.destinationPath('package.json'),{
            includeBabel : true
          });

      this.copyFile('index.html');
      this.copyFile('gulpfile.babel.js');
      this.copyFile('.babelrc');
      this.copyFile('.editorconfig');
      this.copyFile('README.md');
      this.copyDir('scss');
      this.copyDir('js');
    }
  },

  install: function () {
    if (!this.includeCss) this.npmInstall();
  }
});
