# Pseudocode
1. Link to High Scores should be in the HTML
1. Timer should be in the HTML as well.
1. Grab Start Button Element on page using javascript.  (This should be in the HTML)
1. When I click on a Start Button Element (Event Listener with a type of "click") run the code to start the quiz.
1. Set the max time on the timer.  
1. In the HTML.  There should be a container that I append the questions and answers to  When the button is clicked...should probably hide all the starter text.  
1. Dynamically render the question to the screen
1. Dynamically render the answers to the screen.  Should be buttons right?  Because you click them.  Do we want to refresh the page?  No(event.preventDefault()).
1. Start the timer
1. Where do we put our event listener when we click on an answer?  Event Delegation.  We will add the listener to the parent.  The parent is the container that I am appending questions and answers to.  From here, we can do that fancy element.match("button") we probably want to figure out what text or attributes are on that button to start our compare to see we we were right or not.
1. If correct...clear container and show/render next question
1. if incorrect...decrease time by whatever value you want.  Also if time time hits zero...end the game and clear the container.  Also...if there are no more questions...end the game and clear the container.  Otherwise clear container and show/render next question
1. Show score submission text.  Since this isn't dynamic code...could probably be in the HTML.  Probably a good idea to hide it with CSS and make it appear when the game ends.
1. After submission show the start button and starter text again so I can play again.