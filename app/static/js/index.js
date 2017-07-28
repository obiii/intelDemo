// Calling Django view for getting tweets
$("#filterBtn").click(function(){
                if ($(this).find('span').hasClass('glyphicon glyphicon-filter')) 
                    $("#datePickerSection").show()
                else
                    $("#datePickerSection").hide()

                $(this).find('span').toggleClass('glyphicon glyphicon-remove').toggleClass('glyphicon glyphicon-filter');
            })
$("#filterBtnUser").click(function(){
    if ($(this).find('span').hasClass('glyphicon glyphicon-filter')) 
        $("#datePickerSectionUser").show()
    else
        $("#datePickerSectionUser").hide()

    $(this).find('span').toggleClass('glyphicon glyphicon-remove').toggleClass('glyphicon glyphicon-filter');
})

$('#searchBtn').click(function(){
    $("#searchForm").hide();
    var dateFr, dateT
    dateFr = $('#dateFrom').val() === '' ? '2017-07-25' : $('#dateFrom').val()
    dateT = $('#dateTo').val() === '' ? '2017-07-27' : $('#dateTo').val()
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/fetchTweets",
        data: {
            'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val(),
            'query': $('#searchText').val(),
            'dateFrom': dateFr,
            'dateTo': dateT,
            'type': 'mention'
        },
        beforeSend: function() {
            $("#search_loader").empty();
            $("#search_loader").append("Searching....");
        },
        complete: function() {
            $("#search_loader").empty();
        },
        dataType: 'json',
        error: function (err) {
            console.log(err)

        },
        success: function(datta) {
            createTweetTable(datta)
            
}// end of success
    });
})


$('#searchBtnUser').click(function(){
    $("#searchForm").hide();
    var dateFr, dateT
    dateFr = $('#dateFromUser').val() === '' ? '2017-07-25' : $('#dateFromUser').val()
    dateT = $('#dateToUser').val() === '' ? '2017-07-27' : $('#dateToUser').val()
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/fetchTweets",
        data: {
            'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val(),
            'query': $('#searchTextUser').val(),
            'dateFrom': dateFr,
            'dateTo': dateT,
            'type': 'username'
        },
        beforeSend: function() {
            $("#search_loader").empty();
            $("#search_loader").append("Searching....");
        },
        complete: function() {
            $("#search_loader").empty();
        },
        dataType: 'json',
        error: function (err) {
            console.log(err)

        },
        success: function(datta) {
            createTweetTable(datta)
            
}// end of success
    });
})

