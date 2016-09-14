/*
    uaEnter directive works to bind functions when the parent element is in focus,
    and the enter key is pressed on it. This is useful for form submissions stuff.
    Use it like this: <input type='text' ua-enter='myFunction()'/>
*/

// Make a directive called uaEnter or ua-enter
angular.module('uaEnterDirective', []).directive('uaEnter', function () {
    return  {
        scope: {
            ngModel: "=",
            callThing: "="
        },

        link: function (scope, element, attrs) {

        // Listen for the "enter" key to be pressed on the parent element
        element.bind("keydown keypress", function (event) {

            // If it's the enter key...
            if(event.which == 13) {

                // Do the function that gets passed in
                scope.$apply(function (){
                    scope.$eval(attrs.uaEnter);
                });

                event.preventDefault();
            }
        })
    }
}});