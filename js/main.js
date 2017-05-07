$(document).ready(function(){

  var renderArtists = function(){
    for(let i = 0; i < artists.length; i++){
      $("#artists").append('<a href="#" class="col-xs-4 col-sm-4 col-md-2 thumbnail"><img src="' + artists[i].thumbnail + '" alt="' + artists[i].shortName + ' " style="width:160px; height:160px"><div class="caption"><h3>' + artists[i].shortName + '</h3></div></a>');
    }
  };

  var populateSelectedArtist = function(artist){
    $('#selected-artist-name').text(artist.shortName);
    $('#selected-artist-image').attr("src", artist.thumbnail);
    $('#artist-birth').text("Birth: " + artist.birth);
    $('#artist-death').text("Death: " + artist.death);
    $('#artist-genre').text("Genre: " + artist.genre.join(", "));
    $('#artist-location').text("Location: " + artist.location.join(", "));
    updateAudioPlayer(artist);
  };

  var updateAudioPlayer = function(artist){
    $('#selected-work-title').text(artist.works[0].title);
    let $audioSource = $('#selected-work-audio');
    $audioSource.attr("src", "./audio/" + artist.works[0].file);
    $audioSource.load();
  };

  var compareArtistByImage = function(imageSrc, artist){
    return artist.thumbnail === imageSrc;
  };

  var compareArtistByShortName = function(shortName, artist){
    return artist.shortName === shortName;
  };

  var displayMoreArtistInfo = function(){
    $('#more-artist-info').toggleClass('show');
  };

  var addEventListeners = function(){

    $('#artists').on('click', '.caption', function(event){
      let artist = artists.find(compareArtistByShortName.bind(this, $(event.currentTarget).text()));
      populateSelectedArtist(artist);
    });

    $('.more-info').click(displayMoreArtistInfo);
  };

  addEventListeners();
  renderArtists();
  populateSelectedArtist(artists[0]);
});





  // var updateComposers = function(data){
  //   info = data.query.normalized;
  //   image = data.query.pages;
  //   for(let i = 0; i < info.length; i++){
  //     let composer = composers.find(compareComposerByWikiPage.bind(this, info.from));
  //     if (composer !== undefined){
  //       composer.name = info.from;
  //       if(image.thumbnail !== undefined){
  //         composer.thumbnail = image.thumbnail.source;
  //       }
  //     }
  //   }
  //   console.log("updated composers : " + composers);
  // };
  //
  // var getComposerPageNames = function(){
  //   let pageNames = "";
  //   for(let i = 0; i < composers.length; i++){
  //     if(i > 0){
  //       pageNames = pageNames + "|";
  //     }
  //     pageNames = pageNames + composers[i].wikipage;
  //   }
  //   console.log("page names: " + pageNames);
  //   return pageNames;
  // };
  //
  // var getComposerData = function(){
  //   let pageNames = getComposerPageNames();
  //   console.log(pageNames);
  //   $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=" + pageNames + "&prop=pageimages&format=json").done(function(data){
  //     console.log(data);
  //     //updateComposers(data);
  //     //renderComposers();
  //   });
  // };


  // $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Antonio_Vivaldi&prop=extracts|pageimages&exintro=&explaintext=&generator=images&format=json").done(function(data){      console.log(data);
  //     var music = data.query.pages.filter(function(element){
  //       return element.title.endsWith(".ogg");
  //     });
  //     if(music.length > 0){
  //       $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&prop=imageinfo&titles=File%301%20%2D%20Vivaldi%20Spring%20mvt%201%20Allegro%20%2D%20John%20Harrison%20violin.ogg&iiprop=url&iiurlwidth=220&format=json").done(function(data2){
  //         console.log(music[0].title);
  //         console.log(data2);
  //         // $("#selected-composition").attr("href", "https://en.wikipedia.org/wiki/" + music[0].title);
  //       });
  //     }
  //     console.log(music);
  //
  //   });


  // $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Antonio_Vivaldi&prop=extracts|pageimages&exintro=&explaintext=&format=json").done(function(data){
  //   console.log(data);
  //   let newComposer = createComposer(data);
  //   addComposerToPage(newComposer);
  //   composers.push(newComposer);
  // });
  // $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Ludwig_van_Beethoven&prop=extracts|pageimages&exintro=&explaintext=&format=json").done(function(data){
  //   let newComposer = createComposer(data);
  //   addComposerToPage(newComposer);
  //   composers.push(newComposer);
  //
  // });




// $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Antonio_Vivaldi&prop=extracts|pageimages&exintro=&explaintext=&generator=images&format=json").done(function(data){

// $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Antonio_Vivaldi&prop=extracts|pageimages&exintro=&explaintext=&format=json").done(function(data){
