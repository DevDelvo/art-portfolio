# Kevin Delvo Art Website
This website is dedicated to hosting my art pieces where users can view various pieces I've made. They can also filter it by the topics such as concept art, illustration, sketches, etc as well as the price. They can also add items to a cart and checkout items. I built this website from scratch using React and Bootstrap for the frontend as well as with Node, Express, MongoDB and Mongoose for the backend. For handling payments, I utilized the Braintree Payments API to allow users to pay for their orders with paypal or credit card.

##Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

###Prerequisites
You will need MongoDB to run this app as its being used for storing user information, categories as well as the art pieces. You can find the link to download it here: https://www.mongodb.com/download-center/community
I included some .envDummy files to make it easier for others to set it up on their local machine. Just rename the .envDummy to .env and replace the values with the proper values.
To find your MONGO_URI, it is generally the port where your mongoDB is running followed by /`Name of the database` EX: mongodb://localhost:`PORT NUMBER`/ `DATABASENAME`
TO find your Braintree keys, you can use sign up for an account here https://www.braintreepayments.com/sandbox and make an account. After logging in, navigate to API (it should be in the dropdown menu from the gearbox icon in the upper right corner of your window.) From there you can generate the three keys to connect to braintree from the braintree.js controller.

###Installing
In both the root of this project as well as /art-portfolio-front-end directory, run 'npm install' to install the dependencies.
After they are finished installing, run 'npm run start' in the root to run the server backend. The server will be running on whatever port you declared in your .env file. Run 'npm run start' in /art-portfolio-front-end and go to http://localhost:8080/ on your web browser to see your running app!

##Built With
[React](https://reactjs.org/) - The frontend framework used
[React Bootstrap](https://react-bootstrap.github.io/) - styling and CSS
[MongoDB](https://www.mongodb.com/) - Database used to store user, categories, and art information.
[Node](https://nodejs.org/en/) and [Express](https://expressjs.com/) - for building the RESTful APIs to acces user, categories and art information stored in MongoDB.
[Braintree Payment API](https://www.braintreepayments.com/) - used to handle user payment with paypal or credit card.

##Authors
Solo project built by yours truly.

##Acknowledgments
Big shoutout to Ryan Dhungel aka kaloraat for his very helpful tutorial on building this full stack MERN app. It was especially helpful for learning react hooks as well as deploying the app on Digital Ocean.