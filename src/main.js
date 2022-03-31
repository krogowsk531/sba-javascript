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
let intentionInformation = document.querySelector('.intention-answer');
let selectedCategory;
let tagColor;

activityButtonContainer.addEventListener('click', activityButton);

addIntentionAlert();
iconAlert();

function activityButton(e) {
  if (e.target.classList.contains('study-button')) {
    selectStudyButton();
  } else if (e.target.classList.contains('meditate-button')) {
    selectMeditateButton();
  } else if (e.target.classList.contains('exercise-button')) {
    selectExerciseButton();
  }
}

function selectStudyButton() {
  selectedCategory = 'Study';
  tagColor = 'green';
  studyButton.classList.toggle('green');
  studyButton.classList.toggle('white');
  studyIcon.classList.toggle('hide');
  studyIconActive.classList.toggle('hide');
  unselectMeditate();
  unselectExercise();
}

function selectMeditateButton() {
  selectedCategory = 'Meditate';
  tagColor = 'purple';
  meditateButton.classList.toggle('purple');
  meditateButton.classList.toggle('white');
  meditateIcon.classList.toggle('hide');
  meditateIconActive.classList.toggle('hide');
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
  unselectMeditate();
  unselectStudy();
};

function unselectStudy() {
  studyIconActive.classList.add('hide');
  studyIcon.classList.remove('hide');
  studyButton.classList.remove('green');
};

function unselectMeditate() {
  meditateButton.classList.remove('purple');
  meditateIcon.classList.remove('hide');
  meditateIconActive.classList.add('hide');
}

function unselectExercise() {
  exerciseIconActive.classList.add('hide');
  exerciseIcon.classList.remove('hide');
  exerciseButton.classList.remove('red');
}

function iconAlert() {
  let alertUnselectedActivity = document.querySelector('.alert-unselected-activity');
  if (selectedCategory === undefined) {
    alertUnselectedActivity.classList.remove('hide');
  } else {
    alertUnselectedActivity.classList.add('hide');
  }
};

function addIntentionAlert() {
  let alertEmptyText = document.querySelector('.alert-empty-text');
  if (intentionInformation.value.length === 0) {
    alertEmptyText.classList.remove('hide');
  } else {
    alertEmptyText.classList.add('hide');
  }
};
