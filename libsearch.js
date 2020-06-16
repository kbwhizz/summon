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




$(window).load($('div.availabilityRta a').each(function () {
   console.log($(this).text() );  
   var LocArr = $(this).text().split(',');
         console.log(LocArr);
   var Loc = LocArr[0];
   if (Loc == 'CRL') {
      console.log("CRL found");
 $( "<em>Some text</em></br>" ).insertBefore( $(this) );
   }
})
                  );
console.log("End of js file");


var block_to_insert ;
var container_block ;
 
block_to_insert = document.createElement( 'div' );
block_to_insert.innerHTML = 'This demo DIV block was inserted into the page using JavaScript.' ;
 
container_block = document.getElementsByClassName( 'footer' );
container_block.appendChild( block_to_insert );
