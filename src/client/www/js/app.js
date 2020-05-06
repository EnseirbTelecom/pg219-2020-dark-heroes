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

//const url = await urlStart();
var main = app.views.create('.view-main', {
    url: '/loading'
})

//initialize connection if user is already connected, like in facebook


function method() {
    return {
        url: "http://localhost:3000/isConnect",
        method: "POST"
    }
}