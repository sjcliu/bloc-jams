var buildCollectionItemTemplate = function() {
  var template =
  '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>'
   ;
   //Wrap template in a jquery object to future proof it.
   return $(template)
};


 $(window).load(function() {
   // set collectionconatiner to equal album-covers element
   var $collectionContainer = $('.album-covers');
   // empties out collectionContainer
   $collectionContainer.empty();

   // inserts 12 albums
   for (var i=0; i < 12; i++) {
    var $newThumbnail = buildCollectionItemTemplate();
    // with each loop we append the template content to the collectionContainer
    $collectionContainer.append($newThumbnail);
   };
 });