// Calling Django View for getting sentimental Analysis
var createTweetTable = function (data) {
var myTableDiv = document.getElementById("tweetTable")
    var table = document.createElement('TABLE')
    var tableBody = document.createElement('TBODY')

    table.border = '1'
    table.appendChild(tableBody);

    var heading = new Array();
    heading[0] = "Tweet"
    heading[1] = "Username"
    heading[2] = "Location"
    heading[3] = "Created At"

    var stock = new Array()
    data.map((i, index) => stock[index] = new Array(i.text, i.user.name,i.user.location, i.created_at))

    //TABLE COLUMNS
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')
        th.width = '50';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }

    //TABLE ROWS
    for (i = 0; i < stock.length; i++) {
        var tr = document.createElement('TR');
        tr.id = "tweet_" + (i+1)
        for (j = 0; j < stock[i].length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(stock[i][j]));
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
        
        var btn = document.createElement("BUTTON");
        btn.id = "tweetBtn_" + (i+1);
        btn.onclick = callJavascriptFunction;
        btn.className = "btn btn-primary";
        var t = document.createTextNode("Analyse");       
        btn.appendChild(t);                                
        tableBody.appendChild(btn);
    }
    
    myTableDiv.appendChild(table)
}
var callJavascriptFunction = function(e){
    console.log('Han bhai sentiments nikalo')
    var num = e.toElement.id.split('_')
    var tweet = "#tweet_" + num[1]
    var selected_tweet = $(tweet)[0].innerText
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/getSentiments",
        data: {
            'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val(),
            'query': JSON.stringify(selected_tweet)
        },
        beforeSend: function() {
            $("#tweetTable").empty();

            $("#search_loader").empty();
            $("#search_loader").append("Searching....");
        },
        complete: function() {
            $("#search_loader").empty();
            $("#sentimentTabs").show()            
        },
        dataType: 'json',
        success: function(datta) {
            console.log(datta);

            // document.getElementById("tweetQuote").style.padding = "50px";
            document.getElementById("tweetQuote").innerHTML = selected_tweet;
            $("#tweetQuoteTitle").show();
            $("#tweetQuote").show();
            var sentiment_label = datta.sentiment.document.label;            
            var sentiment_score = datta.sentiment.document.score 
            document.getElementById("sentiment_score").style.width = (Math.abs(sentiment_score) * 100) + '%';
            document.getElementById("sentiment_label").innerHTML = sentiment_label.toUpperCase();
            document.getElementById("sentiment_score").innerHTML = sentiment_score;

            var joy = datta.emotion.document.emotion.joy 
            document.getElementById("score_joy").innerHTML = Math.abs(joy);
            document.getElementById("score_joy").style.width = (Math.abs(joy) * 100) + '%';

            var anger = datta.emotion.document.emotion.anger
            document.getElementById("score_anger").innerHTML = Math.abs(anger);
            document.getElementById("score_anger").style.width = (Math.abs(anger) * 100) + '%';

            var disgust = datta.emotion.document.emotion.disgust
            document.getElementById("score_disgust").innerHTML = Math.abs(disgust);
            document.getElementById("score_disgust").style.width = (Math.abs(disgust) * 100) + '%';

            var sadness = datta.emotion.document.emotion.sadness
            document.getElementById("score_sadness").innerHTML = Math.abs(sadness);
            document.getElementById("score_sadness").style.width = (Math.abs(sadness) * 100) + '%';

            var fear = datta.emotion.document.emotion.fear
            document.getElementById("score_fear").innerHTML = Math.abs(fear);
            document.getElementById("score_fear").style.width = (Math.abs(fear) * 100) + '%';


            key_words = datta.keywords.map((x)=> ({'key' : x.text ,'value':x.relevance }) )
            createTable('keywordTable',key_words, 'Relevance')

            entities = datta.entities.map((x)=> ({'key' : x.text ,'value':x.relevance }) ) 
            createTable('entitiesTable', entities, 'Relevance')
            
            concepts = datta.concepts.map((x)=> ({'key' : x.text ,'value':x.relevance }) )
            createTable('conceptTable', concepts, 'Score')
            categories = datta.categories.map((x)=> ({'key' : x.label ,'value':x.score }) )
            createTable('categoryTable', categories, 'Score')            
  
        }// end of success
    });
}
var createTable = function(id, data, type) {
    var myTableDiv = document.getElementById(id)
            var table = document.createElement('TABLE')
            var tableBody = document.createElement('TBODY')

            table.border = '1'
            table.appendChild(tableBody);

            var heading = new Array();
            heading[0] = "Name"
            heading[1] = type
            var stock = new Array()
            data.map((x, index) => stock[index] = new Array(x.key, x.value))

            //TABLE COLUMNS
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);
            for (i = 0; i < heading.length; i++) {
                var th = document.createElement('TH')
                th.width = '50';
                th.appendChild(document.createTextNode(heading[i]));
                tr.appendChild(th);
            }

            //TABLE ROWS
            for (i = 0; i < stock.length; i++) {
                var tr = document.createElement('TR');
                for (j = 0; j < stock[i].length; j++) {
                    var td = document.createElement('TD')
                    td.appendChild(document.createTextNode(stock[i][j]));
                    tr.appendChild(td)
                }
                tableBody.appendChild(tr);
            }
            
            myTableDiv.appendChild(table)
}