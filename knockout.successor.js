/*
 * Successor
 *
 * Knockout binding handler that binds to a span or other element that indicates success or failure of a an action.
 *
 * Inside the view model trigger success like this: this.success(true);
 *                   and trigger failure like this: this.failure(true);
 *
 * Example with all of the defaults:
 *    <span data-bind="successor: {}"></span>
 *
 * Example without any of the defaults:
 *    <span id="status-label" class="label"
 *          data-bind="successor: {
 *            success: 'Saved successfully.', failure: 'Save failed.',
 *            successClass: 'success'       , failureClass: 'alert',
 *            inDuration: 300, delay: 300   , outDuration: 1000,
 *            animateIn: 'slideToggle', animateOut: 'fadeOut'
 *          }"></span>
 *
 *    Use with require.js like this:
 *    define(['knockout', 'knockout.successor'], function(ko) {
 *        //Do something here...
 *    });
 *
 */
(function(factory) {
	// Do the module dance.
	if (typeof define === "function" && define.amd) {
        // AMD anonymous module
        define(["knockout", "jquery"], factory);
    } else {
        // No module loader (plain <script> tag) - put directly in global namespace
        factory(window.ko, window.jQuery);
    }
})(function(ko, $) {
	ko.bindingHandlers.successor = {
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			$(element).css('display', 'none');
		},
		update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var animateElement = function(element) {
				element[values.animateIn || 'slideToggle'](values.inDuration || 300, function() {
					setTimeout(function(){
						element[values.animateOut || 'fadeOut'](values.delay || 300);
					}, values.outDuration || 1000);
				});	
            };
            
            var reset = function() {
                viewModel.success(false);
                viewModel.failure(false);
            };
            
            var values = valueAccessor();
            element = $(element);	//need to refresh the element here

			if(viewModel.success() && !viewModel.failure()) {	        	
				element.addClass(values.successClass || 'success');
				element.removeClass(values.failureClass || 'alert');
				element.text(values.success ||'Saved succesfully.');
				animateElement(element);
				reset();	
			} else if(viewModel.failure() && !viewModel.success()) {
				element.addClass(values.failureClass || 'alert');
				element.removeClass(values.successClass || 'success');
				element.text(values.failure || 'Save failed.');
				animateElement(element);
				reset();	        	
			}
		}
	};	
});
