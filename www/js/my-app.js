// Initialize app
var myApp = new Framework7({
    template7Pages: true,
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
});

//Preload landing page : home.html
mainView.router.load({
    url: 'home.html',
    context: {
        username: window.sessionStorage.username,
    }
});
$$.ajaxSetup({
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

/*-----------------
 Every pages
 -----------------*/
//Before Init
myApp.onPageBeforeInit('*', function (page) {
    var mainView = myApp.addView(".view-main");
    if (page.name != 'login') {
        //Check if user is logged in retrieving user from session 
        if (window.sessionStorage.authorized != 1) {
            mainView.router.loadPage("login.html");
        }
    }
});

$$("#btn-logout").click(function () {
    console.log("btn logout");
    window.sessionStorage.clear();
    mainView.router.loadPage("login.html");
});

/*-----------------
 Single pages
 -----------------*/
//Login Page
myApp.onPageInit('login', function (page) {
    //Press Login button
    $$("#btn-login").click(function () {
        //Get Form Login
        var formLogin = myApp.formGetData('frm-login');
        //If user match
        if (formLogin.username === "asd") {
            //Set user in session
            window.sessionStorage.setItem("username", formLogin.username);
            //Set token auth
            window.sessionStorage.setItem("authorized", 1);
            //Authorized
            mainView.router.back();

            console.log("Welcome!");
        } else {
            //not Authorized and must login
            mainView.router.loadPage("login.html");

            console.log("Try again!!");
        }
    });
}).trigger();


//Data Table
myApp.onPageInit('dataTable', function (page) {
    $$.getJSON('http://gabrielli-test.afbnet.it/v1/ttm/list', function (json) {
        buildHtmlTable(json);
    });
//    $$.getJSON('http://gabrielli-test.afbnet.it/v1/ttm/list', function (json) {
//        buildHtmlTable(json);
//    });
//    var myList = [{"name": "elia", "age": 50, "hobby": "tennis"},{"name": "tobia", "age": "25", "hobby": "swimming"},{"name": "ciaone","age": 10, "hobby": "programming"}];
//   buildHtmlTable(myList);


});

function buildHtmlTable(myList) {
    var columns = addAllColumnHeaders(myList);

    for (var i = 0; i < myList.length; i++) {
        var row$ = $$('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];

            if (cellValue === null) {
                cellValue = "";
            }

            row$.append($$('<td/>').html(cellValue));
        }
        $$(".data-table > table tbody").append(row$);
    }
}
function addAllColumnHeaders(myList)
{
    var columnSet = [];
    var headerTr$ = $$('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) === -1) {
                columnSet.push(key);
                headerTr$.append($$('<th/>').html(key));
            }
        }
    }
    $$(".data-table > table > thead").append(headerTr$);

    return columnSet;
}
// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('rest', function (page) {
    //myApp.alert("rest page here");
    /*$$.getJSON('http://ergast.com/api/f1/constructors/renault/constructorStandings/1/seasons.json', function (json) {
     //console.log(json);
     $$('#restcontainer').html(json);
     });*/
    //$$('#gg-title').hide();
//    $$.get('http://ergast.com/api/f1/constructors/renault/constructorStandings/1/seasons.json', {id: 3}, function (data) {
//        //console.log(data);
//        $$('#restcontainer').html(data);
//    });
});