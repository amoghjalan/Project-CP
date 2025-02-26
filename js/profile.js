var dataPointsRatings = [];
var dataPointsSubmissions = [];
var dataPointsSubRat = [];
//var dataPointsSubRatOK = [];
var ok = 0;
var compilationError = 0;
var runTimeError = 0;
var wrongAnswer = 0;
var timeLimitExceeded = 0;
var memoryLimitExceeded = 0;
var others = 0;
var probRat1199 = 0;
var probRat1200_1599 = 0;
var probRat1600_1999 = 0;
var probRat2000_2399 = 0;
var probRat2400_2799 = 0;
var probRat2800 = 0;
//var okProbRat1199 = 0;
//var okProbRat1200_1599 = 0;
//var okProbRat1600_1999 = 0;
//var okProbRat2000_2399 = 0;
//var okProbRat2400_2799 = 0;
//var okProbRat2800 = 0;
const urlRatings = "https://codeforces.com/api/user.rating?handle=";
const urlSubmissions = "https://codeforces.com/api/user.status?handle=";
const urlUserAvatar = "https://codeforces.com/api/user.info?handles=";
var user_handle;

function getHandle() {
  var url = document.location.href,
    params = url.split("=")[1];
     return params;
  }

  user_handle = getHandle();

$(document).ready(function() {
  async function getUserRatings() {
    let finalUrlRatings = urlRatings + user_handle;

    const jsonDataRatings = await fetch(finalUrlRatings);
    const jsDataRatings = await jsonDataRatings.json();

    for (let i = 0; i < jsDataRatings.result.length; i++) {
      dataPointsRatings.push({
        x: (parseInt(jsDataRatings.result[i].ratingUpdateTimeSeconds) * 1000),
        y: parseInt(jsDataRatings.result[i].newRating)
      });
    }

    var chart = new CanvasJS.Chart("myChart1", {
      animationEnabled: true,
      animationDuration: 2000,
      theme: "dark1",
      title: {
        text: "Your Ratings",
      },
      data: [{
        type: "line",
        xValueType: "dateTime",
        dataPoints: dataPointsRatings,
      }, ],
    });

    chart.render();
    console.log(dataPointsRatings);

  }

  async function getUserSubmissions() {
    let finalUrlSubmissions = urlSubmissions + user_handle + "&from=1";

    const jsonDataSubmissions = await fetch(finalUrlSubmissions);
    const jsDataSubmissions = await jsonDataSubmissions.json();

    for (let j = 0; j < jsDataSubmissions.result.length; j++) {
      if (jsDataSubmissions.result[j].verdict == "OK") {
        ok++;
      } else if (jsDataSubmissions.result[j].verdict == "COMPILATION_ERROR") {
        compilationError++;
      } else if (jsDataSubmissions.result[j].verdict == "RUNTIME_ERROR") {
        runTimeError++;
      } else if (jsDataSubmissions.result[j].verdict == "WRONG_ANSWER") {
        wrongAnswer++;
      } else if (jsDataSubmissions.result[j].verdict == "TIME_LIMIT_EXCEEDED") {
        timeLimitExceeded++;
      } else if (jsDataSubmissions.result[j].verdict == "MEMORY_LIMIT_EXCEEDED") {
        memoryLimitExceeded++;
      } else {
        others++;
      }
    }

    dataPointsSubmissions.push({
      y: ok,
      indexLabel: "OK"
    });
    dataPointsSubmissions.push({
      y: compilationError,
      indexLabel: "COMPILATION_ERROR"
    });
    dataPointsSubmissions.push({
      y: runTimeError,
      indexLabel: "RUNTIME_ERROR"
    });
    dataPointsSubmissions.push({
      y: wrongAnswer,
      indexLabel: "WRONG_ANSWER"
    });
    dataPointsSubmissions.push({
      y: timeLimitExceeded,
      indexLabel: "TIME_LIMIT_EXCEEDED"
    });
    dataPointsSubmissions.push({
      y: memoryLimitExceeded,
      indexLabel: "MEMORY_LIMIT_EXCEEDED"
    });
    dataPointsSubmissions.push({
      y: others,
      indexLabel: "OTHERS"
    });

    var chart = new CanvasJS.Chart("myChart2", {
      theme: "dark2",
      animationEnabled: true,
      animationDuration: 2000,
      title: {
        text: "Your Submissions"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "{y} - #percent %",
        yValueFormatString: "",
        legendText: "{indexLabel}",
        dataPoints: dataPointsSubmissions,
      }]
    });
    chart.render();
    console.log(dataPointsSubmissions);
  }

  async function getUserSubRat() {
    let finalUserSubRat = urlSubmissions + user_handle + "&from=1";

    const jsonDataSubRat = await fetch(finalUserSubRat);
    const jsDataSubRat = await jsonDataSubRat.json();

    for (let k = 0; k < jsDataSubRat.result.length; k++) {
      if (jsDataSubRat.result[k].problem.rating < 1200) {
        probRat1199++;
      } else if (jsDataSubRat.result[k].problem.rating > 1199 && jsDataSubRat.result[k].problem.rating < 1600) {
        probRat1200_1599++;
      } else if (jsDataSubRat.result[k].problem.rating > 1599 && jsDataSubRat.result[k].problem.rating < 2000) {
        probRat1600_1999++;
      } else if (jsDataSubRat.result[k].problem.rating > 1999 && jsDataSubRat.result[k].problem.rating < 2400) {
        probRat2000_2399++;
      } else if (jsDataSubRat.result[k].problem.rating > 2399 && jsDataSubRat.result[k].problem.rating < 2800) {
        probRat2400_2799++;
      } else if (jsDataSubRat.result[k].problem.rating > 2799) {
        probRat2800++;
      }
    }

    dataPointsSubRat.push({
      y: probRat1199,
      indexLabel: "<1200"
    });
    dataPointsSubRat.push({
      y: probRat1200_1599,
      indexLabel: "1200-1599"
    });
    dataPointsSubRat.push({
      y: probRat1600_1999,
      indexLabel: "1600-1999"
    });
    dataPointsSubRat.push({
      y: probRat2000_2399,
      indexLabel: "2000-2399"
    });
    dataPointsSubRat.push({
      y: probRat2400_2799,
      indexLabel: "2400-2799"
    });
    dataPointsSubmissions.push({
      y: probRat2800,
      indexLabel: ">2800"
    });

    var chart = new CanvasJS.Chart("myChart3", {
      theme: "dark2",
      animationEnabled: true,
      title: {
        text: "Your Problem-Rating-Wise All Submissions"
      },
      data: [{
        type: "doughnut",
        showInLegend: true,
        toolTipContent: "{y} - #percent %",
        yValueFormatString: "",
        legendText: "{indexLabel}",
        dataPoints: dataPointsSubRat,
      }]
    });
    chart.render();
    console.log(dataPointsSubRat);
  }

//async function getUserSubRatOK() {
//  let finalUserSubRatOK = urlSubmissions + user_handle + "&from=1";

//  const jsonDataSubRatOK = await fetch(finalUserSubRatOK);
//  const jsDataSubRatOK = await jsonDataSubRatOK.json();

//  for (let k = 0; k < jsDataSubRatOK.result.length; k++) {
//    if (jsDataSubRatOK.result[k].verdict == "OK") {
//    if (jsDataSubRatOK.result[k].problem.rating < 1200) {
//      okProbRat1199++;
//    } else if (jsDataSubRatOK.result[k].problem.rating > 1199 && jsDataSubRatOK.result[k].problem.rating < 1600) {
//      okProbRat1200_1599++;
//    } else if (jsDataSubRatOK.result[k].problem.rating > 1599 && jsDataSubRatOK.result[k].problem.rating < 2000) {
//      okProbRat1600_1999++;
//    } else if (jsDataSubRatOK.result[k].problem.rating > 1999 && jsDataSubRatOK.result[k].problem.rating < 2400) {
//      okProbRat2000_2399++;
//    } else if (jsDataSubRatOK.result[k].problem.rating > 2399 && jsDataSubRatOK.result[k].problem.rating < 2800) {
//      okProbRat2400_2799++;
//    } else if (jsDataSubRatOK.result[k].problem.rating > 2799) {
//      okProbRat2800++;
//    }
//  }
//
//  dataPointsSubRatOK.push({
//    y: okProbRat1199,
//    indexLabel: "<1200"
//  });
//  dataPointsSubRatOK.push({
//    y: okProbRat1200_1599,
//    indexLabel: "1200-1599"
//  });
//  dataPointsSubRatOK.push({
//    y: okProbRat1600_1999,
//    indexLabel: "1600-1999"
//  });
//  dataPointsSubRatOK.push({
//    y: okProbRat2000_2399,
//    indexLabel: "2000-2399"
//  });
//  dataPointsSubRatOK.push({
//    y: okProbRat2400_2799,
//    indexLabel: "2400-2799"
//  });
//  dataPointsSubRatOK.push({
//    y: okProbRat2800,
//    indexLabel: ">2800"
//  });

//  var chart = new CanvasJS.Chart("myChart4", {
//    theme: "dark2",
//    animationEnabled: true,
//    title: {
//      text: "Your Problem-Rating-Wise Accepted Submissions"
//    },
//    data: [{
//      type: "doughnut",
//      showInLegend: true,
//      toolTipContent: "{y} - #percent %",
//      yValueFormatString: "",
//      legendText: "{indexLabel}",
//      dataPoints: dataPointsSubRatOK,
//    }]
//  });
//  chart.render();
//  console.log(dataPointsSubRatOK);
//  }

  async function getUserAvatar() {
    let finalUserAvatarUrl = urlUserAvatar + user_handle;

    const jsonDataAvatar = await fetch(finalUserAvatarUrl);
    const jsDataAvatar = await jsonDataAvatar.json();
    let userPhoto = jsDataAvatar.result[0].titlePhoto;
    let temp = "http:";
    let tempArr = [temp,userPhoto];
    let finalPhoto = tempArr.join("");
    $(".Profile-Photo").attr("src",finalPhoto);
  }

  getUserRatings();
  getUserSubmissions();
  getUserSubRat();
  //getUserSubRatOK();
  getUserAvatar();

});

