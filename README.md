
this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

you will need to install "npm install"

and you will need to add some libaries

1- npm add react-redux-loading
2- npm add react
3- npm add react-router-dom
4- npm add react-redux
5- npm add react-dropdown

the project is using redux
	so we decided to create our actions in (actions) and reducers in (reducers) so we can call our state and updated data in our components using connect and mapStateToProps functions
    and we use middleware for logger in console and thunk 
    	for every component we have our mapStateToProps function which return the needed props
        we use dispatch also to dispatch functions in the reducers so we can update our store 
        the store contains of three main datatypes
        	1 users 
            	for any answer or new asked question, we add the data tio the authedUser 
            2 questions
            	for every new question we add new question and for every new answer we add the user answer
            3 authedUser
            	the user who uses the application now
       we divide the project in some componenets
       	 App 
        	the main file and inculdes the route for each component
            1- nav
            	this is used in the whole app as it is the top bar in the app
            2- Home 
            	the user home which has answered and unanswered questions
            3-question 
            	it is used to render the question before view the result or the poll
            4- leaderboardd
            	same page for all users which contains some info of each user and sorted with most active user
            5- new question
            	it is where every user can add his questions
            6- pollpage
            	it is where we decide to show the results or the poll question for user to choose
            7- results 
            	it is used in pollpage if the user answered the question
            8- logout
            	it is used when the logout or the user tries to open application for first time
            our css is in utils/progress-bar.component and index.css
            our data in utils/_DATA.js
            some functions are called from utils/helpers and api.js