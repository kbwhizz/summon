         // Get HTML head element 
        var head = document.getElementsByTagName('head')[0];  
  
        // Create new link Element 
        var link = document.createElement('link'); 
  
        // set the attributes for link element  
        link.rel = 'stylesheet';  
      
        link.type = 'text/css'; 
      
        link.href = 'https://iainrca.github.io/summon/libsearch.css';  
  
        // Append link element to HTML head 
        document.head.appendChild(link);




$('div.availabilityRta a').each(function () {
   console.log($(this).text() );  
   var LocArr = $(this).text().split(',');
         console.log(LocArr);
   var Loc = LocArr[0];
   if (Loc == 'CRL') {
      console.log("CRL found");
 $( "<em>Some text</em></br>" ).insertBefore( $(this) );
   }
});
console.log("End of js file");

const loadScript = (source, beforeEl, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    const prior = beforeEl || document.getElementsByTagName('script')[0];

    script.async = async;
    script.defer = defer;

    function onloadHander(_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = null;
        script.onreadystatechange = null;
        script = undefined;

        if (isAbort) { reject(); } else { resolve(); }
      }
    }

    script.onload = onloadHander;
    script.onreadystatechange = onloadHander;

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  });
}

const scriptUrl = 'https://iainrca.github.io/summon/rta.js';
loadScript(scriptUrl).then(() => {
  console.log('script loaded');
}, () => {
  console.log('fail to load script');
});
