var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  years = ["2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005"],
  elemDays = document.querySelector("#select-days"),
  elemMonths = document.querySelector("#select-months"),
  elemYear = document.querySelector("#select-years"),
  button = document.querySelector("#button"),
  fields = document.querySelectorAll(".field"),
  secondPass = document.querySelector("#second-pass"),
  firstPass = document.querySelector("#first-pass");

function options (array, elem) {
  for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.text = array[i];
    option.value = array[i];
    elem.appendChild(option);
  }
}
options(days, elemDays), options(months, elemMonths), options(years, elemYear);
button.addEventListener("click", function() {
  for (var e = 0; e < fields.length; e++) fields[e].value ? fields[e].style.borderBottom = "1px solid green" : fields[e].style.borderBottom = "1px solid red"
});