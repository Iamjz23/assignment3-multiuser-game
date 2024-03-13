const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

app.use(express.static(__dirname + '/public')); //set root path of server ...

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/2D', function( req, res ){ 
    res.sendFile( __dirname + '/public/2D.html' );
});

app.get( '/3D', function( req, res ){ 
    res.sendFile( __dirname + '/public/3D.html' );
});

let player1Choice = null;
let player2Choice = null;
function getResult(player1, player2) {
    if (player1 === player2) {
      return 'It\'s a tie!';
    } else if (
      (player1 === 'rock' && player2 === 'scissors') ||
      (player1 === 'paper' && player2 === 'rock') ||
      (player1 === 'scissors' && player2 === 'paper')
    ) {
      return 'Player 1 wins!';
    } else {
      return 'Player 2 wins!';
    }
  }

//socket.io stuff
//https://socket.io/docs/v3/emit-cheatsheet/
io.on('connection', (socket) => {
    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    socket.on("green", (data) => {
        console.log( "Trap 1 stop event received" );
        io.emit("color_change", {r:0, g:255, b:0});
    });

    socket.on("red", (data) => {
        console.log( "Trap 1 stop event received" );
        io.emit("color_change", {r:255, g:0, b:0});
    });

    socket.on("blue", (data) => {
        console.log( "Trap 1 stop event received" );
        io.emit("color_change", {r:0, g:0, b:255});
    });

    socket.on("pauseAnimation1", (data) => {
        console.log("Pause animation event received");
        io.emit('pauseAnimation', false);
    });

    socket.on("defaultColor", (data) => {
        console.log( "Trap 1 go back working event received" );
        io.emit("color_change", {r:0, g:0, b:0});
    });

    socket.on("resumeAnimation1", (data) => {
        console.log("Resume animation event received");
        io.emit('resumeAnimation', true);
    });

    socket.on("visibleOffG", (data) => {
        console.log( "Gold key has secured" );
        io.emit("keySecureG", false);
    });

    socket.on("visibleOffS", (data) => {
        console.log( "Silver key has secured" );
        io.emit("keySecureS", false);
    });

    socket.on("door2Open", (data) => {
        console.log("Door 2 Opening!");
        io.emit('door2OpenUp', true);
    });
    socket.on("door2Close", (data) => {
        console.log("Door 2 Closing!");
        io.emit("door2Closing", {x:0, y:0, z:0});
    });
    socket.on("door2AniOff", (data) => {
        io.emit('door2AniFalse', false);
    });
    socket.on("door2Closing1", (data) => {
        io.emit('door2AniFalse1', 'position');
    });

    socket.on("doorBClicked", (data) => {
        console.log("door 3 blue button clicked");
        io.emit('door3L', true);
    });
    socket.on("doorRClicked", (data) => {
        console.log("door 3 red button clicked");
        io.emit('door3R', true);
    });
    socket.on("door3Open", (data) => {
        console.log("door 3 red button clicked");
        io.emit('door3OpenUp', true);
    });
    socket.on("playerwin", (data) => {
        console.log("player win");
        io.emit('winButton', true);
    });

    socket.on('playerChoice', (choice) => {
        if (!player1Choice) {
          player1Choice = choice;
        } else {
          player2Choice = choice;

          const result = getResult(player1Choice, player2Choice);
    
          io.emit('gameResult', result);
    
          player1Choice = null;
          player2Choice = null;
        }
      });
});

server.listen(LISTEN_PORT);
console.log("Listening on port: " + LISTEN_PORT );