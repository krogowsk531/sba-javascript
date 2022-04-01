class Activity {
  constructor(category, description, minutes, seconds, tagColor) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.tagColor = tagColor;
    this.completed = false;
    this.id = Date.now();
  }

  countdown() {
  return parseInt(this.minutes) * 60 + parseInt(this.seconds);
  }

  display() {
    userIntention.innerText = this.description;
    minutesText.innerText = this.minutes;
    secondsText.innerText = this.seconds;
    if (secondsText.innerText < 10) {
      secondsText.innerText = ('0' + secondsText.innerText);
    }
  }

  markComplete() {
    secondsText.innerText = `0`;
    minutesText.innerText = `0`;
    timerButton.innerText = `WELL-DONE`;
  }

  saveToStorage() {
    localStorage.setItem('activityInformation', JSON.stringify(activityInformation));
  }
};
