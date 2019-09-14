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
            var playerHit = Math.floor(Math.random() * 20);
            var monsterHit = Math.floor(Math.random() * 20);

            this.addAttack(playerHit, monsterHit);
        },
        specialAttack: function() {
            var playerHit = Math.floor(Math.random() * 30);
            var monsterHit = Math.floor(Math.random() * (playerHit * 0.5));

            this.addAttack(playerHit, monsterHit);
        },
        heal: function() {
            var monsterHit = Math.floor(Math.random() * 10);
            var playerHit = (Math.floor(Math.random() * 30)) * -1;

            this.addAttack(playerHit, monsterHit);
        },
        giveUp: function() {
            this.givenUp = true;
        },
        addAttack: function(playerHit, monsterHit) {
            if (playerHit >= 0) {
                this.playerLife -= monsterHit;
                this.monsterLife -= playerHit;
            } else {
                // healing
                this.playerLife -= monsterHit;
                this.playerLife += playerHit * -1;
            }

            if (this.playerLife < 0) {
                this.playerLife = 0;
                this.attacks.push({player: false, monster: true});
            } else if (this.playerLife > 100) {
                this.playerLife = 100;
            }
            if (this.monsterLife < 0) {
                this.monsterLife = 0;
                this.attacks.push({player: true, monster: false});
            }

            if (this.monsterLife > 0 && this.playerLife > 0) {
                this.attacks.push({player: playerHit, monster: monsterHit});
            }
        }
    },
    computed: {
        playerLifeColors: function() {return this.getLifeColors(this.playerLife);},
        monsterLifeColors: function() {return this.getLifeColors(this.monsterLife);},
        gameCompleted: function() { return this.givenUp || this.monsterLife === 0 || this.playerLife === 0;}
    }
});
