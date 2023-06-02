//discover onclick function
function toggleAlbumDetails(button) {
    const album = button.parentNode;
    const albumDetails = album.querySelector('.album__details');
  
    albumDetails.classList.toggle('show');
  }
  
//toggleAlbumDetails has the functionality of the toggle system in the dosicver section of the application. It allows each albums to open and close its information using the toggle button. 
  