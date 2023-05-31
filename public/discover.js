//discover onclick function
function toggleAlbumDetails(button) {
    const album = button.parentNode;
    const albumDetails = album.querySelector('.album__details');
  
    albumDetails.classList.toggle('show');
  }
  
  