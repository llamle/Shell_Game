var shellGame = {
    player: {
        wins: 0,
    },

    dealer: {
        wins: 0,
    },

    cardArray:[],
    cardPositions: ["one","two", "three"],

    createCards: function(){
        for (var j = 0; j<3; j++){
              this.cardArray[j] = new this.card();
              this.cardArray[j].setPosition(document.querySelectorAll('li')[j]);
        }
    },

    shuffle: function(){
    var setTimerID = setInterval(function () {

        for(var i = 0; i < 3; i++) {
          var rand = Math.floor(Math.random()*3);

          if(rand != i) {
            var temp = this.cardPositions[i];
            this.cardPositions[i]= this.cardPositions[rand];
            this.cardPositions[rand]= temp;
          }
        };

        for(var j = 0; j<3; j++){
          this.cardArray[j].removeClass();
          this.cardArray[j].setClass(this.cardPositions[j]);
        };
      }.bind(this), 1000) // Time out
      setTimeout(function(){clearInterval(setTimerID)}, 7000)
    },

    card: function(){
        this.position= "",
        this.setPosition = function(x){
            this.position = x;
        },
        this.removeClass = function(){
            this.position.classList.remove("one","two","three");
        }
        this.setClass = function(x){
            this.position.classList.add(x);
        }
      },

    hideBall: function(){
        $('#ball').hide();
    },

    showBall: function(){
        $('#ball').show()
    },

    selectBall: function (cupLi){
      if ($(cupLi).attr("id") === "win") {
        this.player.wins++;
        winner = 'Player';
      } else {
        this.dealer.wins++;
        winner = 'Computer';
      }

      $('#win').addClass("revealed");
      shellGame.showBall()
      this.printScoreBoard();
      // alert(winner);
    },

    setClicks: function(){
      $('#cups').on('click', 'li', function (e){
        shellGame.selectBall(this);
      });
    },

    printScoreBoard: function(){
      $('#scoreboard').text('Player: ' + this.player.wins + ' | Dealer: ' + this.dealer.wins);
    },
};

// Start Game

$(document).ready(function(){
  $('button').on('click', function(){
     shellGame.createCards();
     shellGame.hideBall();
     shellGame.shuffle();
     shellGame.setClicks();
  });
});
