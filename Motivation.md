After a short brainstorm Patrice put forth the idea of creating an online calendar that would allow users to login 
and create events. Once the team committed to this project idea we decided that an effective design strategy was to 
embody the user and design the app from their perspective. From here our idea took shape.

The first step was to define the user. We felt that the following pieces of data were the necessary pieces of data 
to give each user a unique record for our app: UserPK, LoginName, FirstName, LastName, Password.

Once the user was defined we needed to define the events that they would create. It had to have a start date and 
end date to define the timespan of the event and when it takes place. An event needed to have a “one liner” 
description that is short and to the point for easy identification. The event would take place at a location and 
the user would need the option to define some more details if necessary, such as required items (ie. don’t forget 
to bring your cheque book). Finally we decided to add a flag that the user could set if they deemed the event to 
be of importance, perhaps a doctors meeting or a school examination. 

After the event was defined we needed to give these events some organization and this would be accomplished by giving
an event two more pieces of data, a category and type.

The Category is a representation of which portion of the users life the event fits into, such as: Business/Work, 
Personal, School, Hobbies, Family, etc. 

The Type represents the action the user must undertake to complete the event. Examples take the form of: Meetings, 
Appointments, Pickup/DropOff, Paperwork, etc.

We now had the Database structure defined and thus we created the necessary tables (User, Event, Category, Type) in 
the SQL database. We entered a few records into each table to confirm that everything worked and also so see how the 
data would take shape and its relationships. 

It’s at this point we realized a few things:

•  This is when we actually created the Category table since it felt like the Type was not enough to organize the 
    events.
    
•	It became evident that some events had precedence over others and thus we added the “Important” bit/flag column 
    on the Event table to give certain events elevation among the rest.
    
•	We also figured that in order to deal with any concurrency issues and to keep a well-documented database we 
    decided to add the following 5 columns to every table: CreatedDate, LastChangedBy, LastChangedDate, TimeStamp. 


After the team defined the useful information that our app would store the next step was to specify the way in which 
the user could interact with the data, our UI. We discussed and created mockups of the views. For each one we defined
the main areas of the view, such as: the information displayed, the navigation options, the actions the user could 
take (Edit/Save), items on the view the user can interact with. 

“PROJECT GOALS” – since a calendar/event planner app is not exactly a new idea, our team always found that we 
went back to the user experience instead of new, revolutionary concepts. With this in mind the best way to convey 
our goals is through user expectations:

•	ACCESS: some of the events entered by users can be of a private nature. So individual logins and password 
    protection are a necessity.  

•	SIMPLICITY: the goal is to keep the app simple. If this becomes overly complex then it would cease to be a “useful 
    tool” and turn into an “encumbering hurdle” for the users. We needed to keep the data and interface relatively 
    simple and easy to use.

•	SPEED: if it takes the users too long to enter events, modify them, or view them. Then the user may become 
    frustrated and the app is a failure. 

•	INTERFACE (ease of use and expected): the interface needs to be intuitive and above all else it needs to be what 
    the user would expect from this type of app. Ie. Don’t have the user manually enter a date when they would expect
    to do so using a date picker control.
