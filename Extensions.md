There are two extensions that would be of great benefit to our application.

------------------------------------------------------------------------------------------------------------------------

1 - LOCATION EXTENSION

Instead of merely storing the location as a manually entered string we could make use of the Google Maps Javascript API.
This would allow the users to get an actual map of their location allowing for easy navigation to Event locations that 
they are unfamiliar with.

The API can be found at https://developers.google.com/maps/documentation/javascript/tutorial

Changes necessary for this extension to work would be:

  • We would create a new table named Location which would store all the locations entered by users. It would have the 
  following values. LocationPK (int), EventFK (int, not nullable), LocationName (string), LocationLat (double, nullable),
  LocationLong (double, nullable) & PrivateLocation (bit, not nullable).

  •	The existing Location field in the Event table would be changed to a foreign key, which references a record in the 
  NEW location table,  LocationFK (int, not nullable).

  •	The edit event would need to be changed in order to make use of the new API.

  •	We see this working as an optional feature. The user would still be able to just enter/display the name of the 
  location if they wish. However if they chose to be more descriptive, there would be a button beside this field that 
  would open the API and allow them to find a place, set the marker and in doing so it would store the position as geo 
  cords in the LocationLat/LocationLong. There would also be a checkbox to mark this location as private. 
  Note: the default for PrivateLocation would be true.

  •	The next step of offered functionality would be to offer them an interface for getting the directions to the location 
  given an address of the starting point.

We don't believe there exists any roadblocks in our apps ability to implement this extension. The hardest part would be 
the data migration to the new data structure. The UI is easily changed/configured.

To accomplish the difficult data migration we would:
1.	Create the new Location Table

2.	Chang the Location Field on the Event table to allow for nulls

3.	From the Event table move the Location & EventPK fields for each record into the LocationName and EventFK fields in 
      the Location table

4.	On the Event table change the (now empty) Location field type from a varchar to an int

5.	Go through the new Location table and insert the LocationPK from that table into the LocationFK of the Event table
      by comparing the Location-EventFK to the Event-EventPK

6.	On the event table change the LocationFK to a non nullable field

7.	On the Location table delete the EventFK column as it is not necessary (just used for data migration)

---------------------------------------------------------------------------------------------------------------------

2 - EVENT SHARING AS GROUPS EXTENSION

The sharing of events between people would be a useful extension for groups of people, such as companies or families and
friends. 

DATABASE Changes:

•	Modify the EVENT table to include an additional field: a Group table Foregin Key. 
      The Group table Foreign Key would be a nullable field and would allow the person creating an event to relate it 
      to one of the groups they are a part of.

•	Modify the USER table by putting triggers in place to make sure that the UserName field is a unique field among all 
  User records. 

•	Create a GROUP table with fields: Primary Key, Name, Description, IsPrivate.
      This table defines the groups.

•	Create a GROUP MEMBER table with fields: Primary Key, Group table Foreign Key, a User table Foreign Key, a Group 
  Member Role table Foreign Key.
      This table defines the members of a group (which are users in the system) and their roles in the group. The roles
      would be a nullable field and does not have to be specified.

•	Create a GROUP MEMBER ROLE table with: a Primary Key, Name of role, Description of role.
      This table is where the different roles are defined for the members of the group. These are predefined roles. At 
      this time they include Owner/admin/member. Each role having different capacities.

•	Create an Invitation table with fields: Primary Key, Group table Foreign Key, UserName.
      The Invitation table is where the records for group invitations would be stored.

 
UI Changes:

•	Modify the existing Event Edit/Create view would need a new Combo Box field with a label “Group” that would allow the 
  user to tie the event to a group. Note that the Group combo box would only display groups that the user is a part of 
  and they must have a role level of Admin or Owner.

•	Create a “Group List view”, accessible from any of the calendar views by clicking a button labeled “Groups”. It would 
  display the viewable groups, which are groups’ that: are not private, or an invitation exists for the logged in user. 
  From that list of viewable groups the user would be able to highlight one and click a button to join it. This view 
  would also display another list of groups, which are the ones that the logged in user is already a part of. From that 
  list the user could remove themselves from a group by highlighting it and clicking a remove button.

•	Create a “Group Create/Edit view”, accessible from Group List view. If they had a group they were a member of 
  highlighted on the previous screen (the Group List view) it would navigate to that groups information. Else it just 
  navigates to a blank Group Edit view where the user can create one. It would allow a user to create a group or modify 
  an existing groups’ information if they have the Admin/Owner role. Deletion of a group can only be done by the Owner 
  of the group.

•	Create a “Group Member List Edit view”, accessible through Group Create/Edit page. It will have a list of all the 
  members and their assigned roles. This page will allow the group admins/Owner to modify the member roles, remove 
  members and create invitations to new members for the group. There will be a second list on this view that shows all 
  of the active invitations for the group.

•	Create an “Invitation Create view”, accessible from the Group Member List Edit view. This will allow the admins and 
  owner of a group to send invitations to other users so they can join the group. These invitations will be received by 
  the users upon login where they will be prompted to accept or decline the invitation.

•	Create an “Invitation List view”. This will display a list of all the existing invitations for the logged in user. It 
  will display itself once the user has logged in. Form this page the user can choose to accept an invitation, decline 
  it or close the page without making any decisions.



Most of the Groups workflow does not contain new concepts. It’s an editable object (the group) that has 
children (members) which can be added and removed. The group can be associated to many events, however there are two 
key new concepts to make note of.

First of which, is that private groups cannot simply be joined by everyone (non private aka public groups, allow anyone 
to join and are all displayed in the “Group List View”). In private groups the admin/owner must create an invitation 
from the Invitation create view, which would be linked to a user by their UserName (this field now has the requirement 
of being unique). Thus the creator of an invitation must know the UserName of the person they wish to invite before 
they actually create the invite.

Second of which is the idea of the GROUP MEMBER ROLES (member/admin/owner). Certain capacities of the Groups 
functionality can only be accessed by people with the appropriate roles. These roles are what give the groups their 
structure and organization. The capacities of each role are as follows.



A MEMBER has the capacity to:

•	Accept an invitation to a group

•	View the Events for that group

•	Remove themselves from a group



An ADMIN has the capacity to:

•	Accept an invitation to a group

•	View Events for that group

•	Modify/Create Events for that group

•	Invite others to that group

•	Remove group members that have a role of “member”

•	Delete events they made for that group

•	Remove themselves from that group



An OWNER has all the rights of an admin plus:

•	Delete a group they created

•	Remove group members that have a role of “admin” or “member”




This is a much more significant change and would require many additions to the database and many more UI views to be 
created. However it has strong leverage in appealing to a wider group of people due to its increased functionality. 
Thus this would allow our app to gain a stronger foothold in the market if we ever decided to offer it to the public. 
Nothing in this extension seems to be a show stopper or require an overhaul of our project or design. The only 
requirement to this extension is a time commitment as it requires a significant amount of work.
