# PROJECT REQUIREMENTS

Use React for the front end. -- DONE

Use GraphQL with a Node.js and Express.js server. -- DONE

Use MongoDB and the Mongoose ODM for the database. -- DONE

Use queries and mutations for retrieving, adding, updating, and deleting data. -- DONE (will add more)

Be deployed using Heroku (with data). -- INCOMPLETE

Have a polished UI. -- INCOMPLETE

Be responsive. -- INCOMPLETE

Be interactive (i.e., accept and respond to user input). -- DONE (will add more)

Include authentication (JWT). -- DONE

Protect sensitive API key information on the server. -- INCOMPLETE (need to look into this one)

Have a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class and id naming conventions, indentation, high-quality comments, and so on). -- DONE (must maintain structure/naming style)

Have a high-quality README (with unique name, description, technologies used, screenshot, and link to deployed application). -- INCOMPLETE

# ADDITIONAL NOTES FOR REQS

## Instead of using a CSS library like Bootstrap, consider one of the following suggestions:

<!-- /////////////////  The styling should be decided on as a team but one person who will lead page design should become our expert and teach us/get us started.   ///////////////// -->

Explore the concept of CSS-in-JS, which abstracts CSS to the component level, using JavaScript to describe styles in a declarative and maintainable way. Some popular libraries include styled-components(https://styled-components.com/) and Emotion(https://emotion.sh/docs/introduction).

Try using a component library, such as Semantic UI(https://semantic-ui.com/), Chakra UI(https://chakra-ui.com/), or Ant Design(https://ant.design/).

Create all the CSS for your application just using CSS.

## Option of adding Stripe for charitable donations/ if we go the ecommerce route.

<!-- ///////////////// Something we'll need to discuss as a team.  /////////////////  -->

Consider integrating the Stripe payment platform. Even if you don’t create an e-commerce application, you could set up your site to accept charitable donations.
(https://stripe.com/docs/checkout/quickstart)

## Bonuses -- Although this is not a requirement for your project, try to also implement functionality to meet the minimum requirements of a PWA:

<!-- /////////////////  Should be easy to make but we'll wait till the very end to do it because Serviceworkers are annoying  ///////////////// -->

Uses a web manifest.

Uses a service worker for offline functionality.

Is installable.


# Our Notes

Let's make a user story asap, it's a struggle coming up with issues in github but I think it would be a good call to take some time to make them as soon as we get started too. Since we already have the shell of the application working we can hit the ground running on creating pages and getting styling to work after we come up with a solid game plan. I think we should divy up tasks where people feel they could make the most impact but since we all need to learn I'm down to pair program or do some type of work swapping. 

First day will be all about figuring out what we're doing and coming up with a good structure for an MVP and maybe extra goals, if possible even do some server side work for our schemas. Second day we can go over ideas for theme and design and start putting it into action. 

## Random Ideas

Pin Pintrest - collectors connect
Clothing Swap website/ebay maybe? 
Real-time chat app
Ecommerce Website/Baby swap
Groceries/Food Delivery app
News App
Music Streaming

# USER STORY

As a collector of special objects, I want to be able to store my collection(s) and see what other collectors are collecting, so that I can connect with a larger community of collectors.

## ACCEPTANCE CRITERIA

When I view the main page, 
Then I am presented with a list of different collections,
When I view the header with a navbar,
Then I am presented with a our website name, a search bar, a home page button a login or logout button, and a profile button,
When I click on any collection while logged out, 
Then I am redirected to a login page,
When I am on that login page,
Then I have the option to enter in my email and password to login or go to a sign up page,
When I am on the sign up page, 
Then I have the option to enter in an email, username, and password to sign up for the application,  
When I am on the collection page while logged in,
Then I can view all the items in that collection, and a link to the user's profile,
When I am on that user's profile page while logged in,
Then I can see a list of their different collections (and other user info?),
When I am logged in,
Then a profile icon that links to my user page shows up on the navbar as well as a logout icon,
When I am logged in on my profile page,
Then I am able to add a collection with a name and a tag or edit one of my existing collections,
When I wish to edit my existing collection,
Then I can change the name, the tag, or add/delete photos from the list,
When I wish to search for a collection,
Then I can search the collection by it's tag,
When I click the log out option,
Then I am redirected to the home page


## extra ideas

Random button for random collection
Messaging between people users 
When signing up, you can pick popular tags you might like
When looking up in the searchbar, you get autofilled results from the databases 
Future a user will be able to add multiple tags 
Implement colorblind mode 
Change the order the photos are presented


Home Page/IndexPage-Cody
list of collections
-query get all collections

Profile Page-Kate
User collections or "Click to add collections"
-mutation add collection
-mutation delete collection

Other User Page-Kate/Paige
-query single user

Collection Page-Cody
-query one collection's items
--if loggedIn userId = collection userId
-mutation add an item
-mutation delete an item

Search Page-Paige
-query random collection
