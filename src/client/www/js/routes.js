var routes = [{
        path: '/',
        componentUrl: '../pages/home.html',
    },
    {
        path: '/loading',
        componentUrl: '../pages/loading.html',
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
    {
        path: '/add_friend',
        componentUrl: '../pages/add_friend.html',
    },
    {
        path: '/profile',
        componentUrl: '../pages/profile.html',
    },
    // {
    //     path: '/is-already-log/',
    //     async(routeTo, routeFrom, resolve, reject) {
    //       console.log(routeTo);
    //       console.log(toutefrom)
    //         // var userIsLoggedIn = true
    //         // if (userIsLoggedIn) {
    //         //     resolve({
    //         //         url: '../pages/main.html',
    //         //     });
    //         // } else {
    //         //     resolve({
    //         //         loginScreen: {
    //         //             url: '../pages/home.html'
    //         //         },
    //         //     });
    //         // }

    //     },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './www/pages/home.html',
    },
];

async function urlStart() {
    var token = localStorage.getItem('token');
    console.log(token)
    var queryData = method();
    if (token) {
        const res = await fetch(queryData.url, {
            method: queryData.method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,

            },
        })
        const status = await res.status;
        if (status == 200) {
            this.$router.navigate('/main') // si le token existe et est valide
        } else {
            this.$router.navigate('/main')
        }
        // .catch(err => console.log('Error ' + err))
        // .then(res => {
        //     if (res.status == 200) {
        //         return ('/main'); // si le token existe et est valide
        //     } else {
        //         return ('/');
        //     }
        // });



    } else {
        this.$router.navigate('/main')
    }
}


function method() {
    return {
        url: "http://localhost:3000/isConnect",
        method: "POST"
    }
}