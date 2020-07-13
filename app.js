(function ($) {

  var app = $.sammy('#main', function () {

    this.get('#/', function (context) {
      $(".app").append("<ul class='rslides'></ul>");
      $(".app ul").append("<li><img src='imgs/dog1.jpg' alt=''></li>");
      $(".app ul").append("<li><img src='imgs/dog2.jpg' alt=''></li>");
      $(".app ul").append("<li><img src='imgs/dog3.jpg' alt=''></li>");
      $(".app").append("<div class='quote'><h1>Saving one dog will not change the world, but surely for that one dog, the world will change forever.</h1></div>");
    });
    this.get('#/:type', function (context) {
      console.log(context.params.type);
      let animals = [];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          console.log(animals);
          $(".app").append("<div class='animals'></div>");
          let id=0;
          for (let item of animals) {
            console.log(item.type);
            if (item.type === context.params.type) {
              $(".app .animals").append("<div class='animal'></div>");
              $(".app .animal:eq("+id+")").append("<a href='#/"+item.type+"/"+item.id+"'><h2>"+item.name+" "+item.age+"</h2></a>");
              $(".app .animal:eq("+id+")").append("<img src="+item.img+">");
              id++;
            }
          }
        })
    });
    this.get('#/:type/:id', function (context) {
      console.log(context.params.type);
      let animals = [];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          console.log(animals);
          $(".app").append("<div class='animal-details'></div>");
          console.log(context.params.id);
          for (let item of animals) {
            if (parseInt(item.id) === parseInt(context.params.id) && item.type===context.params.type) {
              $(".animal-details").append("<div class='content'></div");
              $(".content").append("<h2>"+item.name+"</h2");
              $(".content").append("<img src="+item.img+">");
              $(".content").append("<h1> Age: "+item.age+"</h1");
              $(".content").append("<h1> Gender: "+item.gender+"</h1");
              $(".content").append("<h1> Charcter: "+item.description+"</h1");
              $(".content").append("<button>ADOPT</button>");
              id++;
            }
          }
        })
    });
    
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);