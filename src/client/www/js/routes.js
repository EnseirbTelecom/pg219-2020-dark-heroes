var routes = [
  {
    path: '/',
    componentUrl: '../pages/home.html'
  },
  {
    path: '/signup',
    componentUrl: '../pages/signup.html',
  },
  {
    path: '/signin',
    componentUrl: '../pages/signin.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './www/pages/home.html',
  },
];
