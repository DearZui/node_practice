$(function() {
    const os = require('os');
    var prettyBytes = require('pretty-bytes');

    $('.stats').append('Number of cpu cores: ' + os.cpus().length + '');
    $('.stats').append('Free memory: ' + prettyBytes(os.freemem()) + '');

    //Electron UI库
    const {shell} = require('electron');

    //获取最近的文章
    var ul = $('.flipster ul');

    $.get('http://feeds.feedburner.com/Tutorialzine', function(response) {
        var rss = $(response);
            console.log(rss);

        rss.find('item').each(function() {
            var item = $(this);
            console.log(item);

            var content = item.find('encoded').html();
            console.log(content);
            var urlRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g;

            var imageSource = content.match(urlRegex)[1];

            var li = $('<a target="_blank"></a>');

            li.find('a')
                .attr('href', item.find('link').text())
                .text(item.find("title").text());

            li.find('img').attr('src', imageSource);

            li.appendTo(ul);    
        });

        $('.flipster').flipster({
            style: 'carousel'
        });

        $('.flipster').on('click', 'a', function(e) {
            e.preventDefault();
            shell.openExternal(e.target.href);
        });
    });
});