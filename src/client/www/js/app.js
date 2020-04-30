var app = new Framework7({
  root: '#app', // App root element
  id: 'Application', // App bundle ID
  name: 'Friend-finder', // App name
  theme: 'auto', // Automatic theme detection
  // App routes
  routes: routes,
});

var calendarModal = app.calendar.create({
  inputEl: '#demo-calendar-modal',
  openIn: 'customModal',
  header: true,
  footer: true,
});

app.views.create('.view-main', {
  url: '/'
})
