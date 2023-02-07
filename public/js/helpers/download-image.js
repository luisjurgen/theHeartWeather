

const downloadImg= ()=>{
   let screenshotTarget = document.querySelector('#container-thw');
   
   const params=  {  width: screenshotTarget.offsetWidth - 0.25, logging: true, letterRendering: 1, scale:3, allowTaint: false, useCORS: true } 
   html2canvas (screenshotTarget,params).then((canvas)=>{
      const base64image = canvas.toDataURL("image/png");
      let anchor = document.createElement('a');
      anchor.setAttribute('href',base64image);
      anchor.setAttribute('download','my-heart-weather.png');
      anchor.click();
      anchor.remove();
   })



}

export {downloadImg};