//Example Album
var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
};

var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var albumMine = {
      title: 'Lion Heart',
      artist: 'SNSD',
      label: 'SM',
      year: '2016',
      albumArtUrl: 'assets/images/album_covers/22.jpg',
      songs: [
          { title: 'Lion Heart', duration: '3:44' },
          { title: 'You Think', duration: '3:09' },
          { title: 'Party', duration: '3:13'},
          { title: 'One Afternoon', duration: '3:35' },
          { title: 'Paradise', duration: '3:50'}
      ]
  };
// Assigns previously static song row template to a variable called template and return it.
 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     return template;
 };
 //select all the HTML elements required to display ont he album page.
 var albumTitle = document.getElementsByClassName('album-view-title')[0];
 var albumArtist = document.getElementsByClassName('album-view-artist')[0];
 var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
 var albumImage = document.getElementsByClassName('album-cover-art')[0];
 var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

 var setCurrentAlbum = function(album) {
   //
   albumTitle.firstChild.nodeValue = album.title;
   albumArtist.firstChild.nodeValue = album.artist;
   albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
   albumImage.setAttribute('src', album.albumArtUrl);
   //clears the album song list to make sure we are working with clean slate.
   albumSongList.innerHTML = '';
   //goes through all the songs from the specified album object and insert them into the HTMl.
   for (var i = 0; i < album.songs.length; i++) {
     albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
   }
 };

 window.onload = function() {
   setCurrentAlbum(albumMine)

   // get access to albums via indices.
   var albums = [albumPicasso, albumMarconi, albumMine];
   var index = 1;
   // goes through albums when cover art clicked. albumImage from line 62.
   albumImage.addEventListener("click", function(event) {
     setCurrentAlbum(albums[index]);
     // adds 1 to the index once setCurrentAlbum executes.
     index++;
     // when index reaches albums.length the index resets to 0.
     if (index == albums.length) {
       index = 0;
     }
   });
 };
