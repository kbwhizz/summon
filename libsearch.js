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

        // Get HTML body element 
        var footer = document.getElementsByTagName('body')[0];  
  
        // Create new link Element 
        var script = document.createElement('script'); 
  
        // set the attributes for script element  
      
        script.type = 'text/javascript'; 
      
        script.src = 'https://iainrca.github.io/summon/rta.js';  
  
        // Append link element to HTML head 
        document.footer.appendChild(script);  

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
