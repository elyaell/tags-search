$(function () {
  // Transform each h1 into a clickable index entry
  $("h1.index-title").each(function () {
    var indexTitle = this.textContent;
    var indexID = this.parentElement.id.replace("-content", "");
    $("#index").append(`<div id='${indexID}'>${indexTitle}</div>`);

    // transform each h2 into a clickable index entry
    if ($(this).has("h2")) {
      $(`#${indexID}`).append(`<div class='subindex'></div>`);
    }

    $(`#${this.parentElement.id} h2`).filter(function () {
      var subTitle = this.textContent;
      var subID = indexID + "-" + this.parentElement.parentElement.id;
      $(`#${indexID}>.subindex`).append(
        `<span id='${subID}'>${subTitle}</span>`
      );
    });
  });

  // Transform each tag into a clickage index tag
  var tags = [];
  $(".tags span").each(function () {
    var tagText = this.textContent;
    if (!tags.includes(tagText)) {
      tags.push(tagText);
      $("#tags").append(`<span>${tagText}</span>`);
    }
  });
});

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

// Update the content with the corresponding page
$(function () {
  $("#pages>div").css("display", "none");
  $("#pages>div").removeClass("active");

  $("#intro-content").css("display", "block");
  $("#intro").addClass("active");

  $("#index>.subindex>span").on("click", function () {
    var anchorID = `#${this.id.split("-")[1]}`; // Get the anchor ID from the span
    var labelID = `#${this.id.split("-")[0]}`; // Get the label ID from the span
    var contentID = `${labelID}-content`;

    $("#pages>div").css("display", "none");
    $(contentID).css("display", "block");

    // Scroll to the anchor position
    var pos = $(anchorID).position();
    $(document).scrollTop(pos.top);

    $("#index>div").removeClass("active");
    $(labelID).addClass("active");
  });

  $("#index>div").on("click", function () {
    var labelID = `#${this.id}`;
    var contentID = labelID + "-content";

    $("#pages>div").css("display", "none");
    $(contentID).css("display", "block");

    $("#index>div").removeClass("active");
    $(labelID).addClass("active");
  });
});

// Expand the card when clicked on title or expand button
$(function () {
  $(".item-title-expand>i").on("click", function () {
    if ($(this).hasClass("bi-arrows-angle-expand")) {
      var item = $(this).closest(".item");
      $(item).addClass("expanded");

      $(this).removeClass("bi-arrows-angle-expand");
      $(this).addClass("bi-arrows-angle-contract");
    } else {
      var item = $(this).closest(".item");
      $(item).removeClass("expanded");

      $(this).removeClass("bi-arrows-angle-contract");
      $(this).addClass("bi-arrows-angle-expand");
    }
  });
});