$(".username").text(user_handle);

$("#mybtn1").on("click", function(e) {
  $(".column-3").addClass("hidden");
  $("#myChart2").addClass("hidden");
  $("#myChart3").addClass("hidden");
  //$("#myChart4").addClass("hidden");
  $("#myChart1").removeClass("hidden");
  $("#hide-graph").removeClass("hidden");
  e.preventDefault();
});

$("#mybtn2").on("click", function(e) {
  $(".column-3").addClass("hidden");
  $("#myChart1").addClass("hidden");
  $("#myChart3").addClass("hidden");
  //$("#myChart4").addClass("hidden");
  $("#myChart2").removeClass("hidden");
  $("#hide-graph").removeClass("hidden");
  e.preventDefault();
});

$("#mybtn3").on("click", function(e) {
  $(".column-3").addClass("hidden");
  $("#myChart1").addClass("hidden");
  $("#myChart2").addClass("hidden");
  //$("#myChart4").addClass("hidden");
  $("#myChart3").removeClass("hidden");
  $("#hide-graph").removeClass("hidden");
  e.preventDefault();
});

$("#mybtn4").on("click", function(e) {
  $(".column-3").addClass("hidden");
  $("#myChart1").addClass("hidden");
  $("#myChart2").addClass("hidden");
  $("#myChart3").addClass("hidden");
  //$("#myChart4").removeClass("hidden");
  $("#hide-graph").removeClass("hidden");
  e.preventDefault();
});

$("#hide-graph").on("click", function(e) {
  $("#myChart1").addClass("hidden");
  $("#myChart2").addClass("hidden");
  $("#myChart3").addClass("hidden");
  //$("#myChart4").addClass("hidden");
  $(".column-3").removeClass("hidden");
  $("#hide-graph").addClass("hidden");
  e.preventDefault();
});
window.onload = console.log("hello");
