var currDay = 0;
var currMonth = 0;
var currYear = 0;
var maxDays = 0;
var lastSelectedDate = 0;
var selectedDate = 0;

var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function setUp(){

    var xDate = new Date();
    var x = document.getElementById('y');
    x.value = xDate.getFullYear();
    var j = xDate.getMonth();
    var xy = document.getElementById("m").options.item(j);
    xy.selected = true;
    var k = document.getElementById('today');
    k.innerHTML = "Today's Date is " + xDate.toDateString();
    LoadCalendar();
}
setUp();
function LoadCalendar(){
    lastSelectedDate = 0;
    selectedDate = 0;
    document.getElementById('seldate').innerHTML = "<div class='badge badge-danger p-2 mt-1'>No Date Delected </div>";
    document.getElementById('err').innerHTML = "";
    var month = document.getElementById('m').value;
    var year = Number(document.getElementById('y').value);

    var goodDate = true;
    if (month < 0 || month > 11){
        goodDate = false;
        document.getElementById('err').innerHTML =
            "<div class='badge badge-danger p-2 mt-1'> month must be between 0 and 11!</div>";
    }

    if (isNaN(year)){
        goodDate = false;
        document.getElementById('err').innerHTML =
            "<div class='badge badge-danger p-2 mt-1'> invalid year value (not even numeric)!</div>";
    }

    if (year < 2000 || year > 2030){
        goodDate = false;
        document.getElementById('err').innerHTML =
            "<div class='badge badge-danger p-2 mt-1'>Fill Valid Year Range: 2000 to 2030 </div>";

    }

    if (goodDate) {
        GetCalendarHTML(year, month);
    } else {
        document.getElementById('cal').innerHTML = "";
        document.getElementById('seldate').innerHTML = "";
    }
}

function GetCalendarHTML(year, month){
    var todayDate = new Date();

    var mainDate = new Date(year, month, 1);

    var startDate = new Date();
    startDate = GetCalendarStartDate(year, month);

    currDay = startDate.getDate();
    currMonth = startDate.getMonth();
    currYear = startDate.getFullYear();
    maxDays = GetMonthDayCount(currMonth, currYear);
    var calText = "<table id='tbl' class='table table-dark ' >";
    calText += "<tr class='thisMonth'><th colspan='7'>" + monthNames[month] + " " + year + "</th></tr>";
    calText += "<tr class='bg-success'><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td></tr>";

    var sClass = "";

    for (var row = 0; row < 6; row++){

        calText += "<tr>";
        for (var col = 0; col < 7; col++){

            if (currMonth == month){
                sClass = "thisMonth";
            } else { sClass = "bg-secondary"; }
            if (todayDate.getMonth() == currMonth && todayDate.getFullYear() == currYear){
                if (currDay == todayDate.getDate()){ sClass = "today";}
            }
            var cellDate = new Date(currYear, currMonth, currDay);
            calText += MakeTableCell(sClass, cellDate.toDateString(), currDay);
            if (currDay < maxDays){
                currDay++;
            } else {
                currDay = 1;
                currMonth++;
                if (currMonth > 11){
                    currMonth = 0;
                    currYear++;
                }
                maxDays = GetMonthDayCount(currMonth, currYear);
            }

        }

        calText += "</tr>";

        if (currMonth > month) { break; }

    }

    calText += "</table>";

    document.getElementById('cal').innerHTML = calText;

}

function GetCalendarStartDate(year, month){

    var date1 = new Date(year, month, 1);

    var day1 = date1.getDay();

    if (day1 == 0){

        return date1;

    } else {
      var m = month -1;
        var y = year;
        if (m < 0){
            m = 11;
            y--;
        }

        var maxDays = GetMonthDayCount(m, y);
        var newDay = maxDays - day1 + 1;


        var date2 = new Date(y, m, newDay);

        return date2;
    }
}

function GetMonthDayCount(monthNumber, year){

    var temp = 30;
    switch(monthNumber) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            temp = 31;
            break;
        case 1:
            temp = GetFebruaryDayCount(year);
            break;
    }
    return temp;
}

function GetFebruaryDayCount(year){

    var temp = 28;
    if ( (year%100!=0) && (year%4==0) || (year%400==0) ){
        temp = 29;
    }
    return temp;
}

function MakeTableCell(className, title, day){

    var temp = "<td ";

    temp += "class='" + className + "' ";
    temp += "title='" + title + "' ";
    temp += "id='" + title + "' ";
    temp += "onclick='ClickDateCell(id)'>";
    temp += day;
    temp += "</td>";

    return temp;

}

function ClickDateCell(dateInfo){
    if (lastSelectedDate != ""){
        document.getElementById(lastSelectedDate).style.backgroundColor = "#212529";
    }
    document.getElementById(dateInfo).style.backgroundColor = "#28a745";
    document.getElementById(dateInfo).style.color = "#fff";
    selectedDate = dateInfo;
    lastSelectedDate = dateInfo;
    document.getElementById('seldate').innerHTML = "<div class='badge badge-success mt-1 p-2'>Selected Date:  " + dateInfo+"</div>";

}
