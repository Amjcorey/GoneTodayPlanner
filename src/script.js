// When document is ready
$(document).ready(function () {
  let currentHour = dayjs().hour(); // Get current hour using dayjs

  //Display current date in header
  function displayDate() {
    let date = dayjs().format("dddd, MMM D YYYY");
    $("#currentDay").text(date);
    // console.log(date);
  }

  // Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.

  $(".saveBtn").on("click", function () {
    //get nearby values
    console.log(this);
    let text = $(this).siblings(".description").val();
    let time = $(this).parent().attr("id");

    //set items in local storage.
    localStorage.setItem(time, text);
  });
  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  //Storing data/event description in localStorage unpon button click for each hour in 24-hour time
  $("hour9 .description").val(localStorage.getItem("hour9"));
  $("hour10 .description").val(localStorage.getItem("hour10"));
  $("hour11 .description").val(localStorage.getItem("hour11"));
  $("hour12 .description").val(localStorage.getItem("hour12"));
  $("hour13 .description").val(localStorage.getItem("hour13"));
  $("hour14 .description").val(localStorage.getItem("hour14"));
  $("hour15 .description").val(localStorage.getItem("hour15"));
  $("hour16 .description").val(localStorage.getItem("hour16"));
  $("hour17 .description").val(localStorage.getItem("hour17"));

  // Create and display time blocks
  function displayTimeBlocks() {
    let currentTime = dayjs().hour();

    // Loop over each work hour and create time blocks
    $(".time-block").each(function () {
      let timeBlock = parseInt($(this).attr("id").split("hour")[1]);
      console.log(timeBlock, currentTime);

      // Add code to apply the past, present, or future class to each time
      // block by comparing the id to the current hour.

      if (timeBlock < currentTime) {
        $(this).addClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
      } else if (timeBlock === currentTime) {
        $(this).removeClass("past");
        $(this).addClass("present");
        $(this).removeClass("future");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  // Call functions
  displayTimeBlocks();
  displayDate();

  // Update the time blocks every minute to check for past, present, or future
  setInterval(function () {
    displayTimeBlocks();
  }, 60000);
});