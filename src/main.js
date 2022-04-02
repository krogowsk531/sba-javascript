let loginCard = document.querySelector('.login-card-article');
let loginButton = document.querySelector('.login-button');
let activityCard = document.querySelector('.activity-card-article');
let activityButtonContainer = document.querySelector('.activity-button-container');
let studyButton = document.querySelector('.study-button');
let studyIcon = document.querySelector('.study-icon');
let studyIconActive = document.querySelector('.study-icon-active');
let meditateButton = document.querySelector('.meditate-button');
let meditateIcon = document.querySelector('.meditate-icon');
let meditateIconActive = document.querySelector('.meditate-icon-active');
let exerciseButton = document.querySelector('.exercise-button');
let exerciseIcon = document.querySelector('.exercise-icon');
let exerciseIconActive = document.querySelector('.exercise-icon-active');
let intentionInformation = document.querySelector('.intention-answer')
let minutesNumberOnly = document.querySelector('.minutes-input');
let secondsNumberOnly = document.querySelector('.seconds-input');
let startActivityButton = document.querySelector('.start-activity-button');
let timerCard = document.querySelector('.timer-card-article');
let userIntention = document.querySelector('.user-intention');
let minutesText = document.querySelector('.minutes-text');
let secondsText = document.querySelector('.seconds-text');
let timerButton = document.querySelector('.timer-button');
let logActivityButton = document.querySelector('.log-activity-button');
let completedActivity = document.querySelector('.completed-activity');
let newActivityButton = document.querySelector('.new-activity-button');
let activityInformation = [];
let selectedCategory;
let tagColor;

loginButton.addEventListener('click', displayActivityCard);
activityButtonContainer.addEventListener('click', activityButton);
startActivityButton.addEventListener('click', startActivity);
timerButton.addEventListener('click', timerStart);
logActivityButton.addEventListener('click', logActivity);
newActivityButton.addEventListener('click', returnHome);

window.onload = retrieveFromStorage();
window.onload = displayPastActivities();

function startActivity(event) {
  event.preventDefault();
  storeInformation();
  allowDisplayTimerCard();
  logActivityButton.disabled = true;
};

function activityButton(event) {
  if (event.target.classList.contains('study-button')) {
    selectStudyButton();
  } else if (event.target.classList.contains('meditate-button')) {
    selectMeditateButton();
  } else if (event.target.classList.contains('exercise-button')) {
    selectExerciseButton();
  }
};

function selectStudyButton() {
  selectedCategory = 'Study';
  tagColor = 'green';
  studyButton.classList.toggle('green');
  studyButton.classList.toggle('white');
  studyIcon.classList.toggle('hide');
  studyIconActive.classList.toggle('hide');
  timerButton.classList.add('green-circle');
  unselectMeditate();
  unselectExercise();
};

function selectMeditateButton() {
  selectedCategory = 'Meditate';
  tagColor = 'purple';
  meditateButton.classList.toggle('purple');
  meditateButton.classList.toggle('white');
  meditateIcon.classList.toggle('hide');
  meditateIconActive.classList.toggle('hide');
  timerButton.classList.add('purple-circle');
  unselectStudy();
  unselectExercise();
};

function selectExerciseButton() {
  selectedCategory = 'Exercise';
  tagColor = 'red';
  exerciseButton.classList.toggle('red');
  exerciseButton.classList.toggle('white');
  exerciseIcon.classList.toggle('hide');
  exerciseIconActive.classList.toggle('hide');
  timerButton.classList.add('red-circle');
  unselectMeditate();
  unselectStudy();
};

function unselectStudy() {
  studyIconActive.classList.add('hide');
  studyIcon.classList.remove('hide');
  studyButton.classList.remove('green');
  timerButton.classList.remove('green-circle');
};

function unselectMeditate() {
  meditateButton.classList.remove('purple');
  meditateIcon.classList.remove('hide');
  meditateIconActive.classList.add('hide');
  timerButton.classList.remove('purple-circle');
};

function unselectExercise() {
  exerciseIconActive.classList.add('hide');
  exerciseIcon.classList.remove('hide');
  exerciseButton.classList.remove('red');
  timerButton.classList.remove('red-circle');
};

function displayActivityCard(event) {
  console.log("HERE")
  event.preventDefault();
  activityCard.classList.remove('hide');
  loginCard.classList.add('hide');

}

function displayTimerCard() {
  timerCard.classList.remove('hide');
  activityCard.classList.add('hide');
  let activity = activityInformation[0];
  activity.display();
};

function allowDisplayTimerCard() {
  if ((selectedCategory !== undefined) && (intentionInformation.value.length > 0) && (minutesNumberOnly.value.length > 0) && (secondsNumberOnly.value.length > 0)) {
    displayTimerCard();
  }
};

function storeInformation() {
  if ((selectedCategory !== undefined) && (intentionInformation.value.length > 0) && (minutesNumberOnly.value.length > 0) && (secondsNumberOnly.value.length > 0)) {
    let activityInstance = new Activity (selectedCategory, intentionInformation.value, minutesNumberOnly.value, secondsNumberOnly.value, tagColor);
    activityInformation.unshift(activityInstance);
    activityInformation[0].saveToStorage();
  }
};

function timerStart() {
  let intentionTimer = setInterval(timerCountdown, 1000);
  let activity = activityInformation[0];
  let allSeconds = activity.countdown();
  function timerCountdown() {
    allSeconds--;
    minutesText.innerText = Math.floor((allSeconds/60) % 60 );
    secondsText.innerText = Math.floor((allSeconds) % 60 );
    if (allSeconds < 0) {
      clearInterval(intentionTimer);
      timerComplete();
    }
    if (secondsText.innerText < 10) {
      secondsText.innerText = ('0' + secondsText.innerText);
    }
  }
  timerButton.disabled = true;
};

function timerComplete() {
  let activity = activityInformation[0];
  activity.markComplete();
  logActivityButton.disabled = false;
};

function displayPastActivities() {
  let noActivitiesMessage = document.querySelector('.no-activities-message');
  let cardContainer = document.querySelector('.card-container');
  noActivitiesMessage.classList.add('hide');
  cardContainer.classList.remove('hide');
  cardContainer.innerHTML = '';
  for (let i = 0; i < activityInformation.length; i++) {
    cardContainer.innerHTML += `
    <article class='past-activity-card'>
    <p class='past-activity'>${activityInformation[i].category}</p>
    <p class='past-time'><span>${activityInformation[i].minutes} </span>MIN<span> ${activityInformation[i].seconds} </span>SECONDS</p>
    <p class='past-intention'>${activityInformation[i].description}</p>
    <div class='activity-color-tag ${activityInformation[i].tagColor}'></div>
    </article>
    `;
  }
};

function logActivity() {
  displayPastActivities();
  timerCard.classList.add('hide');
  completedActivity.classList.remove('hide');
  timerButton.disabled = false;
};

function retrieveFromStorage() {
  activityInformation = JSON.parse(localStorage.getItem('activityInformation')) || [];
};

function clearForm() {
    intentionInformation.value = '';
    minutesNumberOnly.value = '';
    secondsNumberOnly.value = '';
    unselectStudy();
    unselectMeditate();
    unselectExercise();
};

function returnHome() {
  console.log("HERE")
  completedActivity.classList.add('hide');
  activityCard.classList.remove('hide');
  timerButton.innerText = `START`;
  clearForm();
};
