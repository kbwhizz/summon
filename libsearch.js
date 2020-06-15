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

  // Get HTML head element 
        var footer = document.getElementsByTagName('footer')[0];  
  
        // Create new link Element 
        var footlink = document.createElement('link'); 
  
        // set the attributes for link element  
        link.rel = 'stylesheet';  
      
        link.type = 'text/javascript'; 
      
        link.href = 'https://iainrca.github.io/summon/rta.js';  
  
        // Append link element to HTML head 
        document.footer.appendChild(footlink);  
