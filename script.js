//=========
//VARIABLES
//=========

//characters bodies
var characterWarrior;
var characterArcher;
var characterWizard;
var characters;

//characters parameters
var lifeWarrior = 50
var damageWarrior = 10
var imageWarrior = "Sprites/Characters/Warrior.png"
var lifeArcher = 30
var damageArcher = 20
var imageArcher = "Sprites/Characters/Archer.png"
var lifeWizard = 20
var damageWizard = 30
var imageWizard = "Sprites/Characters/Wizard.png"

//evolution system
var pointsToEvo = 1;
var pointsWhenEvo = 5;

//enemies
var enemies = [];

//battle system
var indexCharacters = 1;
var indexEnemiesGroup;
var indexTargetEnemy;

var percentageEnemy = 50;



//=========
//FUNCTIONS
//=========

//character

function Character(type, life, damage, image) {
    this.type = type;
    this.life = life;
    this.damage = damage;
    this.image = image;
}

function createCharacter() {
    characterWarrior = new Character("Warrior", lifeWarrior, damageWarrior, imageWarrior);
    characterArcher = new Character("Archer", lifeArcher, damageArcher, imageArcher);
    characterWizard = new Character("Wizard", lifeWizard, damageWizard, imageWizard);
    characters = [characterWarrior, characterArcher, characterWizard];
}
createCharacter();

//enemys

function Enemy(name, life, damage, image) {
    this.name = name;
    this.life = life;
    this.damage = damage;
    this.image = image;
}

var alreadyCreated = false;
function createEnemies() {
    
    if (!alreadyCreated)
    {
        var orc = new Enemy("Orc", 20, 10, "Sprites/Enemies/Orcs/orc.png");
        var orcShaman = new Enemy("Orc Shaman", 20, 30, "Sprites/Enemies/Orcs/orc shaman.png");
        var orcBoss = new Enemy("Orc Boss", 50, 10, "Sprites/Enemies/Orcs/orc boss.png");
        var orcs = [orc, orcShaman, orcBoss];

        var skeleton = new Enemy("Skeleton", 10, 20, "Sprites/Enemies/Undeads/skeleton.png");  
        var zombie = new Enemy("zombie", 20, 30, "Sprites/Enemies/Undeads/zombie.png");  
        var zombieBoss = new Enemy("zombie Boss", 30, 50, "Sprites/Enemies/Undeads/zombie boss.png");  
        var undeads = [skeleton, zombie, zombieBoss];
    
        var imp = new Enemy("Imp", 20, 20, "Sprites/Enemies/Demons/imp.png");
        var demon = new Enemy("Demon", 30, 30, "Sprites/Enemies/Demons/demon.png");
        var demonBoss = new Enemy("Demon Boss", 50, 40, "Sprites/Enemies/Demons/demon boss.png");
        var demons = [imp, demon, demonBoss];

        enemies = [orcs, undeads, demons];

        alreadyCreated = true;

        console.log("createEnemies()");
    }
    else 
    {
        console.log("failed on using createEnemies()");
    }
}

//evolution

function attPointsEvo() { 
    $("#EvolutionPointsId").html(pointsToEvo);
    attButtonDisabled();
    console.log("attPointsEvo()."+pointsToEvo)
}

function attButtonDisabled() {
    if(pointsToEvo <= 0) {
        $(".buttonUpdate").attr("disabled", true);
    }
    else {
        $(".buttonUpdate").attr("disabled", false);
    }
}

function evolveStat(statType, classType) {
    pointsToEvo -= 1;

    if (statType == "damage"){
        var debugStat = "damage";
        switch(classType){
            case "warrior":
                damageWarrior += pointsWhenEvo;
                $("#warriorDamageId").html(damageWarrior);
                var debugClass = "warrior";
                break
            case "archer":
                damageArcher += pointsWhenEvo;
                $("#archerDamageId").html(damageArcher);
                var debugClass = "archer";
                break
            case "wizard":
                damageWizard += pointsWhenEvo;
                $("#wizardDamageId").html(damageWizard);
                var debugClass = "wizard";
                break
        }
    }
    else if (statType == "life"){
        var debugStat = "life";
        switch(classType){
            case "warrior":
                lifeWarrior += pointsWhenEvo;
                $("#warriorLifeId").html(lifeWarrior);
                var debugClass = "warrior";
                break
            case "archer":
                lifeArcher += pointsWhenEvo;
                $("#archerLifeId").html(lifeArcher);
                var debugClass = "archer";
                break
            case "wizard":
                lifeWizard += pointsWhenEvo;
                $("#wizardLifeId").html(lifeWizard);
                var debugClass = "wizard";
                break
        }
    }

    console.log("evolveStat()."+debugStat+"."+debugClass);
    attPointsEvo();
}

