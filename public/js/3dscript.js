const socket = io();

            socket.on('connect', (userData) => {
                console.log('I exist!');

                let goldKeyF = false;
                let silverKeyF = false;

                let door3L = false;
                let door3R = false;

                //put code here so that we know that socket.io has initailized ...
                document.querySelector('#red_button_1').querySelector('.button').addEventListener('mouseenter', function(){
                    socket.emit('green');
                    socket.emit('pauseAnimation1');
                    //document.querySelector('#trap1AniL').setAttribute('animation', {enabled:false});
                    //document.querySelector('#trap1AniR').setAttribute('animation', {enabled:false});
                });

                document.querySelector('#red_button_1').querySelector('.button').addEventListener('mouseleave', function(){
                    socket.emit('defaultColor');
                    socket.emit('resumeAnimation1');
                });

                document.querySelector('#blue_button_1').querySelector('.button').addEventListener('mouseenter', function(){
                    socket.emit('green');
                    socket.emit('pauseAnimation1');
                });
                document.querySelector('#blue_button_1').querySelector('.button').addEventListener('mouseleave', function(){
                    socket.emit('defaultColor');
                    socket.emit('resumeAnimation1');
                });
                document.querySelector('#blue_button_1').querySelector('.button').addEventListener('mouseleave', function(){
                    socket.emit('defaultColor');
                    socket.emit('resumeAnimation1');
                });
                document.querySelector('#blue_button_1').querySelector('.button').addEventListener('mouseleave', function(){
                    socket.emit('defaultColor');
                    socket.emit('resumeAnimation1');
                });

                document.querySelector('#gold_button').querySelector('.button').addEventListener('click', function(){
                    socket.emit('visibleOffG');
                    console.log('goldKey:', goldKeyF);
                });
                document.querySelector('#silver_button').querySelector('.button').addEventListener('click', function(){
                    socket.emit('visibleOffS');
                    console.log('silverKey:', silverKeyF);
                });
                document.querySelector('#door2_handle').querySelector('.button').addEventListener('mouseenter', function(){
                    socket.emit('green');
                    socket.emit('door2Open');
                });
                document.querySelector('#door2_handle').querySelector('.button').addEventListener('mouseleave', function(){
                    socket.emit('defaultColor');
                    socket.emit('door2AniOff');
                    socket.emit('door2Closing1');
                    socket.emit('door2Close');
                    
                });

                document.querySelector('#red_button_2').querySelector('.button').addEventListener('click', function(){
                    socket.emit('doorRClicked');
                });

                document.querySelector('#blue_button_2').querySelector('.button').addEventListener('click', function(){
                    socket.emit('doorBClicked');
                });
                document.querySelector('#door3_button').querySelector('.button').addEventListener('click', function(){
                    socket.emit('green');
                    socket.emit('door3Open');
                });

                document.querySelector('#final_button').querySelector('.button').addEventListener('click', function(){
                    socket.emit('defaultColor');
                    socket.emit('playerwin');
                });
            });

            //listen to event from server
            socket.on('color_change', (data) => {
                let colorStr = 'rgb(' + data.r + ',' + data.g + ',' + data.b + ')';
                console.log('color_change:' + colorStr);
                document.querySelector('a-scene').setAttribute('background', {color:colorStr});
            });

            socket.on('pauseAnimation', (data) => {
                let pauseAni= data;
                console.log('Animation stopped!');
                document.querySelector('#trap1AniL').setAttribute('animation', {enabled:pauseAni});
                document.querySelector('#trap1AniR').setAttribute('animation', {enabled:pauseAni});
            });

            socket.on('resumeAnimation', (data) => {
                let resumeAni= data;
                console.log('Animation stopped!');
                document.querySelector('#trap1AniL').setAttribute('animation', {enabled:resumeAni});
            });

            socket.on('keySecureG', (data) => {
                let visibalG= data;
                console.log('Gold Key!');
                document.querySelector('#goldKey').setAttribute('visible', visibalG);
                document.querySelector('#goldKeyText').setAttribute('visible', true);
                goldKeyF = true;
            });

            socket.on('keySecureS', (data) => {
                let visibalS= data;
                console.log('Silver Key!');
                document.querySelector('#silverKey').setAttribute('visible', visibalS);
                document.querySelector('#silverKeyText').setAttribute('visible', true);
                silverKeyF = true;
            });

            socket.on('door2OpenUp', (data) => {
                let doorOpen= data;
                console.log('Door 2 Opened!');
                document.querySelector('#door2').setAttribute('animation', {enabled:doorOpen});
            });

            socket.on('door2AniFalse', (data) => {
                let doorClose= data;
                document.querySelector('#door2').setAttribute('animation', {enabled:doorClose});
            });
            socket.on('door2Cloing', (data) => {
                let coordiStr = data.x + " " + data.y + " " + data.z;
                console.log('Door 2 Closed!');
                document.querySelector('#door2').setAttribute('animation', {to:coordiStr});
            });
            socket.on('door2AniFalse1', (data) => {
                document.querySelector('#door2').setAttribute('animation', {property:data});
            });
            socket.on('door3L', (data) => {
                let doorOpenedL = data;
                //document.querySelector('#goldKey').setAttribute('visible', visibalG);
                door3L = data;
            });
            socket.on('door3R', (data) => {
                let doorOpenedR = data;
                //document.querySelector('#goldKey').setAttribute('visible', visibalG);
                door3R = data;
            });

            socket.on('door3OpenUp', (data) => {
                let door3Open = data;
                if (door3R == true && door3L == true) {
                    document.querySelector('#door3l').setAttribute('animation', {enabled:door3Open});
                    document.querySelector('#door3r').setAttribute('animation', {enabled:door3Open});
                }
                
            });

            socket.on('winButton', (data) => {
                let finishGame = data;
                if (goldKeyF == true && silverKeyF == true) {
                    document.querySelector('#winText').setAttribute('visible', true);

                }
                
            });
