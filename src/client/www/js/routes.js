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
  {
    path: '/friend_list',
    componentUrl: '../pages/friend_list.html',
  },
  {
    path: '/friend',
    componentUrl: '../pages/friend.html',
  },
  {
    path: '/main',
    componentUrl: '../pages/main.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './www/pages/home.html',
  },
];
