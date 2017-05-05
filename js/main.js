$(document).ready(function(){
  const composers = [];

  function createComposer(data){
    info = data.query.pages[0];
    newComposer = {
      name: info.title,
      thumbnail: info.thumbnail,
      summary: info.extract
    };
    return newComposer;

  }

  function addComposerToPage(composer){
    console.log(composer);
    if(composer.thumbnail === undefined){
      $("#composers").append('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="50" height="50" class="img-responsive composer-image" alt="Generic placeholder thumbnail">');
    }
    else{
      let $composerImage = $("#composers").append('<img src=' + composer.thumbnail.source + ' width="50" height="50" class="img-responsive composer-image" alt="Generic placeholder thumbnail">');

    }
    $("#composers").append("<h4>" + composer.name + "</h4>");
  }

  $('#composers').click(function(){
    let $selectedComposer = $('#selected-composer');

    if($selectedComposer.text() === "hello"){
      $selectedComposer.text("");
    }
    else{
      $selectedComposer.text("hello");
    }
      $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Antonio_Vivaldi&prop=extracts|pageimages&exintro=&explaintext=&generator=images&format=json").done(function(data){      console.log(data);
      var music = data.query.pages.filter(function(element){
        return element.title.endsWith(".ogg");
      });
      if(music.length > 0){
        $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&prop=imageinfo&titles=File%301%20%2D%20Vivaldi%20Spring%20mvt%201%20Allegro%20%2D%20John%20Harrison%20violin.ogg&iiprop=url&iiurlwidth=220&format=json").done(function(data2){
          console.log(music[0].title);
          console.log(data2);
          // $("#selected-composition").attr("href", "https://en.wikipedia.org/wiki/" + music[0].title);
        });
      }
      console.log(music);

    });

  });

  $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Antonio_Vivaldi&prop=extracts|pageimages&exintro=&explaintext=&format=json").done(function(data){
    console.log(data);
    let newComposer = createComposer(data);
    addComposerToPage(newComposer);
    composers.push(newComposer);
  });
  $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Ludwig_van_Beethoven&prop=extracts|pageimages&exintro=&explaintext=&format=json").done(function(data){
    let newComposer = createComposer(data);
    addComposerToPage(newComposer);
    composers.push(newComposer);

  });



});

// $.getJSON("https://g-wikipedia.herokuapp.com/w/api.php/?action=query&formatversion=2&titles=Antonio_Vivaldi&prop=extracts|pageimages&exintro=&explaintext=&generator=images&format=json").done(function(data){

//$("#composers").append('<p>' + composer.summary + '</p>');
