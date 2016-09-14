/*
    uaLogo directive for putting a fancy watermark in the cornerl
    Use it like this: <input type='text' ua-enter='myFunction()'/>
*/

// Make a directive called uaEnter or ua-enter
angular.module('uaLogoDirective', []).directive('uaLogo', function () {
    return  {
        scope: {
            // @ Because we're passing in a plain string not a model attribute
            position: "@"
        },

        template: '<img ng-src="https://www.underarmour.com/static/media/header/logo.png" style="height:50px; width:50px; position:fixed; {{styleString}}"/>',

        link: function (scope, element, attrs) {

            // Determine which corner our dude should hang out in
            if(attrs.position == "bottomLeft") {
                scope.styleString = "bottom:0px; left:0px;";
            } else if(attrs.position == "bottomRight") {
                scope.styleString = "bottom:0px; right:0px;";   
            } else if(attrs.position == "topRight") {
                scope.styleString = "top:0px; right:0px;";   
            } else if(attrs.position == "topLeft") {
                scope.styleString = "top:0px; left:0px;";   
            }
    }
}});