var myChart;

String.prototype.toCapitalize = function()
{ 
   return this.toLowerCase().replace(/^.|\s\S/g, function(a) { return a.toUpperCase(); });
}

function nightMode( clicks ) {
	var amount = clicks;
	var nav = document.querySelector('.header__navigation');
	var bg = document.querySelector('html');
	var bdy = document.querySelector('body');
	var content = document.getElementById('content');
	var text = document.querySelectorAll("h1, h2, h3, h4, h5, h6, #infoPanel, #descriptionPanel, #typePanel, #abilityPanel, #evolutionPanel");
	if (clicks % 2 == 0) {
		nav.style.backgroundColor = 'rgb(216, 85, 43)';
		for (i = 0; i < text.length; i++) {
    		text[i].style.color = 'rgb(30, 20, 0)';
		}
		content.style.backgroundColor = 'rgb(254, 254, 254)'
	} else {
		nav.style.backgroundColor = 'rgb(30, 20, 0)';
		for (i = 0; i < text.length; i++) {
    		text[i].style.color = 'rgb(254, 254, 254)';
		}
		content.style.backgroundColor = 'rgb(12, 12, 12)';
	}
}

function getTypeColor( string ) {
	var type = string;
	if (type == "normal") {
		return "#A8A77A";
	} else if ( type == "fire" ) {
		return "#EE8130";
	} else if ( type == "water" ) {
		return "#6390F0";
	} else if ( type == "electric" ) {
		return "#F7D02C";
	} else if ( type == "grass" ) {
		return "#7AC74C";
	} else if ( type == "ice" ) {
		return "#96D9D6";
	} else if ( type == "fighting" ) {
		return "#C22E28";
	} else if ( type == "poison" ) {
		return "#A33EA1";
	} else if ( type == "ground" ) {
		return "#E2BF65";
	} else if ( type == "flying" ) {
		return "#A98FF3";
	} else if ( type == "psychic" ) {
		return "#F95587";
	} else if ( type == "bug" ) {
		return "#A6B91A";
	} else if ( type == "rock" ) {
		return "#B6A136";
	} else if ( type == "ghost" ) {
		return "#735797";
	} else if ( type == "dragon" ) {
		return "#6F35FC";
	} else if ( type == "dark" ) {
		return "#705746";
	} else if ( type == "steel" ) {
		return "#B7B7CE";
	} else if ( type == "fairy" ) {
		return "#D685AD";
	} else {
		return "#000";
	}
}

function getPokemonAbilities( list ) {
	var abilities = list;
	for (var i = abilities.length - 1; i>=0; i--) {
		var ability = abilities[i].ability.name.toCapitalize();
		var newAbility = document.createElement("span");
		if (abilities[i].is_hidden == false) {
			newAbility.className = "ability";
		} else {
			newAbility.className = "ability__hidden";
		}
		var newAbilityContents = document.createTextNode(ability.replace("-"," ").toCapitalize());
		newAbility.appendChild(newAbilityContents);
		document.getElementById("pokemonAbilities").appendChild(newAbility);
	}
}

function getPokemonTypes( list ) {
	var types = list;
	for (var i = types.length - 1; i>=0; i--) {
		var type = types[i].type.name.toCapitalize();
		var newType = document.createElement("span");
		newType.className = types[i].type.name + "__type";
		var newTypeContents = document.createTextNode(type);
		newType.appendChild(newTypeContents);
		document.getElementById("pokemonTypes").appendChild(newType);
	}
}

