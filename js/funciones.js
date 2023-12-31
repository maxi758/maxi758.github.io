function firstNameFromArray(array) {
  return array[0].name.first;
}
function lastNameFromArray(array) {
  return array[0].name.last;
}
function completeNameFromArray(array) {
  return firstNameFromArray(array) + " " + lastNameFromArray(array);
}
function pictureFromArray(array) {
  return array[0].picture.large;
}
function emailFromArray(array) {
  return array[0].email;
}
function phoneFromArray(array) {
  return array[0].phone;
}
function countryFromArray(array) {
  return array[0].location.country;
}
function addressFromArray(array) {
  return (
    array[0].location.street.name +
    " " +
    array[0].location.street.number +
    ", " +
    array[0].location.city +
    ", " +
    array[0].location.state +
    ", " +
    array[0].location.country
  );
}
function universityFromArray(array) {
  return array[0].name;
}
function randomUniversityFromArray(array) {
  return array[Math.floor(Math.random() * array.length)].name;
}
function selectSkillsFromJson(array) {
  let skills = [];
  let index;
  for (let i = 0; i < 3; i++) {
    index = Math.floor(Math.random() * array.length);
    skills.push(array[index].skill);
    array.splice(index, 1);
  }
  return skills;
}

let name = document.getElementById("name1");
let image = document.getElementById("userImage");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let address = document.getElementById("address");
let university = document.getElementById("university");
let skills = document.getElementById("skills");
let country;
const options = { method: "GET", mode: "cors", cache: "default" };
fetch("https://randomuser.me/api/")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    image.src = pictureFromArray(data.results);
    name.innerHTML = completeNameFromArray(data.results);
    email.innerHTML = emailFromArray(data.results);
    phone.innerHTML = phoneFromArray(data.results);
    address.innerHTML = addressFromArray(data.results);
    country = countryFromArray(data.results);
    const encodedCountry = encodeURIComponent(country);
    const jsonFileUrl2 =
      "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";
    return fetch(jsonFileUrl2);
  })
  .then((response) => {
    // verifica si está todo ok (status code 200)
    if (!response.ok) {
      throw new Error(`Error (${response.status})`);
    }
    // Parsea a  JSON
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const filteredData = data.filter((university) => { 
      return university.country === country;
    });
    university.innerHTML = randomUniversityFromArray(filteredData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// esto no funciono en github pages por noo usar https
/*return fetch(
      `http://universities.hipolabs.com/search?country=${encodedCountry}`,
      options
    );
  })
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    university.innerHTML = randomUniversityFromArray(data);
    console.log(data);
  })
  .catch(function (error) {
    console.error("Error:", error);
  });*/

const jsonFileUrl = "skills.json";

fetch(jsonFileUrl)
  .then((response) => {

    if (!response.ok) {
      throw new Error(`Failed to fetch the JSON file (${response.status})`);
    }

    return response.json();
  })
  .then((data) => {

    const skillSet = selectSkillsFromJson(data);
    const list = document.createElement("ul");
    list.classList.add("list-group");
    skills.appendChild(list);
    for (let i = 0; i < skillSet.length; i++) {
      const skill = document.createElement("li");
      skill.classList.add(
        `skill${i}`,
        "text-center",
        "list-group-item",
        "mt-3",
        "bg-dark",
        "text-white"
      );
      skill.innerHTML = skillSet[i];
      list.appendChild(skill);
      console.log(skillSet[i]);
    }
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
