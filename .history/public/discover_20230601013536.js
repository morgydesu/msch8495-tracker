//discover onclick function
// function toggleAlbumDetails(button) {
//     const album = button.parentNode;
//     const albumDetails = album.querySelector('.album__details');
  
//     albumDetails.classList.toggle('show');
//   }
  

function toggleAlbumDetails(button) {
    const album = button.parentNode;
    const albumDetails = album.querySelector('.album__details');
  
    // Check if album details are already visible
    const isDetailsVisible = albumDetails.classList.contains('show');
  
    // Remove 'show' class from all album details
    const allAlbumDetails = document.querySelectorAll('.album__details');
    allAlbumDetails.forEach((details) => {
      details.classList.remove('show');
    });
  
    // Add 'show' class to the clicked album details if not already visible
    if (!isDetailsVisible) {
      albumDetails.classList.add('show');
    }
  }
  
  
  
  