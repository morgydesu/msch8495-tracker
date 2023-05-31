//discover onclick function
// function toggleAlbumDetails(button) {
//     const album = button.parentNode;
//     const albumDetails = album.querySelector('.album__details');
  
//     albumDetails.classList.toggle('show');
//   }
  

function toggleAlbumDetails(button) {
    const album = button.parentNode;
    const albumDetails = album.querySelector('.album__details');
  
    // Check if the album already has 'show-details' class
    const hasDetailsClass = album.classList.contains('show-details');
  
    // Remove 'show-details' class from all albums
    const allAlbums = document.querySelectorAll('.album');
    allAlbums.forEach((album) => {
      album.classList.remove('show-details');
    });
  
    // Add 'show-details' class to the clicked album if it doesn't have the class
    if (!hasDetailsClass) {
      album.classList.add('show-details');
    }
  }
  
  
  
  
  