
(function ($) {

  var app = $.sammy(function () {
    let homeRender = true;
    function urlNavigation(context) {
      $('.left h1').on('click', () => {
        $('.loading').remove();
        $('.adoption-form').remove();
        homeRender = true;
        $('.contact').remove();
        $('.info').remove();
        $('.animals').remove();
        $('.animal-details').remove();
        context.app.setLocation('#/');
      })
      let urls = ['dogs', 'cats', 'rabbits'];
      for (let i = 0; i < urls.length; i++) {
        $(".middle h1:eq(" + i + ")").on('click', () => {
          $('.loading').remove();
          $('.rslides').remove();
          $('.quote').remove();
          $('.adoption-form').remove();
          $('.contact').remove();
          $('.info').remove();
          $('.animals').remove();
          $('.animal-details').remove();
          context.app.setLocation("#/" + urls[i]);
        })
      }
      $('.right h1').on('click', () => {
        $('.loading').remove();
        $('.rslides').remove();
        $('.adoption-form').remove();
        $('.quote').remove();
        $('.info').remove();
        $('.animals').remove();
        $('.animal-details').remove();
        context.app.setLocation('#/contact');
      })
    }
    function addLoading(){
      $(".app").prepend('<div class="loading"></div>');
      $(".loading").prepend('<img src="imgs/load.gif">');
    }
    this.get('#/', function (context) {
      urlNavigation(context);
      addLoading();
      if (homeRender) {
        $(".app").append("<ul class='rslides'></ul>");
        let imgs = ['dog1.jpg', 'dog2.jpg', 'dog3.jpg'];
        for (let item of imgs) {
          $(".app ul").append("<li><img src='imgs/" + item + "' alt=''></li>");
        }
        $(".app").append("<div class='quote'><h1>Saving one dog will not change the world, but surely for that one dog, the world will change forever.</h1></div>");
        homeRender = false;
        window.onload = function () {
        $(".loading").remove();
        };
      }

    });
    this.get('#/contact', function (context) {
      urlNavigation(context);
      addLoading();
      let contactInfo = ['80-288 Gdańsk RandomName 5 Street', 'Phone: 123 456 789', 'Email: randomemail@gmail.com', 'Adoption from Monday to Friday', 'Working hours: 8:00-16:00']
      $(".app").append("<div class='contact'></div>");
      $(".app .contact").append("<div class='contact-details'></div>");
      for (let item of contactInfo) {
        $(".contact-details").append("<h1>" + item + "</h1>");
      }
      window.onload = function () {
        $(".loading").remove();
        };
    });
    this.get('#/:type', function (context) {
      urlNavigation(context);
      addLoading();
      console.log(context.params.type);
      let animals = [];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          console.log(animals);
          $(".app").append("<div class='animals'></div>");
          let id = 0;
          for (let item of animals) {
            console.log(item.type);
            if (item.type === context.params.type) {
              $(".app .animals").append("<div class='animal'></div>");
              $(".app .animal:eq(" + id + ")").append("<h2>" + item.name + " " + item.age + "</h2>");
              $(".app .animal:eq(" + id + ")").append("<img src=" + item.img + ">");
              $('.animal h2:eq(' + id + ')').on('click', () => {
                $('.animals').remove();
                context.app.setLocation("#/" + item.type + "/" + item.id);
              })
              id++;
            }
          }
          $(".loading").remove();
        })
    });
    this.get('#/:type/:id', function (context) {
      urlNavigation(context);
      console.log(context.params.type);
      addLoading();
      let animals = [];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          console.log(animals);
          window.onload = function () {
            $(".loading").remove();
          };
          $(".app").append("<div class='animal-details'></div>");
          console.log(context.params.id);
          for (let item of animals) {
            if (parseInt(item.id) === parseInt(context.params.id) && item.type === context.params.type) {
              let content = ["<h2>" + item.name + "</h2", "<img src=" + item.img + ">", , "<h1> Age: " + item.age + "</h1", "<h1> Gender: " + item.gender + "</h1", "<h1> Charcter: " + item.description + "</h1", "<button>ADOPT</button>"]
              $(".animal-details").append("<div class='content'></div");
              for (let item of content) {
                $(".content").append(item);
              }
              $('.content button').on('click', () => {
                $('.animal-details').remove();
                context.app.setLocation("#/" + item.type + "/" + item.id + "/adoption");
              })
              id++;
            }
          }
        })
    });
    this.get('#/:type/:id/adoption', function (context) {
      urlNavigation(context);
      let inputValues1 = ["First Name", "Last Name", "City", "Street"];
      let errors1 = ["First name must containt from 3 to 12 a-z letters", "Last Name must containt from 3 to 12 a-z letters", "City name must be 3 or more letters long", "Street name must be 3 or more letters long"];
      let inputValues2 = ["Phone Number", "Email"];
      let errors2 = ["Phone Number must contain 9 digits without space", "Please enter correct email address"];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          let firstNameVal;
          let lastNameVal;
          let cityVal;
          let streetVal;
          $(".loading").remove();
          $(".app").append("<div class='adoption-form'></div");
          $(".adoption-form").append("<div class='adoption-content1'></div>");
          $(".adoption-content1").append("<h2>Adoption form</h2>");
          for (let i = 0; i < 4; i++) {
            $(".adoption-content1").append("<input value='" + inputValues1[i] + "' type='text'>");
            $(".adoption-content1").append("<p id='hidden'>" + errors1[i] + "</p>");
          }
          $(".adoption-content1 input:lt(4)").on('focus', (e) => {
            if (e.target.value === "First Name" || e.target.value === "Last Name" || e.target.value === "City" || e.target.value === "Street") {
              e.target.value = ""
            }
          });
          for (let i = 0; i < 4; i++) {
            $(".adoption-content1 input:eq(" + i + ")").on('blur', (e) => {
              if (e.target.value === "" || e.target.value === " ") {
                e.target.value = inputValues1[i];
              }
            });
          }
          $(".adoption-content1").append("<button>NEXT</button>");
          let correctFlag1 = true;
          let correctFlag2 = true;
          $(".adoption-content1 button").on('click', () => {
            correctFlag1 = true;
            let matchingValues = [/^[a-zA-Z0-9\.\-_]{3,12}$/, /^[a-zA-Z0-9\.\-_]{3,12}$/];
            let values = ["City", "Street"];
            for (let i = 0; i < 2; i++) {
              if ($(".adoption-content1 input:eq(" + i + ")")[0].value.match(matchingValues[i]) === null) {
                $(".adoption-content1 p:eq(" + i + ")").attr('id', '');
                correctFlag1 = false;
              } else {
                $(".adoption-content1 p:eq(" + i + ")").attr('id', 'hidden');
              }
            }
            for (let i = 2; i < 4; i++) {
              if (($(".adoption-content1 input:eq(" + i + ")")[0].value.length < 3) || $(".adoption-content1 input:eq(" + i + ")")[0].value === values[i - 2]) {
                $(".adoption-content1 p:eq(" + i + ")").attr('id', '');
                correctFlag1 = false;
              } else {
                $(".adoption-content1 p:eq(" + i + ")").attr('id', 'hidden');
              }
            }

            if (correctFlag1) {
              firstNameVal = $(".adoption-content1 input:eq(0)")[0].value;
              lastNameVal = $(".adoption-content1 input:eq(1)")[0].value;
              cityVal = $(".adoption-content1 input:eq(2)")[0].value;
              streetVal = $(".adoption-content1 input:eq(3)")[0].value;
              $(".adoption-content1").remove();
              $(".adoption-form").append("<div class='adoption-content2'></div");
              $(".adoption-content2").append("<h2>Adoption form</h2>");
              for (let i = 0; i < inputValues2.length; i++) {
                $(".adoption-content2").append("<input value='" + inputValues2[i] + "' type='text'>");
                $(".adoption-content2").append("<p id='hidden'>" + errors2[i] + "</p>");
              }
              $(".adoption-content2").append("<input value='" + animals[context.params.id].name + "' type='text' readonly>");
              $(".adoption-content2").append("<input value='" + animals[context.params.id].type.substr(0, animals[context.params.id].type.length - 1) + "' type='text' readonly>");

              $(".adoption-content2 input:lt(2)").on('focus', (e) => {
                if (e.target.value === "Email" || e.target.value === "Phone Number") {
                  e.target.value = ""
                }
              });
              $(".adoption-content2 input:gt(1)").css({ 'background-color': '#b5c7a3' });
              for (let i = 0; i < 2; i++) {
                $(".adoption-content2 input:eq(" + i + ")").on('blur', (e) => {
                  if (e.target.value === "" || e.target.value === " ") {
                    e.target.value = inputValues2[i];
                  }
                });
              }
              $(".adoption-content2").append("<button id='adopt'>ADOPT</button>");
              $(".adoption-content2 button").on('click', () => {
                console.log('adopt');
                correctFlag2 = true;
                let matchingValues2 = [/^[Z0-9]{9}$/, /^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/];
                for (let i = 0; i < matchingValues2.length; i++) {
                  if ($(".adoption-content2 input:eq(" + (i) + ")")[0].value.match(matchingValues2[i]) === null) {
                    $(".adoption-content2 p:eq(" + (i) + ")").attr('id', '');
                    correctFlag2 = false;
                  } else {
                    $(".adoption-content2 p:eq(" + (i) + ")").attr('id', 'hidden');
                  }
                }
                if (correctFlag1 && correctFlag2) {
                  fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/adoptions', {
                    method: 'POST',
                    body: JSON.stringify({
                      firstName: firstNameVal,
                      lastName: lastNameVal,
                      city: cityVal,
                      street: streetVal,
                      phoneNumber: $(".adoption-content2 input:eq(0)")[0].value,
                      email: $(".adoption-content2 input:eq(1)")[0].value,
                      animalName: $(".adoption-content2 input:eq(2)")[0].value,
                      animalType: $(".adoption-content2 input:eq(3)")[0].value
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  }).then(data => {
                    console.log(data);
                    let info = ['<h2>Adoption request sent!</h2>', '<h1>We will respond to you soon</h1>', '<h1>You did something great today</h1>']
                    alert('adoption request sent');
                    $(".adoption-form").remove();
                    $(".app").append("<div class='info'></div>");
                    $(".info").append("<div class='info-details'></div>");
                    for (let item of info) {
                      $(".info-details").append(item);
                    }
                  });
                }
              })
            }
          })

        });
    });
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);
