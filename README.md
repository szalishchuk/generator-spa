# generator-spa [![Build Status](https://secure.travis-ci.org/szalishchuk/generator-spa.png?branch=master)](https://travis-ci.org/szalishchuk/generator-spa)


## Features

- workflow automation with grunt
- webserver based on node.js http module
- less/sass compiling
- live reload
- dependency management with bower
- launch of the app in the emulator or a real device (android/iOS)
- build for distribution
- webapp: minified and concatenated sources (package.js and package.less)
- android: create .apk file with minified sources
- iOS: create .ipa with minified sources

- single page app boilerplate
- easy to pick-up and scalable architecture based on two entities: Pages and Modules
- based on Backbone.js MV library
- set of custom prototypes, that allow you to minify repetitiveness in your views
- modular approach based on Require.js
- underscore’s template engine
- complex routing management

- phonegap integration out the box

- powered by yeoman
- the whole framework is yeoman generator, which allows you to setup the whole thing with one terminal command
- subgenerators for page, module, view, model and collection, that will be created and wired up 


- Automatic desktop notifications for Grunt errors and warnings using Growl

- Autoprefixer integration: parses CSS and add vendor prefixes to CSS rules using values from the Can I Use. Write your CSS rules without vendor prefixes (in fact, forget about them entirely).




## Grunt tasks

### What is Grunt?

In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort.

[generator-spa](https://github.com/szalishchuk/generator-spa) will install grunt for you, so you don't even have to know what [grunt](http://gruntjs.com/) is to use it. But be sure to check out it's [Getting Started](https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md) guide.


### Installation manual


- Install node.js: Server-side javascript based on google’s V8 engine
    - go to http://nodejs.org/
    - download and install a version for your operating system

- Install yeoman: Scaffolding and workflow automation tool, that will allow you to install new components by running predefined commands
    - open the console and run ```npm install -g yo```

- Install generator-spa: Custom generator based on yeoman
    - run ```npm install -g generator-spa```

- Install grunt CLI: Workflow automation tool
    - run ```npm install -g grunt-cli```

- Install bower: Dependency manager
    - run ```npm install -g bower```


- Checkout the project
- Build and run
    - move to the project’s location
    - run ```npm install``` to install all node dependencies
    - run ```bower install``` to install all javascript dependencies
    - run ```grunt build:webapp```
    - run ```grunt run:webapp```
    - open http://localhost

## Done! By this point you should have application running on your 80 port.

#### Build webapp for production

```
$ grunt build:webapp:production
```

Builds web application's assets for these to become suitable for distribution. Basically we squeeze down all of the javascript files with templates into a single file called package.js. The very same thing happens to less files, they end up being a part of the one and only package.css file. We also smartly process the index.html file for it to include dependencies based on new environment and copy everything we've generated to the target directory.

By the end of the day we get the following structure:

```
-dist
--webapp
---images
----*all images from app/images*
---scripts
----package.js
---styles
----package.css
---index.html
```

These assets can be used for production deployment on an ftp or cloud service, and will be hosted by the application server of your choice. They will be also used as a code base for a phonegap application, in fact, if you run any task for building a mobile application, it will run this task first to get all of the assets and only then do it's own magic.




A generator for [Yeoman](http://yeoman.io).


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-spa from npm, run:

```
$ npm install -g generator-spa
```

Finally, initiate the generator:

```
$ yo spa
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
