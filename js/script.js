import data from "./data.js";

$(document).ready(function () {

    $(".hamburger-button").click(function () {
        $("#nav").toggleClass("active");
        $("#overlay").toggleClass("overlay");
        $(".nav-close").css("display","block");

    });
    $(".nav-close").click(function () {
        $("#overlay").toggleClass("overlay");
        $("#nav").toggleClass("active");
        $(".nav-close").css("display","none");

    });

    $("#overlay").click(function () {
        $("#overlay").toggleClass("overlay");
        $("#nav").toggleClass("active");
        $(".nav-close").css("display","none");
    });


    $("#dropdownButton").click(function () {
        $("#category").removeClass("communityCategory").addClass("dropdown-menu");
        $("#drop_overlay").toggleClass("drop_overlay");

    });
    $("#drop_overlay").click(function () {
        $("#category").addClass("communityCategory").removeClass("dropdown-menu");
        $("#drop_overlay").toggleClass("drop_overlay");
    });


    mQBasedClass(screen.width);
    $(window).resize(function () {
        mQBasedClass(screen.width);
    });
    function mQBasedClass(width){
        if(width <= 1024){
            $("#nav").addClass("nav-link");
        } 
        else{
            $("#nav").removeClass("nav-link");
            $("#category").removeClass("dropdown-menu");
            $("#drop_overlay").removeClass("drop_overlay");
        }
    }


  $("#searchInput").on("input keypress", function () {
    if($(window).width() > 780){
        if ($(this).val().trim() !== "") {
        $("#searchMessage").css("display", "flex");
        $("#searchInput ").css("width", "76%");
        } else {
        $("#searchMessage").css("display", "none");
        $("#searchInput").css("width", "90%");
        }
    }
  });


  function categoryCounter(category) {
    var count = 0;
    data.forEach(function (item) {
      if (category != "All") {
        if (item.category.includes(category)) {
          count++;
        }
      } else {
        count++;
      }
    });
    return count;
  }

  $("#all_count").text(categoryCounter("All"));
  $("#gaming_count").text(categoryCounter("Gaming"));
  $("#entertainment_count").text(categoryCounter("Entertainment"));
  $("#education_count").text(categoryCounter("Education"));
  $("#tech_count").text(categoryCounter("Science & Tech"));
  $("#music_count").text(categoryCounter("Music"));


  let category = "All";
  $(".categoryDiv:first-child").addClass("active");


  $(".categoryDiv").on("click", function () {
    category = $(this).find("p:first").text();
  
    // drop down hide 
    $("#category").addClass("communityCategory").removeClass("dropdown-menu");
    $("#drop_overlay").toggleClass("drop_overlay");
    $("#drop_text").text(category)
    //drop down end

    $(".categoryDiv").removeClass("active");
    $(this).addClass("active");
    console.log(category);
    $(".communityResult").empty();
    card(category);
  });


  function card(category) {
    
    const counter = $("<h1>").text( categoryCounter(category) +" Results Found");
    $(".communityResult").append(counter);
   
    data.forEach(function (card) {
        if (category === "All" || card.category.includes(category)) {
                console.log(card.id);

                
                const communityCard = $("<div>").addClass("community-card").attr("tabindex","0");
                const cardImg = $("<div>").addClass("card_img");
                $("<img>").attr("src", card.image).appendTo(cardImg);
                cardImg.appendTo(communityCard);

                const cardContent = $("<div>").addClass("card-components");

                const title = $("<h4>").text(card.title);
                const icon = $("<span>")
                .html(`<img src="${card.icon}">`)
                .css({ width: "20px", "border-radius": "5px", overflow: "hidden" });
                title.prepend(icon);
                const text = $("<p>").text(card.text);
                const onlineMembers = $("<div>")
                .text(`${card.online} Online • ${card.members} Members`)
                .css({
                    "font-size": "12px",
                    color: "#4e5058",
                    "font-family": "gg sans Normal Regular",
                });
                cardContent.append(title, text, onlineMembers);

                if (card.is_verified) {
                const verification = $("<div>").text("Verified").addClass("verified");
                verification.prepend(
                    $("<span>").html(`<i class="fa-solid fa-check"></i>`)
                );
                cardContent.append(verification);
                }
                cardContent.appendTo(communityCard);
                $(".communityResult").append(communityCard);
            }
    });
  }

  card(category);
});
