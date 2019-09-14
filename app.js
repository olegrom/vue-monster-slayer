new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        gameInProgress: false,
        givenUp: false,
        attacks: []
    },
    methods: {
        getLifeColors: function(value) {
            return {
                'bg-success': value >= 80,
                'bg-warning': value >= 30 && value < 80,
                'bg-danger': value < 30
            };
        },
        startGame: function() {
            this.playerLife = 100;
            this.monsterLife = 100;
            this.gameInProgress = true;
            this.givenUp = false;
            this.attacks = [];
        },
        attack: function() {
            var playerHit = this.getDamage(20);
            var monsterHit = this.getDamage(20);

            this.addAttack(playerHit, monsterHit);
        },
        specialAttack: function() {
            var playerHit = this.getDamage(30);
            var monsterHit = this.getDamage(playerHit * 0.5);

            this.addAttack(playerHit, monsterHit);
        },
        heal: function() {
            var monsterHit = this.getDamage(10);
            var playerHit = this.getDamage(30) * -1;

            this.addAttack(playerHit, monsterHit);
        },
        giveUp: function() {
            this.givenUp = true;
            this.finishGame();
        },
        addAttack: function(playerHit, monsterHit) {
            if (playerHit >= 0) {
                // hit
                this.playerLife -= monsterHit;
                this.monsterLife -= playerHit;
            } else {
                // healing
                this.playerLife -= monsterHit;
                this.playerLife += playerHit * -1;
            }

            // check that player and monster life will not go beyond 0
            if (this.playerLife < 0) this.playerLife = 0;
            if (this.monsterLife < 0) this.monsterLife = 0;

            if (this.monsterLife > 0 && this.playerLife > 0) {
                this.attacks.push({player: playerHit, monster: monsterHit, type: 'action'});
            } else if (this.monsterLife === 0) {
                this.finishGame();
            } else if (this.playerLife === 0) {

            }
        },
        finishGame: function() {
            var playerWon = this.playerLife > this.monsterLife;
            this.attacks.push({player: playerWon, monster: !playerWon, type: 'summary'});
        },
        getDamage: function(max) {
            return Math.floor(Math.random() * max);
        }
    },
    computed: {
        playerLifeColors: function() {return this.getLifeColors(this.playerLife);},
        monsterLifeColors: function() {return this.getLifeColors(this.monsterLife);},
        gameCompleted: function() { return this.givenUp || this.monsterLife === 0 || this.playerLife === 0;}
    }
});
