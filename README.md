Foxcode Calendar

SUMMARY

This application is a calendar/event planner. You will start at the Login page, at which point you will need to enter a username and a password.
Since you do not have an account already, you must click the "Register" hyperlink and fill out the form. If the process finishes successfully, you will be redirected to the Login page.
Once you have logged in, it would be a good idea to add a few event categories, such as School and Work for example. Once this is done, you are free to add, modify, and delete events; the
calendar will update automatically as you use the application. Three views are available : monthly, weekly, and daily, and you can choose to filter out categories by clicking
on the checkboxes in the list at the top right. As expected, clicking on the logout button will redirect you to the Login page.


DEPENDENCIES

Bootstrap
AngularJS
jQuery
FullCalendar
ExpressJS
NodeJS
Node-orm2
MySQL


GETTING STARTED

1. Install and start a webserver (we use Apache)

2. Install database supported by Node-orm2 (we use MySQL)

3. Create a database called "FoxCode"

4. Browse to ./Backend/app.js and change line 44 "config.set('db_host', 'mysql://root:root@localhost:8889/FoxCode');" with your information

5. Start ./Backend/app.js with nodeJS. This should automatically create the database tables.

6. Browse to localhost:{port}/FoxCode/Frontend/app/#/login

7. Enjoy!
