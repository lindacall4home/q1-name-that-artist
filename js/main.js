$(document).ready(function(){

  function  ArtistTest(numberQuestions){
    this.numberQuestions = numberQuestions;
    this.currentQuestion = 1;
    this.artistIndex = 0;
    this.artistQuestions = [];
    this.getNextArtist = function(){
      return artists[this.artistIndex++];
    };
    this.getArtistWork = function(artist){
      return artist.works[0];
    };
    for(i = 0; i < numberQuestions; i++){
      let nextArtist = this.getNextArtist();
      let nextQuestion = new ArtistQuestion(nextArtist, this.getArtistWork(nextArtist));
      this.artistQuestions.push(nextQuestion);
    }
  }


  function renderArtists(){
    for(let i = 0; i < artists.length; i++){
      $("#artists").append('<a href="#" class="col-xs-4 col-sm-4 col-md-2 thumbnail"><img src="' + artists[i].thumbnail + '" alt="' + artists[i].shortName + ' " style="width:160px; height:160px"><div class="caption"><h3>' + artists[i].shortName + '</h3></div></a>');
    }
  }

  function displayMoreEraInfo(era){
    $('#more-info').text(eras[era].description);
    $("#more-popup").addClass('show');
  }

  function createEraLinks(artist){
    $('.more-era-info').remove();
    for (let i = 0; i < artist.era.length; i++){
      let $clickableEra = $('<div class="click-text more-era-info" id="' + artist.era[i] + '-more">' + artist.era[i] + '</div>').appendTo('#artist-era');
    }
    $('.more-era-info').click(function(event){
      displayMoreEraInfo($(event.currentTarget).text());
    });

  }

  function populateSelectedArtist(artist){
    $('#artist-id').text(artist.wikipage);
    $('#selected-artist-name').text(artist.fullName);
    $('#selected-artist-image').attr("src", artist.thumbnail);
    $('#artist-birth').text("Birth: " + artist.birth);
    $('#artist-death').text("Death: " + artist.death);
    $('#artist-genre').text("Genre: " + artist.genre.join(", "));
    $('#artist-location').text("Location: " + artist.location.join(", "));
    $('.composer-audio').remove();
    for(let i = 0; i < artist.works.length; i++){
      console.log(artist.works[i].url);
      $('#composer-works').append('<iframe class="composer-audio" id="composer-audio' + i + '" src="' + artist.works[i].url + '"></iframe>');
    }
    createEraLinks(artist);
    updateAudioPlayer(artist);
  }

  function updateAudioPlayer(artist){
    $('#selected-work-title').text(artist.works[0].title);
    let $audioSource = $('#selected-work-audio');
    $audioSource.attr("src", "./audio/" + artist.works[0].file);
    $audioSource.load();
  }

  function compareArtistByImage(imageSrc, artist){
    return artist.thumbnail === imageSrc;
  }

  function compareArtistByShortName(shortName, artist){
    return artist.shortName === shortName;
  }

  function displayMoreArtistInfo(){
    let artistId = $('#artist-id').text();

    $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=" + artistId + "&prop=extracts&exintro=&explaintext=&format=json").done(function(data){

      $('#more-info').text(data.query.pages[0].extract);
      $("#more-popup").addClass('show');

    });
  }

  function closeMoreArtistInfo(){
    $("#more-popup").removeClass('show');
  }

  function ArtistWork(workTitle, workUrl){
    this.workTitle = workTitle;
    this.workUrl = workUrl;
  }

  function ArtistQuestion(artist, artistWork){
    this.artist = artist;
    this.artistWork = artistWork;
    this.studentAnswer = "";
  }

  function gradeAnswer(){
    console.log("grading: " + artistTest.artistQuestions[artistTest.currentQuestion - 1].artist.fullName);
    
    var artistQuestion = artistTest.artistQuestions[artistTest.currentQuestion - 1];
    $("#answer-modal-label").text("Question " + artistTest.currentQuestion + " of " + artistTest.numberQuestions);
  }

  function displayQuestion(){
    console.log("question: " + artistTest.artistQuestions[artistTest.currentQuestion - 1].artist.fullName);

    var artistQuestion = artistTest.artistQuestions[artistTest.currentQuestion - 1];

    $("#question-modal-label").text("Question " + artistTest.currentQuestion + " of " + artistTest.numberQuestions);
    $("#question-audio-source").attr("src", artistQuestion.artistWork.previewUrl);
    $("#question-audio-source").parent().load();
    let correct = Math.floor(Math.random() * 4);
    $('label[for=answer' + correct + ']').text(artistQuestion.artist.fullName);
    $('#answer-image' + correct).attr("src", artistQuestion.artist.thumbnail);
    for (let i = 0; i < 4; i++){
      if(i !== correct){
        let wrong = correct;
        while(wrong === correct){
          wrong = Math.floor(Math.random() * artists.length);
        }
        $('label[for=answer' + i + ']').text(artists[wrong].fullName);
        $('#answer-image' + wrong).attr("src", artists[wrong].thumbnail);
      }
    }
  }

  function addEventListeners(){

    $('#artists').on('click', '.caption', function(event){
      let artist = artists.find(compareArtistByShortName.bind(this, $(event.currentTarget).text()));
      populateSelectedArtist(artist);
    });

    $('#more-artist-info').click(displayMoreArtistInfo);
    $('#close-more-info').click(closeMoreArtistInfo);
    $('#start-test').click(displayQuestion);
    $('#submit-answer').click(gradeAnswer);
    $('.test-answer').click(function(event){
      artistTest.artistQuestions[artistTest.currentQuestion - 1].studentAnswer = $(event.currentTarget).next().next().text();
      console.log(artistTest);
    });
  }

  var artistTest = new ArtistTest(10);
  addEventListeners();
  renderArtists();
  populateSelectedArtist(artists[0]);
});






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
  //




// $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Antonio_Vivaldi&prop=extracts|pageimages&exintro=&explaintext=&generator=images&format=json").done(function(data){

// $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Antonio_Vivaldi&prop=extracts|pageimages&exintro=&explaintext=&format=json").done(function(data){
