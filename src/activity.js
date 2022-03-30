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
};
