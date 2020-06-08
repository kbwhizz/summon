/**
/**
/**
 * This script:
 * Translates MCCCD library codes into library names for real-time availability (RTA)
 * Reorders RTA fields
 * Prioritize specific library holdings to to if loaded with rta_first=^GC included in query string
 * Disable the Cite options in preview if nocite included in its query string
 */
(function() {

  'use strict';

  var nocite = false;
  var rta_first_re = null;
  var fto = null;
  var loginFlow = false;
  var library_name = {
    'RCA': 'Kensington',
    'IS': 'On Shelf',
    'AB': 'Artists Books',
    'CRL': 'Colour Reference Library',
    'CGCWIL': 'Chandler-Gilbert CC Williams',
    'DOONL': 'Online Resources',
    'DOTR': 'DO Training',
    'EBACCO': 'Ebrary Academic Complete',
    'EBGEIN': 'Ebrary General Interest',
    'EMC': 'Estrella Mountain CC Library',
    'GCC': 'Glendale CC Library',
    'GCN': 'Glendale CC North Library',
    'GWC': 'GateWay CC Library',
    'MCC': 'Mesa CC Library',
    'MCCCB': 'Mesa CC Country Club & Brown',
    'MCCCDA': 'MCCCD Archives',
    'MCCCTL': 'Mesa CC Ctr Teaching Learning',
    'MCCDC': 'Mesa CC Downtown',
    'MCCMD': 'Mesa CC Media',
    'MCCWC': 'Mesa CC Williams',
    'MRM': 'Mesa CC Red Mountain Library',
    'MRMMD': 'Mesa CC Red Mountain Media',
    'NTLIB': 'Ebsco',
    'OGP': 'Online Government Publications',
    'PC': 'Phoenix College Library',
    'PVC': 'Paradise Valley CC Library',
    'PVCBM': 'Paradise Valley Black Mountain CC',
    'RSC': 'Rio Salado College Library',
    'RSCDL': 'Rio Salado College Distance Learning',
    'RSCDN': 'Rio Salado College Dental',
    'SCC': 'Scottsdale CC Library',
    'SMC': 'South Mountain CC Library',
    'MSC': 'Maricopa Skill Center'
  };

  function padNumber(n, d)
  {
    var s = n.toString();
    while (s.length < d) {
      s = '0' + s;
    }
    return s;
  }

  /**
   * Return decoded version of a query string value.
   */
  function decodeQuery(s)
  {
    s = s || '';
    return decodeURIComponent(s.replace(/\+/, ' '));
  }

  function startup()
  {
    /*
     * Temporary logic to resize facet from before ProQuest fixed this
     */
    /*
    var head = document.head;
    var style = document.createElement('style');
    style.type = 'text/css';
    var css = 'div[facet-field="Library"] .Filter a, div[facet-field="Institution"] .Filter a, .moreFacetsPane .FilterGroup .Filter a { width: 168px; }';
    var t = document.createTextNode(css);
    style.appendChild(t);
    head.appendChild(style);
    */

    /**
     * Check for script query string values and enable behaviors as appropriate.
     */
    var scripts = document.getElementsByTagName('script');
    var kevRE = /([^=]+)(=(.*))?/;
    var i;
    for (i = 0; i < scripts.length; i++) {
      try {
        var query = scripts[i].src.match(/^[^\?]*\?(.*)/);
        if (query[1]) {
          var match;
          var kevs = query[1].split('&');
          var j;
          for (j = 0; j < kevs.length; j++) {
            var kev = kevRE.exec(kevs[j]);
            if (kev) {
              var key = decodeQuery(kev[1]);
              var value = decodeQuery(kev[3]);
              if (key === 'rta_first') {
                rta_first_re = new RegExp(value, 'i');
              }
              if (key === 'nocite') {
                nocite = true;
              }
              if (key === 'fto') {
                fto = true;
              }
              if (key === 'loginflow') {
                // Disable since this is now controlled by translation
                // loginFlow = true;
              }
            }
          }
        }
      } catch (e) {}
    }

    /**
     * If nocite included on script URL, disable the cite button within right preview.
     */
    if (nocite) {
      $(document).ready(function() {
        $('<style>')
          .prop('type', 'text/css')
          // .html('#previewMenu a[title="Cite"] { display: none!important; }')
          .html('div[uib-tooltip="Cite this item"] { display: none!important; } ' + 
		        'button[ng-click="docDetail.displayDialog(\'cite\')"] { display: none!important; }')
          .appendTo('head')
        ;
      });
    }

    $(document).ready(function() {
      /*
      setTimeout(function() {
        console.log('init');
        $('div.quickFilters').on('mouseenter', 'a', function(e) {
          console.log(e);
        });
      }, 5000);
      */
    });
  }

  startup();

  /**
   * Set up a filter that can change library codes to names, rearrange the
   * order of items, and optionally prioritize which libraries appear first
   * if rta_first was include to the script as a query string option.
   */
  angular.module('summonApp')
  /*
  .run(['flowService', function (flow) {
    if (loginFlow) {
      flow.configs.loginText = "Log In to Flow";
    }
  }])
  */
  .filter('mcccd_library_remap', function() {
    return function(availabilities) {
      if (availabilities === null || availabilities.length == 0) {
        return availabilities;
      }
      var fa = availabilities.slice(0);
      var ref_location_re = /REF/i;
      var out_location_re = /Checked out/i;
      var pubyear_volume_re = / ((1|2)\d\d\d)( V\.(\d+))?$/i;
      angular.forEach(fa, function(value, key) {
        var el = fa[key];

        el.displayString = (library_name[el.location] || el.location) + ' - ' + el.statusMessage + ' - ' + el.callNumber;

        el.comp = '';
        if (rta_first_re) {
          el.comp += rta_first_re.test(el.location) ? '0' : '1';
        }

        el.comp = el.comp + (library_name[el.location] || el.location);

        if (out_location_re.test(el.statusMessage)) {
          el.comp += '2';
        } else if (ref_location_re.test(el.statusMessage)) {
          el.comp += '1';
        } else {
          el.comp += '0';
        }

        el.comp += el.statusMessage + ' - ';

        var pubyear_volume = el.callNumber.match(pubyear_volume_re);
        var pubyear = 0;
        var volume = 0;
        if (pubyear_volume) {
          pubyear = 9999 - pubyear_volume[1];
          volume = pubyear_volume[4] || 0;
        }
        el.comp += padNumber(pubyear, 4);

        // Beyond this point, retain original sorting order provided by request
        // which should allow volumes to stay in order
        el.comp += padNumber(key, 8);

        el.comp = el.comp.toUpperCase();
      });

      fa = fa.sort(function(a, b) {
        return (a.comp > b.comp) - (a.comp < b.comp);
      });

      return fa;
    };
  })
  .filter('mcccd_library_rtafix', function() {
    return function(inDocuments) {
      // Filter out duplicate RTA requests, favoring college-specific
      // over union (FJR) results
      if (typeof inDocuments === 'undefined' || inDocuments === null || inDocuments.length == 0) {
        return inDocuments;
      }
	  
	  // Filter temporarily broken; return all
	  // return inDocuments;
	  
      var documents = inDocuments.slice(0);
      var i;
      var handling = {};
      var keep = [];
      var isUnion = /^FJR /;
      for (i = 0; i < documents.length; i++) {
        var doc = documents[i];
        keep[i] = true;
        if (doc.availability_id && doc.external_document_id) {
          if (doc.external_document_id in handling) {
            // If we already have this document and the new result is
            // from FJR, do not keep the new one
            if (isUnion.test(doc.availability_id)) {
              keep[i] = false;
            } else {
              // If new result is not from FJR, delete old result
              // in favor of this one
              keep[handling[doc.external_document_id]] = false;
              handling[doc.external_document_id] = i;
            }
          } else {
            // First RTA for this document
            handling[doc.external_document_id] = i;
          }
        }
      }

      for (i = documents.length - 1; i >= 0; i--) {
        if (! keep[i]) {
          documents.splice(i, 1);
        }
      }

      return documents;
    }
  })
  .filter('mcccd_library_refine_fulltext_label', function() {
    return function(label) {
      if (label === 'Full Text Online') {
        label = 'Articles, eBooks & Streaming Videos';
      }
      return label;
    }
  })
  .run([ '$templateCache', function (templateCache) {
    var v;

    var assetsAvailability = '/assets/availability.html';
    v = templateCache.get(assetsAvailability);
    // Change ng-repeat to apply mcccd_library_remap filter to expand
    // library code to name and prioritize library order if requested
    v = v.replace(/ng-repeat="availability in availabilities \|/g, 'ng-repeat="availability in availabilities | mcccd_library_remap |');
    templateCache.put(assetsAvailability, v);
    console.log(v);


    var facetFields = '/assets/facets.html';
    v = templateCache.get(facetFields);
    // Change facet-field to add name of facet to allow css
    // targeting of specific facets
    v = v.replace(/div facet-field/g, 'div facet-field="{{facet.label}}"');
    templateCache.put(facetFields, v);
    console.log(v);

    var documentSummary = '/assets/documentSummary.html';
    v = templateCache.get(documentSummary);
    // Change ng-repeat to apply mcccd_library_rtafix filter to
    // remove duplicate RTA holdings from college-specific and union results.
    v = v.replace(/ng-repeat="doc in ::availabilityDocs/g, 'ng-repeat="doc in ::availabilityDocs | mcccd_library_rtafix');
    templateCache.put(documentSummary, v);
    console.log(v);

    var detailPage = '/assets/detailPage.html';
    v = templateCache.get(detailPage);
    // Change ng-repeat to apply mcccd_library_rtafix filter to
    // remove duplicate RTA holdings from college-specific and union results.
    v = v.replace(/ng-repeat="doc in ::docDetail.availabilityDocs/g, 'ng-repeat="doc in ::docDetail.availabilityDocs | mcccd_library_rtafix');
    templateCache.put(detailPage, v);
    console.log(v);

    if (fto) {
      var quickFilters = '/assets/quickFilters.html';
      v = templateCache.get(quickFilters);
      // Change ng-repeat to apply mcccd_library_rtafix filter to
      // remove duplicate RTA holdings from college-specific and union results.
      v = v.replace(/filter.label \| translate/, 'filter.label | translate | mcccd_library_refine_fulltext_label');
      templateCache.put(quickFilters, v);
    }
  }])
  ;
})();
