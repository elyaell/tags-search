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

    // Si aucun tag n'est actif, afficher toutes les races
    if (activeTags.length === 0) {
      $(".race").show();
      return;
    }

    // Cacher toutes les races
    $(".race").hide();

    // Afficher les races qui contiennent exactement les mêmes tags
    $(".race")
      .filter(function () {
        const raceTags = $(this)
          .find(".tags span")
          .map(function () {
            return $(this).text().toLowerCase();
          })
          .get();

        // Retourner toutes les races qui contiennent les x tags sélectionnés
        return activeTags.every((tag) => raceTags.includes(tag));
      })
      .show();
  });
});
