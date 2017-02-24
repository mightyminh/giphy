

// giphy starts here!
$(document).ready(function()
{
	// put the original buttons/pokemon into arrays with "topics" variable. 
	var topics = ['Pikachu', 'Bulbasaur', 'Squirtle','Charmander', 'Blastoise', 'Eevee', 'Togepi', 'Mewtwo', 'Raichu', 'Lugia', 'Rowlet', 'Charizard', 'Mew'];

	
	function renderButtons()
	{
	
		$('#topicsView').empty();

		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++)
		{
	

			var a = $('<button type="button">') 
			a.addClass('topicButton'); 
			a.addClass('btn btn-primary'); 
			a.attr('data-name', topics[i]); 
			a.text(topics[i]); 
			$('#topicsView').append(a); 
			console.log ()
		}
	}

		
		$('#addTopic').on('click', function(){

			console.log('button clicked');


			// This line of code will grab the input from the textbox
			var topic = $('#topicInput').val().trim();

			console.log(topic);
			if (topic != "")
			{
				// The topic from the textbox is then added to our array
				topics.push(topic);
				// Our array then runs which handles the processing of our topic array
				renderButtons();
			}

			else
			{
				$('#topicInput').attr("placeholder", "Please enter a Pokémon to search.")
				renderButtons();
			}

	

			// users can hit enter as well as the "submit"
			return false;
		});


	//Function for displaying gifs and still images and inserting GIPHY with limit=10 based on API documentation 
	function displaytopicGif()
	{

		$('#gifView').empty();
		var poke = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + poke + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";
		console.log()

		//some ajax here

		$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) 
		{

			// Creates a generic div to hold the topic
			var topicDiv = $('<div class="topicImage">');
			console.log(response);
			for (i=0; i < response.data.length; i++) 
			{
				var stillImage = response.data[i].images.fixed_height_still.url;
				console.log(stillImage);

				var playImage = response.data[i].images.fixed_height.url;
				console.log("Moving"+ playImage);

				var rating = response.data[i].rating;
				console.log(rating);

				// post the rating in uppercase
				var pOne = $('<p>').text( "Rating: " + rating.toUpperCase());
				topicDiv.append(pOne);

				var image = $("<img>").attr("src", stillImage);
				image.attr("playsrc", playImage); 
				image.attr("stopsrc", stillImage); 
				
				topicDiv.append(image);

				// Puts the entire topic above the previous Pokémon.
				$('#gifView').append(topicDiv);

				image.addClass('playClickedGif'); // Added a class to image tag


			}	
		});
	}

	// pause and play poké gifs
	function swapGif()
	{
		//Stop Image 
		var playImage = $(this).attr('playsrc');

		console.log(playImage);


		//Stop Image 
		var stopImage = $(this).attr('stopsrc');

		console.log(stopImage);

		if ($(this).attr('playsrc') == $(this).attr('src'))
		{
			//This changes the image src
			$(this).attr('src', stopImage);
		}

		else
		{
			$(this).attr('src', playImage);
		}
	}

	
	renderButtons();


	$(document).on('click', '.topicButton', displaytopicGif);
	$(document).on('click', '.playClickedGif', swapGif);

});