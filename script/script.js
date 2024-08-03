$().ready(() => {
  $("#icon").attr("href", location.origin + location.pathname);
  // INITIALIZING GLOBAL VARIABLE
  const search = location.search.replace("?search=", "");
  console.log(search);
  // CLEARING UI IF DOESN'T NEEDED
  if (search.length != 0) {
    $("#subheader")
      .removeClass("uppercase")
      .text(`Search result for ${search.replaceAll("+", " ")}`);
  }
  // FETCHING ANIME LIST
  $.getJSON(
    search.length == 0
      ? "https://api.jikan.moe/v4/top/anime?filter=airing&type=tv"
      : `https://api.jikan.moe/v4/anime?q=${search}`,
    function ({ data }) {
      data.slice(0, $(window).innerWidth() > 1024 ? 10 : 5).forEach((anime) => {
        const card = document.createElement("div");
        const cardImg = document.createElement("img");
        const cardTitle = document.createElement("p");
        $(card).addClass("relative rounded-xl overflow-hidden");
        $(cardImg).addClass("size-full object-cover object-center");
        cardImg.src = anime.images.webp.large_image_url;
        $(cardTitle)
          .addClass(
            "absolute bottom-0 w-full h-8 flex justify-center items-center text-center leading-none bg-white/50 backdrop-blur-sm"
          )
          .text(
            anime.title.length > 40 ? anime.title_synonyms[0] : anime.title
          );
        $(card).append(cardImg, cardTitle);
        $("#anime-list").append(card);
      });
    }
  );
  // ADD EVENT
  $("#search-btn").click(() => {
    $("#search-bar")
      .toggleClass("opacity-100 translate-y-0")
      .children("input")
      .focus()
      .blur(() => $("#search-bar").toggleClass("opacity-100 translate-y-0"));
  });
  $("#menu-btn").click(() => {
    $("nav").toggleClass("opacity-100 translate-x-0");
  });
});
