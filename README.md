# generator-spa [![Build Status](https://secure.travis-ci.org/szalishchuk/generator-spa.png?branch=master)](https://travis-ci.org/szalishchuk/generator-spa)


Features:
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
