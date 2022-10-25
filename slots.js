$(document).ready(function() {
        let betAmount = parseInt($('#money-bet').text());
        let balance = parseInt($('#money-balance').text());
        let matchingImages = false;
        let gameOver = false;
        let validBet = false;
        const slotImages = ['cherry.png', 'grapes.png', 'heart.png', 'lemon.png', 'orange.png',
                'seven.png', 'strawberry.png'];

        // function to check the balance
        function checkBalance() {
                if(balance <=0){
                        gameOver = true;
                        disableButtons();
                        console.log("Buttons disabled");
                        return $('#message').text("You lost all your money!").css('color', 'red');
                }
        }

        function updateBalance(){
                if (!matchingImages){
                        balance = balance - betAmount;
                        //console.log("Updated Balance: " + balance);
                        $('#money-balance').text(balance);
                        checkBalance();
                }
                else if(matchingImages = true){
                        balance = balance + (15*betAmount);
                        $('#money-balance').text(balance);
                        //console.log("You won! Updated Balance: " + balance);
                }
                betAmt();
        }

        // function to disable buttons
        function disableButtons(){
                $('#plus-button').prop('disabled', true);
                $('#minus-button').prop('disabled', true);
                $('#spin-button').prop('disabled', true);
        }

        // function to handle click events from + and - buttons, get the bet amount if its valid
        function betAmt(){
                let tempBalance = balance - betAmount;
                if(tempBalance < 0){
                        console.log("Cannot have negative balance");
                        $('#spin-button').prop('disabled', true);
                        $('#plus-button').prop('disabled', true);
                }


                $('#minus-button').click(function minus(){
                        //checkBalance();
                        if(betAmount > 1 && betAmount < balance){
                                $('#money-bet').text(--betAmount);
                                console.log(betAmount);
                        }
                });
                $('#plus-button').click(function (){
                        //checkBalance();
                        if(betAmount < balance){
                                $('#money-bet').text(++betAmount);
                                 console.log(betAmount);
                                 //$('#spin-button').prop('disabled', false);
                                validBet = true;
                        }
                        else{
                                $('#message').text("Invalid bet amount, you do not have enough money to bet $"+ (betAmount+1)).css('color', 'red').fadeTo(100, 0.1).fadeTo(200, 1.0);
                                validBet = false;
                                disableButtons();
                        }
                });
        }

        function randomNum(){
                return Math.floor(Math.random() * slotImages.length);
        }

        $('#spin-button').mouseover(function(){
           $('#spin-button').addClass("btn btn-primary text-white");
        });

        function spinImages(){
                $('#spin-button').click(function () {
                        $('#spin-button').toggleClass("border-4 border-opacity-50");
                        $('img').each(function(index, element){
                                $(element).attr("src", "images/"+ slotImages[randomNum()]);
                        });
                        // if images all match
                        let slot1 = $('#img-1').attr('src');
                        console.log(slot1);
                        let slot2 = $('#img-2').attr('src');
                        console.log(slot2);
                        let slot3 = $('#img-3').attr('src');
                        console.log(slot3);

                        if (slot1 == slot2 && slot2 == slot3) {
                                // display winning message, change to red
                                $('#message').text("Congratulations! You won!").css('color', 'red').fadeTo(100, 0.1).fadeTo(200, 1.0);
                                matchingImages = true;
                                updateBalance();
                        }
                        else {
                                // display losing message, change to red
                                $('#message').text("You lost, spin again.").css('color', 'red').fadeTo(100, 0.1).fadeTo(200, 1.0);
                                //updateBalance(matchingImages = false);
                                matchingImages = false;
                                checkBalance();
                                updateBalance();
                        }
                });

        }

        // if game isn't over, keep playing the game
        /*
                function playGame(){
                if(!gameOver)
                checkBalance();
                // get the bet amount
                betAmt();
                // spin images
                spinImages();
        }
                playGame();
         */

        betAmt();
        spinImages();

});



