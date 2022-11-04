$(document).ready(function() {
        let betAmount = parseInt($('#money-bet').text());
        let balance = parseInt($('#money-balance').text());
        const slotImages = ['cherry.png', 'grapes.png', 'heart.png', 'lemon.png', 'orange.png',
                'seven.png', 'strawberry.png'];
        let matchingImages;

        // if user clicks - button
        $('#minus-button').click(decreaseBet);
        // if user clicks + button
        $('#plus-button').click(increaseBet);
        // if user clicks spin button
        $('#spin-button').click(checkBalance);

        function decreaseBet(){
                if(betAmount > 1) {
                        $('#money-bet').text(--betAmount);
                }
        }

        function increaseBet(){
                if(betAmount < balance){
                        $('#money-bet').text(++betAmount);
                }
        }

        function randomNum(){
                return Math.floor(Math.random() * slotImages.length);
        }

        function checkBalance(){
                if(balance <= 0){
                        return $('#message').text("You lost all your money!").css('color', 'red').fadeTo(100, 0.1).fadeTo(200, 1.0);
                }

                if(balance < betAmount){
                        $('#message').text("Invalid bet amount, you do not have enough money to bet $"+ (betAmount)).css('color', 'red').fadeTo(100, 0.1).fadeTo(200, 1.0);
                }
                else{
                        spinImages();
                }
        }

        function updateBalance(){
                if(!matchingImages && (balance >= betAmount)){
                        balance = balance - betAmount;
                        $('#money-balance').text(balance);
                        if(balance == 0){
                                checkBalance();
                        }
                }
                if(matchingImages){
                        balance = balance + (15*betAmount);
                        $('#money-balance').text(balance);
                }
        }

        function randomIntervals(){
                return Math.floor(Math.random() * 100);
        }

        function spinImages(){
                $('img').each(function(index, element) {
                        $(element).attr("src", "images/" + slotImages[randomNum()]);
                });
                        let slot1 = $('#img-1').attr('src');
                        let slot2 = $('#img-2').attr('src');
                        let slot3 = $('#img-3').attr('src');

                        if (slot1 == slot2 && slot2 == slot3) {
                                // display winning message, change to red
                                $('#message').text("Congratulations! You won!").css('color', 'red').fadeTo(100, 0.1).fadeTo(200, 1.0);
                                matchingImages = true;
                                // update the balance
                                updateBalance();
                        }
                        else {
                                // display losing message, change to red
                                $('#message').text("You lost, spin again.").css('color', 'red').fadeTo(100, 0.1).fadeTo(200, 1.0);
                                matchingImages = false;
                                //update the balance
                                updateBalance();
                        }
        }
});



