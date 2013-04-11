Twitter Bootstrap + plugins

Twitter bootstrap is a front-end framework focused on the presentation end of things. It has a very long list of css classes as well as javascript implementations that make designing the client side of an application much more efficient. Datepicker, timepicker, and modal are plugins for bootstrap that help with the presentation of date input, time input, and modal windows.

This was used in our project because we needed a quick and efficient way of creating elegant views without reinventing the wheel.

License : Apache License v2.0, http://www.apache.org/licenses/LICENSE-2.0

jQuery

jQuery is a javascript library that helps interact with the Document Object Model(DOM), manage events, and manage http requests/responses among other things.

This was used in our project because it provides many efficiency improvements when interacting with the DOM.

License : MIT License, https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt


Underscore

Underscore is a library that provides support for functional programming in javascript.

We decided to use underscore in our project because it made some tasks easier, such as converting server response data into data that the presentation layer expects.

License : DocumentCloud license, https://github.com/documentcloud/underscore/blob/master/LICENSE


DateJS

DateJS is a library focused on making the manipulation of dates in javascript easier.

Our application has to manage events, so it was natural for us to make the process as easy as possible. 

License : MIT License, http://opensource.org/licenses/mit-license.php

FullCalendar

FullCalendar is a jQuery plugin that provides programmers with a calendar skeleton from which they can build from.

Creating a calendar from scratch would have been very time consuming and our application would have suffered in quality as a consequence.

License : MIT License, http://arshaw.com/js/fullcalendar-1.6.0/license.txt

AngularJS

AngularJS is a front-end framework focusing on the creation of dynamic views by letting the programmer extend the html language, by creating what they call directives, and providing 2-way binding between the views and the business logic.

We thought that this framework was very interesting, mostly because of its 2-way binding and its focus on dynamic views in html, and decided that we wanted to learn more about it. It being developed by Google developers also helped our final decision.

License : MIT License, https://github.com/angular/angular.js/blob/master/LICENSE

AngularStrap

AngularStrap defines AngularJS directives as wrappers around Bootstrap javascript classes.

We needed access to some of Bootstrap's form inputs without sacrificing the 2-way binding of angularJS. This extension was exactly what we wanted. 

License : MIT Licence, http://www.opensource.org/licenses/MIT

Express

Express is a nodeJS flexible web application framework.

We chose Express because it was simple and flexible enough to achieve what we wanted from our backend.

License : MIT License, https://github.com/visionmedia/express/blob/master/LICENSE

Connect

Connect is a middleware framework for NodeJS providing a bundle of 18 middleware and a rich selection of 3rd-party middleware.

This is a dependency that comes bundled with ExpressJS, but we ended up using its Session middleware for our authentication system.

License : MIT License, https://github.com/senchalabs/connect/blob/master/LICENSE

API-easy

A fluent (i.e. chainable) syntax for generating vows tests against RESTful APIs.

We used this library in order to test our RESTful API without the need for a client. This was useful because we developed the backend first.

License : https://github.com/flatiron/api-easy/blob/master/LICENSE

Node-orm2

Node-orm is an Object Relational Mapper for NodeJS.

We decided to use this middleware because we wanted to have a model of the data in our application. This made it much easier to manage queries since it implements a object-oriented interface to the database. It also gives us the advantage of being database agnostic.

License : Does not appear to have a license.

MySQL

We chose to use MySQL as our database because this is what we have experience with. However, this choice ended up not mattering since our model was defined in the application using the Node-orm2 middleware.

License : GPL License, http://www.gnu.org/licenses/gpl.html


