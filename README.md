#3Draw
=

####What is 3Draw?
3Draw is a interactive 3D modeling software that was created at a 24 hour hackathon (PilotDC) by Matthew Kaufer, Ravi Kodali, Rushi Shah, and Sashank Thupukari. It utilizes a smartphone's gyroscope capabilities and a PCs processing power to model the phone's orientation in realtime and display it in 3D space. 
###How does it work?
3Draw connects a phone's gyroscope with a computer using web-sockets. It sends the gyroscope data as a JSON file that is used to calculate the orientation in 3D space using Eularian geometry. The orientation is used to create new unit vectors that are appended to the previous vectors and overtime will create a 3D model of the orientation. Added functionality allows phones to stop the line creation, calibrate the orientation, toggle line breaks on/off, change the magnitude of the vector, and clear the current 3D space. A code on the top left of the computer screen is used to sync specific phones with specific computers allowng multiple instances to run at the same time. 
###Getting started:
To use 3Draw, all you need is a smart phone and a computer. Navigate to http://www.3-draw.org/ on both devices (different UI's will show up based on type of hardware) and enter the code from the top left of the computer screen on the phone and click the big green button. Then tilt your phone in different directions and watch the green line being created. Change the magnitude of the vector using the slider (magnitude in this case refers to how fast the line is being created) After experimenting with the orientation use the mouse to pan and zoom around the computer screen to inspect the 3D space. Finally experiment with the relatively self explanatory buttons on the phone to interact with the other features. 
###Applications:
3Draw is not only really really cool, it has practical features as well. The innovative integration of phone and computer has applications in 3D modeling for things like mini UAV flight trajectories or gaming. Game developers can use this integration to make any smartphone a controller for an online game on any computer. 
###Creation:
3Draw was created in the span of 24 hours at a hackathon. It was written in HTML5/Javascript/CSS and utilizes a variety of frameworks including Three.js (http://threejs.org/examples/), Meteor (https://www.meteor.com/), and Bootstrap (http://getbootstrap.com/). The web-sockets make for seamless integration between phone and computer regardless of distance. If you have any in-depth questions about the creation feel free to email 2016rshah@gmail.com