//battle

function selectEnemies() {
    var htmlOptions = "";
    indexEnemiesGroup = $("#selectEnemyGroupId").val()
    $("#selectEnemyId").html("");

    for(var i=0; i<3; i++) {
        htmlOptions = "<option value=" + i + ">" + enemies[indexEnemiesGroup][i].name + "</option>"
        console.log("SelectEnemies().append."+htmlOptions);
        $("#selectEnemyId").append(htmlOptions);
    }
}

function attDataTarget() {
    indexTargetEnemy = parseInt($("#selectEnemyId").val())

    $("#lifeEnemyId").html(enemies[indexEnemiesGroup][indexTargetEnemy].life);
    $("#damageEnemyId").html(enemies[indexEnemiesGroup][indexTargetEnemy].damage);
    $("#imageEnemyId").attr("src", enemies[indexEnemiesGroup][indexTargetEnemy].image);

    console.log("attDataTarget()");
}

function attDataCharacter() {
    $("#lifeCharacterId").html(characters[indexCharacters].life);
    $("#damageCharacterId").html(characters[indexCharacters].damage);
    $("#imageCharacterId").attr("src", characters[indexCharacters].image);

    console.log("attDataCharacter()");
}

function selectCharacter() {
    indexCharacters = parseInt($("#selectCharacterId").val());
    attDataCharacter();

    console.log("selectCharacter()");
}

function startBattle() {
    $("#resultId").html("");

    createCharacter();
    createEnemies();
    attDataCharacter();
    selectEnemies();
    attDataTarget();

    console.log("startBattle()");
}

function verifyAllEnemiesDead() {
    for(var i = 0; i < enemies[indexEnemiesGroup].length; i++) {
        console.log("verifyAllEnemiesDead().verificationFor."+i)
        if(enemies[indexEnemiesGroup][i].life > 0) {
            console.log("verifyAllEnemiesDead().false");
            return false
        }
    }
    
    console.log("verifyAllEnemiesDead().true");
    return true;
}

function attack() {
    var htmlFinal = "";

    if(characters[indexCharacters].life <= 0) { //check if current character is dead
        htmlFinal = characters[indexCharacters].type + " is dead, attack with another character";
    }
    else if (enemies[indexEnemiesGroup][indexTargetEnemy].life <= 0) { //check if current enemy is dead
        htmlFinal = enemies[indexEnemiesGroup][indexTargetEnemy].name + " is already dead, select another enemy";
    }
    else {
        enemies[indexEnemiesGroup][indexTargetEnemy].life -= characters[indexCharacters].damage;

        htmlFinal = enemies[indexEnemiesGroup][indexTargetEnemy].name + " received " + characters[indexCharacters].damage + " damage <br>";

        if(enemies[indexEnemiesGroup][indexTargetEnemy].life <= 0) {
            htmlFinal += enemies[indexEnemiesGroup][indexTargetEnemy].name + " died <br>"
    
            enemies[indexEnemiesGroup][indexTargetEnemy].life = 0;
        }
    
        if(Math.floor(Math.random()*100) < percentageEnemy) {
            characters[indexCharacters].life -= enemies[indexEnemiesGroup][indexTargetEnemy].damage;
            htmlFinal += characters[indexCharacters].type + " received " + enemies[indexEnemiesGroup][indexTargetEnemy].damage + " damage <br>";
    
            if(characters[indexCharacters] <= 0) {
                characters[indexCharacters] = 0;
                htmlFinal += characters[indexCharacters].type + " died <br>";
            }
        }
    
        var allEnemiesDead = verifyAllEnemiesDead();
        if(allEnemiesDead) {
            htmlFinal += "All enemies are dead, you can now loot your evolution points"
            $("#buttonLootId").attr("disabled", false);
        }
    }

    attDataCharacter();
    attDataTarget();

    $("#resultId").html(htmlFinal);
    console.log("attack()");
}

function loot() {
    pointsToEvo += 1;
    attPointsEvo();
    $("#buttonLootId").attr("disabled", true);

    console.log("loot()");
}