$(function () {
  $("#tags span").on("click", function () {
    // Basculer la classe active sur le tag cliqué
    $(this).toggleClass("active");

    // Récupérer tous les tags actifs
    const activeTags = $("#tags span.active")
      .map(function () {
        return $(this).text().toLowerCase();
      })
      .get();

    // Si aucun tag n'est actif, afficher toutes les items
    if (activeTags.length === 0) {
      $(".item").show();
      return;
    }

    // Cacher toutes les items
    $(".item").hide();

    // Afficher les items qui contiennent exactement les mêmes tags
    $(".item")
      .filter(function () {
        const itemTags = $(this)
          .find(".tags span")
          .map(function () {
            return $(this).text().toLowerCase();
          })
          .get();

        // Retourner toutes les items qui contiennent les x tags sélectionnés
        return activeTags.every((tag) => itemTags.includes(tag));
      })
      .show();
  });
});

// Transform each h1 into a clickable index entry
$(function () {
  $("h1.index-title").each(function () {
    var indexTitle = this.textContent;
    var indexID = this.parentElement.id.replace("-content", "");
    var constructID = `<div id='${indexID}'>${indexTitle}`;

    $(`#${this.parentElement.id} h2`).filter(function (item) {
      var subTitle = this.textContent;
      var subID = indexID + "-" + this.id;
      constructID += `<span href='#${subID}'>${subTitle}</span>`;
    });

    constructID += "</div>";
    $("#index").append(constructID);
  });
});

// Update the content with the corresponding page
$(function () {
  $("#pages>div").css("display", "none");
  $("#pages>div").removeClass("active");

  $("#intro-content").css("display", "block");
  $("#intro").addClass("active");

  $("#index>div").on("click", function () {
    var labelID = "#" + this.id;
    var contentID = labelID + "-content";

    $("#pages>div").css("display", "none");
    $(contentID).css("display", "block");

    $("#index>div").removeClass("active");
    $(labelID).addClass("active");
  });
});
