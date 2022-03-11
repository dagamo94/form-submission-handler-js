import "./index.css";

/*
Form Submit Handler
Attach an event listener to the search form on the HTML. You may create additional supporting functions if you wish. On submission of the form, the following must occur:

Validate the form
Ensure that the form is not blank. Here, blank means an empty string or a string containing only spaces. If the form is blank, display an error message by creating and appending a new error element to the end of the form. The error element must take the following form:

<div class="error" id="searchError">Please enter a search term</div>
If the form is not blank, the error element should not be on the form.

Perform the search
Perform a case-insensitive search of the titles of the articles (that is, the innerHTML values of the h2 elements). If the search term matches any part of the title, the article should be displayed. If the search term doesn't match any part of the title, the article should be hidden.

To hide an article, add the class hidden to the article element. To make it visible again, remove the class hidden from the article element.

If a second search is conducted, articles hidden by any previous searches should be made visible again.
*/

function validateExists(value) {
  return value && value.trim();
}

function validateForm(formData) {
  let error = "";

  if (!validateExists(formData.get("searchTerm")))
    error = "Please enter a search term";

  return error;
}

const submitHandler = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  // ******* ERROR CHECKING *****
  const errorDiv = document.createElement("div");
  const error = validateForm(formData);

  if (error && document.querySelectorAll(".error").length < 1) {
    errorDiv.classList.add("error");
    errorDiv.setAttribute("id", "searchError");
    errorDiv.innerText = error;
    document.querySelector(".search").appendChild(errorDiv);
  }

  if (!error && document.querySelectorAll(".error").length > 0) {
    document.querySelector(".error").remove();
  }

  // ******* SEARCH *******

  if (!error) {
    // store list of articles and convert list to an arrya
    const articles = document.querySelectorAll("article");
    const articlesArr = Array.from(articles);

    console.log(articlesArr);

    //iterate through the list and check each title to see if it includes any part of the search term
    articlesArr.forEach((article) => {
      const articleTitle = article.querySelector("h2").innerText.toLowerCase();
      const searchTerm = formData.get("searchTerm").toLowerCase();
      console.log(articleTitle);
      console.log(searchTerm);

      if (!articleTitle.includes(searchTerm)) {
        // if found, set display to none for all other articles, else set display none to all articles
        article.classList.add("hidden");
      } else {
        article.classList.remove("hidden");
      }
    });
  }
};

const main = () => {
  // Get the form element
  const form = document.querySelector("#searchForm");

  // Attach the submit handler
  form.addEventListener("submit", submitHandler);
};

window.addEventListener("DOMContentLoaded", main);
