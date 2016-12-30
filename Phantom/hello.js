var page = require('webpage').create();

page.open('http://conf.cnki.net/advanceSearch.aspx', function() {
  page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    page.evaluate(function() {
      $("#pageLabel .a02").click();

    }).then(function() {
      var output = $("#resultView table tbody");
      console.log("output:" + output);
    })
    phantom.exit()
  });
});
