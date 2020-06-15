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

console.log("Start of kbwhizz magic");

$('div.availabilityRta a').each(function () {
   //console.log($(this).text() );  
   var LocArr = $(this).text().split(',');
   var Loc = LocArr[0];
   if (Loc == 'CRL') {
      console.log("CRL found");
 $( "<em>Some text</em></br>" ).insertBefore( $(this) );
   }
});
