Comp2406 project proposal
Foxcode Calendar

The plan is to create a calendar/event planner.

An Event can have:
  - Start time
	- End time
	- Category - Personal, business, school, etc
	- Type - Meeting, appointment, pick-up, etc
	- Subject (like in an email) - "Meeting with TA to discuss proj" ex.
	- Body/description - "The plan is too meet on sunday, so we can discuss the partoculars of the project. We need to note certain key aspects about timing" ex.
- A flag indicating it is important

I see there being these Views or Pages:
	- Monthly
	- Weekly
	- Daily
	- An Event edit page: the user can create a new event here or edit an existing event
		Event list (all), OR maybe need a search feature if we cant display all. Then we could show top 50 or 100 and then they can filter the results

View Details
Monthly:
	- Display events on the according days with minimum info, due to UI space constraint
		possibly fit the first two events for a day, then have an identifier (something like, ..., or an icon) to let the user know there is more that is not shown
	- Have a top 5 upcoming events list, so the user can easily identify the most immediate events
	- The days for the Month will only be displayed, ie we will not show feb 1, 2, 3 etc. if the user is looking at January (i suggest this for simplicity sake)
	- The user can create new events
	- Edit/delete events
	- Click on an event in the calendar or top 5 list and view that events in detail (this would take them to the Event edit page with the data filled in)

Weekly:
	- Events are display on the weekly calendar as blocks (colour coding could come in handy here too)
	- Top 5 pending events list
	- If an Event is before 6 am or after 10pm, maybe we could just have an area (indicated by the blue dotted line) where these events will display by default. This is instead of having to do a full 24 hour block, where most of it will not get utilized on a regular basis and would just be taking up screen real estate
	- The user can create new events
	- Edit/delete events
	- Click on an event in the calendar or top 5 list and view that events in detail (this would take them to the Event edit page with the data filled in)

Daily:
	- This will have a full 24 hours blocked out
	- Top 5 pending events list
	- The user can create new events
	- Edit/delete events
	- Click on an event in the calendar or top 5 list and view that events in detail (this would take them to the Event edit page with the data filled in)

Event Edit:
	- Allows the user to create/view/edit an events details
	- Some items can have defaults if necessary

Event List:
	- Either have a show all list, OR we can cap it to like 50/100 and then give them a search option to narrow down the list
	- Filters for the list - important, event is old (ie in the past), 

Actions:
	- Edit/Delete an event - This can happen in two ways 1) the user selects the event by clicking on it in the calendar, this will direct them to the Event Edit Page where they perform the desired action 2) Clicking the edit/delete button, which takes them to the Event List Page where they select one, this will then navigate them to the  Event Edit Page where they perform the desired action 
	- New Event - create a new event by clicking the New + button
	- View Event - similar to edit/delete, except once the user finds the event they just view instead of taking other actions
	- Filtering, maybe a combo box or two where the user can filter events by type or category
	- Changing views, use the buttons to navigate between views. Each view will require a different set of criteria from the user before displaying, it can perhaps have defaults to try and anticipate the users actions

Buttons:
	- New: will take the user to a blank event where they can fill in the necessary data and then save
	- Edit/delete: i see this as one button, it will take the user to another page with a list of all events, where they can select one and either view/edit it or delete it
	- Monthly/Weekly/Daily ... these will navigate the user between the calendar views, if your on the monthly view then the daily & weekly view buttons will be available
	- Monthly - will ask for the month & year you are interested in viewing
	- Weekly will ask for a month/day/year and then display the week that contains that day
    - Daily will ask for a month/day/year and then display that day


Milestones

1. Architecture diagram & external library/program use
2. Application model definition/Database schema & server API (RESTful API)
3. server API implementation (includes permission-based security)
4. Client-side views: login, add event, modify event, remove event, weekly view
5. Framework demo (running application skeleton)
6. Client-side views: monthly view, day view, event list(with filters)
7. Working prototype/demo
8. Draft documentation
9. Final code and documentation (April 10th)
