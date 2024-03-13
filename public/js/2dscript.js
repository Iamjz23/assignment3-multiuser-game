let socket = io();

            socket.on('connect', (userData) => {
                console.log('I exist!');

                const choices = ['rock', 'paper', 'scissors'];
                let playerChoice = null;

                document.querySelectorAll('.btn').forEach(button => {
                  button.addEventListener('click', () => {
                    const choice = button.dataset.choice;
                    playerChoice = choice;

                    socket.emit('playerChoice', choice);
                  });
                });

                socket.on('gameResult', (result) => {
                    document.querySelector('.result').innerText = result;
                    playerChoice = null;
                });

                socket.on('gameEnd', () => {
                  player1Choice = null;
                  player2Choice = null;
                });  
            });

           