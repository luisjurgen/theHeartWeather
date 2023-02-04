

const logout = () => {
   const url = "https://accounts.spotify.com/logout";
   const spotifyLogoutWindow = window.open(
     url,
     "Spotify Logout",
     "width=700,height=500,top=40,left=40"
   );
   setTimeout(() => {
     spotifyLogoutWindow.close();
     location.href = "/index.html";
   }, 2000);
 };


export {logout};