var routes = [{
        path: '/',
        componentUrl: '../pages/home.html',
    },
    {
        path: '/loading',
        redirect: async function(route, resolve, reject) {
            const connected = await isAlreadyConnected();

            // if we have "user" query parameter
            if (connected) {
                // redirect to such url
                app.dialog.confirm(
                    'An account is already connected, do you want to continue?',
                    function() {
                        // go to main
                        resolve('/main');
                    },
                    function() {
                        // go back and disconnect
                        localStorage.removeItem('token');
                        resolve('/');
                    })
            }
            // otherwise do nothing
            else {
                resolve('/');
            }
        },
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
        path: '/friend_requests',
        componentUrl: '../pages/friend_requests.html',
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
    {
        path: '/sharePos',
        componentUrl: '../pages/sharePos.html',
    },
    {
        path: '/histPos',
        componentUrl: '../pages/historyPos.html',
    },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './www/pages/home.html',
    },
];

async function isAlreadyConnected() {
    var token = localStorage.getItem('token');
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
            return (true); // si le token existe et est valide
        } else {
            return (false); // token existe mais n'est plus valable
        }


    } else {
        return (false);
    }
}


function method() {
    return {
        url: "http://localhost:3000/isConnect",
        method: "POST"
    }
}