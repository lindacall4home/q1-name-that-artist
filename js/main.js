$(document).ready(function(){
  var artistTest;

  function renderArtists(){
    for(let i = 0; i < artists.length; i++){
      $("#artists").append('<div class="pad-cards col-xs-4 col-sm-4 col-md-2 col-lg-2"><a href="#" class=" thumbnail"><img class="artist-image" src="' + artists[i].thumbnail + '"  alt="' + artists[i].shortName + '"><div class="caption"><h3>' + artists[i].shortName + '</h3></div></a></div>');
    }
  }

  function createEraLinks(artist){
    $('.more-era-info').remove();
    for (let i = 0; i < artist.era.length; i++){
      $('<div class="click-text more-era-info" id="' + eras[artist.era[i]].wikipage + '-more" data-toggle="modal" data-target="#more-info-modal">' + artist.era[i] + '</div>').appendTo('#artist-era');
    }
    $('.more-era-info').click(function(event){
      displayMoreEraInfo($(event.currentTarget).text());
    });
  }

  function createGenreLinks(artist){
    $('.more-genre-info').remove();
    for (let i = 0; i < artist.genre.length; i++){
      $('<div class="click-text more-genre-info" id="' + musicalTerms[artist.genre[i]].wikipage + '-more" data-toggle="modal" data-target="#more-info-modal">' + artist.genre[i] + '</div>').appendTo('#artist-genre');
    }
    $('.more-genre-info').click(function(event){
      displayMoreGenreInfo($(event.currentTarget).text());
    });
  }

  function populateSelectedArtist(artist){
    console.log("populating artist " + artist.fullName);
    $('#artist-id').text(artist.wikipage);
    $('#selected-artist-name').text(artist.fullName);
    $('#selected-artist-image').attr("src", artist.thumbnail);
    $('#artist-birth').text("Birth: " + artist.birth);
    $('#artist-death').text("Death: " + artist.death);
    $('#artist-location').text("Location: " + artist.location.join(", "));
    $('#artist-style-info').text(artist.description);
    $('.composer-audio').remove();
    for(let i = 0; i < artist.works.length; i++){
      $('#composer-works').append('<iframe class="composer-audio" src="' + artist.works[i].url + '"></iframe>');
    }
    createEraLinks(artist);
    createGenreLinks(artist);
    let selectedArtistHeight = $('#outer-nav').height();
    console.log('nav height: ' + selectedArtistHeight);
    $('body').css('padding-top', selectedArtistHeight);
  }

  function displayMoreArtistInfo(){
    let artistId = $('#artist-id').text();

    $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=" + artistId + "&prop=extracts&exintro=&explaintext=&format=json").done(function(data){

      $('#more-info').text(data.query.pages[0].extract);
      $('#more-modal-label').text($('#selected-artist-name').text());

    });
  }

  function displayMoreEraInfo(linkText){
    $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=" + eras[linkText].wikipage + "&prop=extracts&exintro=&explaintext=&format=json").done(function(data){

      $('#more-info').text(data.query.pages[0].extract);
      $('#more-modal-label').text(linkText);
    });
  }

  function displayMoreGenreInfo(linkText){
    $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=" + musicalTerms[linkText].wikipage + "&prop=extracts&exintro=&explaintext=&format=json").done(function(data){
      $('#more-info').text(data.query.pages[0].extract);
      $('#more-modal-label').text(linkText);
    });
  }

  function ArtistQuestion(artist, artistWork){
    this.artist = artist;
    this.artistWork = artistWork;
    this.studentAnswer = "";
    this.answerCorrect = false;
  }

  function  ArtistTest(numberQuestions, advancedTest){
    this.advancedTest = advancedTest;
    this.numberQuestions = numberQuestions;
    this.currentQuestion = 0;
    this.artistQuestions = [];

    this.getNextArtist = function(){
      let nextArtist;
      do{
        nextArtist = artists[Math.floor(Math.random() * artists.length)];
      } while(this.artistQuestions.find(compareArtistByShortName(nextArtist.shortName)) !== undefined);
      return nextArtist;
    };

    this.getArtistWork = function(artist){
      if(this.advancedTest){
        return artist.otherWorks[Math.floor(Math.random() * artist.otherWorks.length)];
      }
      else{
        return artist.works[Math.floor(Math.random() * artist.works.length)];
      }
    };

    for(i = 0; i < numberQuestions; i++){
      let nextArtist = this.getNextArtist();
      let nextQuestion = new ArtistQuestion(nextArtist, this.getArtistWork(nextArtist));
      this.artistQuestions.push(nextQuestion);
    }
  }

  function gradeAnswer(){
    var artistQuestion = artistTest.artistQuestions[artistTest.currentQuestion - 1];

    $("#answer-modal-label").text("Question " + artistTest.currentQuestion + " of " + artistTest.numberQuestions);

    console.log("student Answer = " + artistQuestion.studentAnswer);
    console.log("correct Answer = " + artistQuestion.artist.fullName);
    if(artistQuestion.studentAnswer === artistQuestion.artist.fullName){
      artistQuestion.answerCorrect = true;
      showAnswerIsCorrect();
    }
    else{
      artistQuestion.answerCorrect = false;
      showAnswerIsIncorrect();
    }

    $('#correct-answer-image').attr("src", artistQuestion.artist.thumbnail);
    $('#correct-answer-title').text(artistQuestion.artist.fullName + ":  '" + artistQuestion.artistWork.title + "'");

  }

  function showAnswerIsCorrect(){
    $('#answer-correct').removeClass('hide');
    $('#answer-correct').addClass('show-block');
    $('#answer-wrong').removeClass('show-block');
    $('#answer-wrong').addClass('hide');
  }

  function showAnswerIsIncorrect(){
    $('#answer-correct').removeClass('show-block');
    $('#answer-correct').addClass('hide');
    $('#answer-wrong').removeClass('hide');
    $('#answer-wrong').addClass('show-block');
  }

  function displayScore(){
    let numberCorrect = 0;
    let scoreText = '';
    let scoreComment = '';
    let scoreGrade = '';

    for(let i = 0; i < artistTest.artistQuestions.length; i++){
      if(artistTest.artistQuestions[i].answerCorrect){
        numberCorrect++;
      }
    }

    scoreText = 'You correctly identified '+ numberCorrect + ' out of ' + artistTest.artistQuestions.length + ' artists';

    let percentCorrect = numberCorrect/artistTest.artistQuestions.length * 100;

    if(percentCorrect >= 90){
      scoreText = scoreText + '!';
      scoreGrade = '<span  class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>Awesome!<span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>';
      scoreComment = 'You are a master at identifying composers!';
    }
    else if(percentCorrect >= 70){
      scoreText = scoreText + '!';
      scoreGrade = '<span>Great job!</span>';
      scoreComment = 'You have learned a lot about classical composers!';
    }
    else if(percentCorrect >= 60){
      scoreText = scoreText + '.';
      scoreGrade = '<span>Nice work.</span>';
      scoreComment = 'Keep studying to improve your score!';
    }
    else {
      scoreText = scoreText + '.';
      scoreGrade = '<span>What Happened?!</span>';
      scoreComment = 'You should study more!';
    }
    $('#final-score').text(scoreText);
    $('#score-grade').html(scoreGrade);
    $('#score-comment').text(scoreComment);
  }

  function showNextQuestionButton(){
    $('#next-question').removeClass('hide');
    $('#next-question').addClass('show-inline');
    $('#display-score').removeClass('show-inline');
    $('#display-score').addClass('hide');
  }

  function showGetScoreButton(){
    $('#next-question').removeClass('show-inline');
    $('#next-question').addClass('hide');
    $('#display-score').removeClass('hide');
    $('#display-score').addClass('show-inline');
  }

  function displayQuestion(){
    artistTest.currentQuestion++;

    if(artistTest.currentQuestion === artistTest.artistQuestions.length){
      showGetScoreButton();
    }
    else{
      showNextQuestionButton();
    }

    console.log("correct answer for question : " + artistTest.currentQuestion  + " = " + artistTest.artistQuestions[artistTest.currentQuestion - 1].artist.fullName);

    var artistQuestion = artistTest.artistQuestions[artistTest.currentQuestion - 1];

    $("#question-modal-label").text("Question " + artistTest.currentQuestion + " of " + artistTest.numberQuestions);
    $("#question-audio-source").attr("src", artistQuestion.artistWork.previewUrl);
    $("#question-audio-source").parent().load();

    let correct = Math.floor(Math.random() * 4);
    $('label[for=answer' + correct + ']').text(artistQuestion.artist.fullName);
    $('#answer-image' + correct).attr("src", artistQuestion.artist.thumbnail);

    let answerArr = [{}, {}, {}, {}];
    answerArr[correct] = artistQuestion.artist;

    for (let i = 0; i < 4; i++){
      if(i !== correct){
        do{
          wrong = Math.floor(Math.random() * artists.length);
        }while(answerArr.find(compareArtistByShortName(artists[wrong].shortName)) !== undefined);

        answerArr[i] = artists[wrong];
        $('label[for=answer' + i + ']').text(artists[wrong].fullName);
        $('#answer-image' + i).attr("src", artists[wrong].thumbnail);
      }
    }
    artistQuestion.studentAnswer = answerArr[0].fullName;
    console.log("answer 0 = " + answerArr[0].shortName);
    console.log("answer 1 = " + answerArr[1].shortName);
    console.log("answer 2 = " + answerArr[2].shortName);
    console.log("answer 3 = " + answerArr[3].shortName);
    $('#answer0').prop("checked", true);
  }


  function administerTest(advancedTest){
    return function(){
      artistTest = new ArtistTest(3, advancedTest);
      console.log(artistTest);
      displayQuestion();
    };
  }

  function compareArtistByImage(imageSrc){
    return function(element){
      return element.thumbnail === shortName;
    };
  }

  function compareArtistByShortName(shortName){
    return function(element){
      return element.shortName === shortName;
    };
  }


  function addEventListeners(){

    $('#artists').on('click', '.caption', function(event){
      console.log("click on " + $(event.currentTarget).text());
      let artist = artists.find(compareArtistByShortName($(event.currentTarget).text()));
      populateSelectedArtist(artist);
    });

    $('#more-artist-info').click(displayMoreArtistInfo);
    $('#start-test').click(administerTest(false));
    $('#start-advanced-test').click(administerTest(true));
    $('#next-question').click(displayQuestion);
    $('#display-score').click(displayScore);
    $('#submit-answer').click(gradeAnswer);
    $('.select-artist').click(function(event){
      artistTest.artistQuestions[artistTest.currentQuestion - 1].studentAnswer = $(event.currentTarget).next().next().text();
    });
  }

  addEventListeners();
  renderArtists();
  populateSelectedArtist(artists[0]);
});
