Successor
================

![Example gif. A save button is clicked and a message appears and disappears.](https://raw.githubusercontent.com/chrishalebarnes/successor/master/example.gif?raw=true)

Successor is a [knockout](http://knockoutjs.com/) binding handler that displays the result of some action in a nearby html element. Just set ```this.success(true)``` in the view model and the element will animate in and fade away.

## Getting Started
If using [require.js](http://requirejs.org/), you can require successor like this:
```
define(['/path/to/knockout', '/path/to/knockout.successor'], function(ko) {
    //Get or define the view model and bind it
});
```

Given HTML like this:
```
<span data-bind="successor: {}"></span>
<button data-bind="click: save">Save</button>
```

And a view model like this:
```
var ViewModel = function () {
    var self = this;
    this.success = ko.observable(false);
    this.failure = ko.observable(false);

    self.save = function () {
        //Save the data, set success or failure to true
        self.success(true);
    };
};
ko.applyBindings(new ViewModel());
```

A message in the span will appear and fade out. Here are all the options:
```
<span data-bind="successor: {
                   success: 'Saved successfully.', failure: 'Save failed.',
                   successClass: 'success'       , failureClass: 'alert',
                   inDuration: 300, delay: 300   , outDuration: 1000,
                   animateIn: 'slideToggle'      , animateOut: 'fadeOut'
                 }">
</span>
```
##License and Copyright

See [LICENSE](https://github.com/chrishalebarnes/successor/blob/master/LICENSE)

