// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  $(function () {
    // Function to update hour classes
    function updateHourClasses() {
      var currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
  
        if (timeBlockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (timeBlockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    // Call the updateHourClasses function
    updateHourClasses();
  
    // Function to load saved user input
    function loadSavedUserInput() {
      $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var savedUserInput = localStorage.getItem(timeBlockId);
        if (savedUserInput !== null) {
          $(this).find(".description").val(savedUserInput);
        }
      });
    }
  
    // Call the loadSavedUserInput function
    loadSavedUserInput();
  
    // Function to display the current date
    function displayCurrentDate() {
      var currentDate = dayjs().format("MMMM D, YYYY");
      $("#currentDay").text(currentDate);
    }
  
    // Call the displayCurrentDate function
    displayCurrentDate();
  
    // Event handler for save button clicks
    $(".saveBtn").on("click", function () {
      var userInput = $(this).siblings(".description").val();
      var timeBlockId = $(this).parent().attr("id");
      localStorage.setItem(timeBlockId, userInput);
    });
  });