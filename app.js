(function ($) {

  var app = $.sammy('#main', function () {
    function urlNavigation(context) {
      $('.left h1').on('click', () => {
        context.app.setLocation('#/');
        location.reload();
      })
      $('.middle h1:eq(0)').on('click', () => {
        context.app.setLocation('#/dogs');
        location.reload();
      })
      $('.middle h1:eq(1)').on('click', () => {
        context.app.setLocation('#/cats');
        location.reload();
      })
      $('.middle h1:eq(2)').on('click', () => {
        context.app.setLocation('#/rabbits');
        location.reload();
      })
      $('.right h1').on('click', () => {
        context.app.setLocation('#/contact');
        location.reload();
      })
    }
    this.get('#/', function (context) {
      $(".loading").remove();
      urlNavigation(context);
      $(".app").append("<ul class='rslides'></ul>");
      $(".app ul").append("<li><img src='imgs/dog1.jpg' alt=''></li>");
      $(".app ul").append("<li><img src='imgs/dog2.jpg' alt=''></li>");
      $(".app ul").append("<li><img src='imgs/dog3.jpg' alt=''></li>");
      $(".app").append("<div class='quote'><h1>Saving one dog will not change the world, but surely for that one dog, the world will change forever.</h1></div>");
    });
    this.get('#/contact', function (context) {
      $(".loading").remove();
      urlNavigation(context);
      $(".app").append("<div class='contact'></div>");
      $(".app .contact").append("<div class='contact-details'></div>");
      $(".contact-details").append("<h1>80-288 Gdańsk RandomName 5 Street</h1>");
      $(".contact-details").append("<h1>Phone: 123 456 789</h1>");
      $(".contact-details").append("<h1>Email: randomemail@gmail.com</h1>");
      $(".contact-details").append("<h1>Adoption from Monday to Friday</h1>");
      $(".contact-details").append("<h1>Working hours: 8:00-16:00</h1>");

    });
    this.get('#/:type', function (context) {
      urlNavigation(context);
      console.log(context.params.type);
      let animals = [];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          console.log(animals);
          $(".loading").remove();
          $(".app").append("<div class='animals'></div>");
          let id = 0;
          for (let item of animals) {
            console.log(item.type);
            if (item.type === context.params.type) {
              $(".app .animals").append("<div class='animal'></div>");
              $(".app .animal:eq(" + id + ")").append("<h2>" + item.name + " " + item.age + "</h2>");
              $(".app .animal:eq(" + id + ")").append("<img src=" + item.img + ">");
              $('.animal h2:eq(' + id + ')').on('click', () => {
                context.app.setLocation("#/" + item.type + "/" + item.id);
                location.reload();
              })
              id++;
            }
          }
        })
    });
    this.get('#/:type/:id', function (context) {
      urlNavigation(context);
      console.log(context.params.type);
      let animals = [];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          console.log(animals);
          $(".loading").remove();
          $(".app").append("<div class='animal-details'></div>");
          console.log(context.params.id);
          for (let item of animals) {
            if (parseInt(item.id) === parseInt(context.params.id) && item.type === context.params.type) {
              $(".animal-details").append("<div class='content'></div");
              $(".content").append("<h2>" + item.name + "</h2");
              $(".content").append("<img src=" + item.img + ">");
              $(".content").append("<h1> Age: " + item.age + "</h1");
              $(".content").append("<h1> Gender: " + item.gender + "</h1");
              $(".content").append("<h1> Charcter: " + item.description + "</h1");
              $(".content").append("<button>ADOPT</button>");
              $('.content button').on('click', () => {
                context.app.setLocation("#/" + item.type + "/" + item.id + "/adoption");
                location.reload();
              })
              id++;
            }
          }
        })
    });
    this.get('#/:type/:id/adoption', function (context) {
      urlNavigation(context);
      let inputValues = ["First Name", "Last Name", "City", "Street", "Phone Number", "Email"];
      let errors = ["First name must containt from 3 to 12 a-z letters", "Last Name must containt from 3 to 12 a-z letters", "City name must be 3 or more letters long", "Street name must be 3 or more letters long", "Phone Number must contain 9 digits without space", "Please enter correct email"];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          $(".loading").remove();
          $(".app").append("<div class='adoption-form'></div");
          $(".adoption-form").append("<div class='adoption-content'></div>");
          $(".adoption-content").append("<h2>Adoption form</h2>");
          for (let i = 0; i < inputValues.length; i++) {
            $(".adoption-content").append("<input value='" + inputValues[i] + "' type='text'>");
            $(".adoption-content").append("<p id='hidden'>" + errors[i] + "</p>");
          }
          $(".adoption-content").append("<input value='" + animals[context.params.id].name + "' type='text' readonly>");
          $(".adoption-content").append("<input value='" + animals[context.params.id].type.substr(0, animals[context.params.id].type.length - 1) + "' type='text' readonly>");
          $(".adoption-content input:lt(6)").on('focus', (e) => {
            if (e.target.value === "First Name" || e.target.value === "Last Name" || e.target.value === "City" || e.target.value === "Street" || e.target.value === "Email" || e.target.value === "Phone Number") {
              e.target.value = ""
            }
          });
          $(".adoption-content input:gt(5)").css({ 'background-color': '#b5c7a3' });
          for (let i = 0; i < inputValues.length; i++) {
            $(".adoption-content input:eq(" + i + ")").on('blur', (e) => {
              if (e.target.value === "" || e.target.value === " ") {
                e.target.value = inputValues[i];
              }
            });
          }
          $(".adoption-content").append("<button>ADOPT</button>");
          $(".adoption-content button").on('click', () => {
            let correctFlag = true;
            if ($(".adoption-content input:eq(5)")[0].value.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null) {
              $(".adoption-content p:eq(5)").attr('id', '');
              correctFlag = false;
            } else {
              $(".adoption-content p:eq(5)").attr('id', 'hidden');
            }
            if ($(".adoption-content input:eq(4)")[0].value.match(/^[0-9]{9}$/) === null) {
              $(".adoption-content p:eq(4)").attr('id', '');
              correctFlag = false;
            } else {
              $(".adoption-content p:eq(4)").attr('id', 'hidden');
            }
            if ($(".adoption-content input:eq(0)")[0].value.match(/^[a-zA-Z0-9\.\-_]{3,12}$/) === null) {
              $(".adoption-content p:eq(0)").attr('id', '');
              correctFlag = false;
            } else {
              $(".adoption-content p:eq(0)").attr('id', 'hidden');
            }
            if ($(".adoption-content input:eq(1)")[0].value.match(/^[a-zA-Z0-9\.\-_]{3,12}$/) === null) {
              $(".adoption-content p:eq(1)").attr('id', '');
              correctFlag = false;
            } else {
              $(".adoption-content p:eq(1)").attr('id', 'hidden');
            }
            if (($(".adoption-content input:eq(2)")[0].value.length < 3) || $(".adoption-content input:eq(2)")[0].value === "City") {
              $(".adoption-content p:eq(2)").attr('id', '');
              correctFlag = false;
            } else {
              $(".adoption-content p:eq(2)").attr('id', 'hidden');
            }
            if (($(".adoption-content input:eq(3)")[0].value.length < 3) || $(".adoption-content input:eq(3)")[0].value === "Street") {
              $(".adoption-content p:eq(3)").attr('id', '');
              correctFlag = false;
            } else {
              $(".adoption-content p:eq(3)").attr('id', 'hidden');
            }
            if (correctFlag) {
              fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/adoptions', {
                method: 'POST',
                body: JSON.stringify({
                  firstName: $(".adoption-content input:eq(0)")[0].value,
                  lastName: $(".adoption-content input:eq(1)")[0].value,
                  city: $(".adoption-content input:eq(2)")[0].value,
                  street: $(".adoption-content input:eq(3)")[0].value,
                  phoneNumber: $(".adoption-content input:eq(4)")[0].value,
                  email: $(".adoption-content input:eq(5)")[0].value,
                  animalName: $(".adoption-content input:eq(6)")[0].value,
                  animalType: $(".adoption-content input:eq(7)")[0].value
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
              }).then(data => {
                console.log(data);
                alert('adoption request sent');
                  $(".adoption-form").remove();
                  $(".app").append("<div class='info'></div>");
                  $(".info").append("<div class='info-details'></div>");
                  $(".info-details").append("<h2>Adoption request sent!</h2>");
                  $(".info-details").append("<h1>We will respond to you soon</h1>");
                  $(".info-details").append("<h1>You did something great today</h1>");

                });

            }
          })
        })
    });
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);
