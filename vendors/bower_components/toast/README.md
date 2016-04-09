toast 1.2.7
===========

Toast is a tiny resource loader for JS and CSS files.

Install
-------

You can pick the minified library or install it with :

```
npm install pyrsmk-toast
bower install toast
jam install pyrsmk-toast
```

Features
--------

Toast has been designed to avoid FOUC issues when loading stylesheets on-the-fly since yepnope (or other libraries) didn't seem to handle this well. Of course, it could load scripts and it's tested against all major browsers versions.

Syntax
------

There's a big thing to have in mind: resources are loaded asynchronous until a callback is encountered. That said, let's dig in it. The library accept as many parameters as you want of the following types: a string (a resource's URL), an array (a resource's URL and a loading validation callback) or a function (an arbitrary callback).

But some examples are better to understand the whole thing:

```javascript
// Load one css file for mobiles
toast('css/mobiles.css');

// Load several resources for desktops
if(screen.width > 800) {
    toast(
        'css/screens.css',
        'js/modernizr.js',
        'js/classie.js'
    );
}

// Launch a callback when the CSS has been downloaded, and another when scripts have been downloaded too
toast(
    'css/screens.css',
    function() {
        log('screens.css downloaded');
    },
    'js/modernizr.js',
    'js/classie.js',
    function() {
        log('modernizr & classie downloaded');
    }
);
```

Sometimes, on some browsers, scripts are not parsed yet when we want to use them (like calling a function from that script). To resolve that issue, toast provides a simple way. You need to provide an array with the resource and a validation callback. The loading process will continue when the validation callback will return a `true` value (a `false` value can be `false`, an empty string, `null`, `undefined`, etc).

```javascript
toast(
    'css/screens.css',
    ['js/modernizr.js',function() {
		return window.Modernizr;
	}],
    ['js/classie.js',function() {
		return window.IE;
	}],
    function() {
        log('All scripts are fully loaded');
    }
);
```

License
-------

Licensed under the [MIT license](http://dreamysource.mit-license.org).
