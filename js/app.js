$(document).ready(function () {
    $("#search-results").hide();
    // 1. get input from the user
    $(".search-results").submit(function (event) {
        event.preventDefault(event);
        var searchTerm = $("#query").val(); // Prevents the submittion to the back-end-- instead JS handles it
        getResults(searchTerm); // gets the value from the user

    });
    var getResults = function (searchTerm) {
        var api_key = "63pt0zxtnqfcsif30a6h56kv";
        var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + searchTerm + "&limit=12&includes=Images:1&api_key=" + api_key;

        $.ajax({
                url: etsyURL,
                dataType: "jsonp" //use jsonp to avoid cross origin issues
            })
            //if the response is success
            .done(function (result) { //this waits for the ajax to return with a succesful promise object

                console.log(result);

                //loop throu all the results and pick each of them to display in its own container
                //$.each is a higher order function. It takes an array and a function as an argument.
                //The function is executed once for each item in the array.
                $.each(result.results, function (objectNumber, dataForOneItem) {
                    console.log(dataForOneItem);
                    //call the following function (showQuestion(item)) to show the API results
                    var itemDisplay = showResults(dataForOneItem);
                    $("#search-results").show();
                    $('#search-results ul').append(itemDisplay);
                });
            })
            //if the response is failure
            .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
                var errorElem = showError(error);
                $("#search-results").show();
                $('#search-results').append(errorElem);
            });

    }
    var showResults = function (dataForOneItem) {

        var htmlOutput = '';

        htmlOutput += '<li>';
        htmlOutput += '<h2 class="itemTitle">' + dataForOneItem.title + '</h2>';
        htmlOutput += '<div class="itemImage" style="background-image: url(' + dataForOneItem.Images[0].url_570xN + ')"></div>';
        htmlOutput += '<div class="descriptionWrapper">';
        htmlOutput += '<p class="itemDescription">' + dataForOneItem.description + '</p>';
        htmlOutput += '</div>';
        htmlOutput += '</li>';

        return htmlOutput;

    }
});