function getPokemonEvolutions( string ) {
	var xhttp = new XMLHttpRequest();
	var url = string;
	var pokemonEvolutions = document.querySelector( '#pokemonEvolutions' );
	var pokemonEvolutionMethods = document.querySelector( '#pokemonEvolutionMethods' );
	pokemonEvolutions.innerHTML = 'Loading...';
	xhttp.onreadystatechange = function() {
	    if (this.status == 200 && this.readyState == 4) {
	       pokemonEvolutions.innerHTML = '';
	       pokemonEvolutionMethods.innerHTML = ''
	       var result = JSON.parse( xhttp.responseText );
	       var chain = result.chain;

	       // init: eerste Pokémon in chain
	       var empty = document.createElement("td");
	       document.getElementById("pokemonEvolutionMethods").appendChild(empty);

	       var firstPokemon = document.createElement("td");
	       firstPokemon.className = "evolution";
	       var firstPokemonContents = document.createTextNode(chain.species.name.toCapitalize());
	       firstPokemon.appendChild(firstPokemonContents);
	       document.getElementById("pokemonEvolutions").appendChild(firstPokemon);

	       var evolution = chain.evolves_to[0];
	       var i = 0;
	       
	       while (evolution && evolution.hasOwnProperty('evolves_to')) {
	       if (evolution.length != 0 && evolution.hasOwnProperty('evolves_to')) {
	       	var level = document.createElement("td");
	       	level.className = "level";
	       	
	       	var levelUpMethod = null;
	       	var levelContents = evolution.evolution_details[0].min_level;
	       	if (levelContents != null) {
	       		levelContents = document.createTextNode(levelContents);
	       	} else {
	       		levelContents = document.createTextNode("Other");
	       	}
	       	level.appendChild(levelContents);
	       	document.getElementById("pokemonEvolutionMethods").appendChild(level);

	       	var empty = document.createElement("td");
	       	document.getElementById("pokemonEvolutionMethods").appendChild(empty);

	       	var arrow = document.createElement("td");
	       	arrow.className = "next";
	       	document.getElementById("pokemonEvolutions").appendChild(arrow);

	       	var icon = document.createElement("i");
	       	icon.className = "fa fa-arrow-right";
	       	document.getElementsByClassName("next")[i].appendChild(icon);
			var newEvolution = document.createElement("td");
			newEvolution.className = "evolution";
			var newEvolutionContents = document.createTextNode(evolution.species.name.toCapitalize());
			newEvolution.appendChild(newEvolutionContents);
			document.getElementById("pokemonEvolutions").appendChild(newEvolution);
			i++;
	       }
	       if (evolution && evolution.hasOwnProperty('evolves_to')) {
				evolution = evolution.evolves_to[0];
			}
		   }
	    } 
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function getPokemonStats( list ) {
	var stats = list;
	var hp = stats[5].base_stat;
	var atk = stats[4].base_stat;
	var def = stats[3].base_stat;
	var satk = stats[2].base_stat;
	var sdef = stats[1].base_stat;
	var speed = stats[0].base_stat;
	var ctx = document.getElementById("statsPanel").getContext('2d');
	myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"],
	        datasets: [{
	            label: 'Stats',
	            data: [hp, atk, def, satk, sdef, speed],
	            backgroundColor: [
	                'rgba(163, 203, 141, 1)',
	                'rgba(198, 172, 85, 1)',
	                'rgba(200, 118, 60, 1)',
	                'rgba(138, 186, 196, 1)',
	                'rgba(48, 137, 217, 1)',
	                'rgba(163, 103, 177, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        },
	       	legend: {
    			display: false,

			}
	    }
	});
}
function getPokemonPrimaryType ( list ) {
	var types = list;
	var primaryType = null;
	if (types.length == 1) {
		primaryType = types[0].type.name;
	} else if (types.length == 2) {
		primaryType = types[1].type.name;
	}
	return primaryType;
}

function getPokemonImage ( number ) {
	var image = document.getElementById("pokemonImage");
	var id = number;
	var url = null;
	if (id > 0 && id < 10) {
		url = "media/pokemon/00" + id.toString() + ".webp";
	}  else if (id >= 10 && id < 100) {
		url = "media/pokemon/0" + id.toString() + ".webp";
	} else if (id >= 100 && id <= 802) {
		url = "media/pokemon/" + id.toString() + ".webp";
	}
	image.src= url;
}

function formatPokemonId( number ) {
	var id = number;
	var idString = null;
	if (id > 0 && id < 10) {
		idString = "#00" + id.toString();
	}  else if (id >= 10 && id < 100) {
		idString = "#0" + id.toString();
	} else if (id >= 100 && id <= 801) {
		idString = "#" + id.toString();
	}
	return idString;
}

function getPokemonFlavorText ( pokemon ) {
	var xhttp = new XMLHttpRequest();
	var pokemonDescription = document.querySelector( '#pokemonDescription' );
	pokemonDescription.innerHTML = 'Loading...';
	xhttp.onreadystatechange = function() {
	    if (this.status == 200 && this.readyState == 4) {
	       // Typical action to be performed when the document is ready:
	       var result = JSON.parse( xhttp.responseText );
	       var description = null;
	       var flavorTextEntries = result.flavor_text_entries;
	       var evolution_url = result.evolution_chain.url;
	       getPokemonEvolutions(evolution_url)
	       var i = 0;
	       for (i = 0; i < flavorTextEntries.length; i++) {
	       	if (flavorTextEntries[i].version.name == "moon" && flavorTextEntries[i].language.name == "en") {
	       		description = flavorTextEntries[i].flavor_text;
	       	} else if (flavorTextEntries[i].version.name == "alpha-sapphire" && flavorTextEntries[i].language.name == "en") {
	       		description = flavorTextEntries[i].flavor_text;
	       	}
	       }
	       pokemonDescription.innerHTML = description;
	    } 
	};
	xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon-species/" + pokemon, true);
	xhttp.send();
}

function searchPokemon( pokemon ) {
	var xhttp = new XMLHttpRequest();
	var pokemonId = document.querySelector( '#pokemonId' );
	var pokemonName = document.querySelector( '#pokemonName' );
	var pokemonTypes = document.getElementById( 'pokemonTypes' );
	var pokemonStats = document.getElementById( 'statsPanel' );
	var content = document.getElementById("content");
	var loader = document.querySelector('.loader');
	xhttp.onreadystatechange = function() {
	    if (this.status == 200 && this.readyState == 4) {
	       // Typical action to be performed when the document is ready:
	       var result = JSON.parse( xhttp.responseText );
	       var name = result.forms[0].name.toCapitalize();
	       var id = result.id;
	       var types = result.types;
	       var abilities = result.abilities;
	       var stats = result.stats;
	       getPokemonFlavorText(pokemon);
	       pokemonId.innerHTML = formatPokemonId(id);
	       pokemonName.innerHTML = name;
	       pokemonTypes.innerHTML = "";
	       pokemonAbilities.innerHTML = "";
	       pokemonStats.innerHTML = "";
	       getPokemonTypes(types);
	       getPokemonAbilities(abilities);
	       var url = getPokemonImage(id);
	       if (myChart !== undefined) {
	       	myChart.destroy();
	       }
	       getPokemonStats(stats);
	       loader.classList.toggle( 'hidden', 'visible' );
	       content.style.borderColor = getTypeColor(getPokemonPrimaryType(types));
	       document.getElementById("content").style.display = "block";
	    } 
	    if (this.status == 404) {
	    	console.log( "Invalid input");
	    	loader.classList.toggle( 'hidden', 'visible' );
	    	document.getElementById("content").style.display = "none";
	    }
	};
	xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemon, true);
	xhttp.send();
}

document.addEventListener( 'DOMContentLoaded', function() {
	console.info( 'DOMContentLoaded is finished.' );
	var searchButton = document.querySelector("#search__button");
	var randomButton = document.querySelector("#random__button");
	var nightButton = document.querySelector("#night__button");
	var nightButtonClicks = 0;
	searchButton.addEventListener( 'click', function() {
		var input = document.getElementById('pokemonNameInput');
	  	if (input.value.length === 0) {
	  		console.log( 'No name given' );
		} else {
			loadingAnimation();
			var loader = document.querySelector('.loader');
			loader.classList.toggle( 'hidden' );
			searchPokemon( input.value.toLowerCase() );
		}
	});

	randomButton.addEventListener( 'click', function() {
		var random = Math.floor((Math.random() * 801) + 1);
		var loader = document.getElementById('lottie');
		loader.classList.toggle( 'hidden' );
	  	searchPokemon( random );
	});

	nightButton.addEventListener( 'click', function() {
		nightButtonClicks++;
		nightMode(nightButtonClicks);
	});


	document.addEventListener('keypress', function(e) {
		if(e.keyCode === 13) {
			var input = document.getElementById('pokemonNameInput');
	  		if (input.value.length === 0) {
	  			console.log( 'No name given' );
			} else {
				var loader = document.getElementById('lottie');
				loader.classList.toggle( 'hidden' );
				searchPokemon( input.value.toLowerCase() );
			}
		}
	});
});