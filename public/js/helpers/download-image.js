

const downloadImg= ()=>{
   const sreenshotTarget = document.querySelector('#container-thw');
   const params=  { logging: true, letterRendering: 1, allowTaint: false,  useCORS: true } 
   html2canvas (sreenshotTarget,params).then((canvas)=>{
      const base64image = canvas.toDataURL("image/png");
      let anchor = document.createElement('a');
      anchor.setAttribute('href',base64image);
      anchor.setAttribute('download','my-heart-weather.png');
      anchor.click();
      anchor.remove();
   })



}

export {downloadImg};