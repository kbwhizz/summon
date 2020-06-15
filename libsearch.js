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

$('div.availabilityRta  div.rtaInfo a').each(function () {
   //console.log($(this).text() );  
   var LocArr = $(this).text().split(',');
   var Loc = LocArr[0];
   if (Loc == "CRL") {
      console.log("CRL found");
 $( "<p>Some text</p>" ).insertAfter( $(this) );
   }
});
