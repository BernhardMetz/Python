const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'home',
                'title': 'Home',
                'type' : 'item',
                'icon' : 'home',
                'url'  : '/apps/home'
            },
            {
                'id'      : 'user',
                'title'   : 'Users',
                'type'    : 'collapse',
                'icon'    : 'group',
                'url'     : '/apps/user',
                'children': [
                    {
                        'id'   : 'users',
                        'title': 'Users',
                        'type' : 'item',
                        'url'  : '/apps/user/users',
                        'exact': true
                    },
                    {
                        'id'   : 'user-detail',
                        'title': 'User Detail',
                        'type' : 'item',
                        'url'  : '/apps/user/users/1/a-walk-amongst-friends-canvas-print',
                        'exact': true
                    },
                    {
                        'id'   : 'new-user',
                        'title': 'New User',
                        'type' : 'item',
                        'url'  : '/apps/user/users/new',
                        'exact': true
                    }
                ]
            },
            {
                'id'      : 'company',
                'title'   : 'Companies',
                'type'    : 'item',
                'icon'    : 'business',
                'url'     : '/apps/company'
            },
            {
                'id'      : 'area',
                'title'   : 'Areas',
                'type'    : 'item',
                'icon'    : 'departure_board',
                'url'     : '/apps/area'
            },
            {
                'id'   : 'log',
                'title': 'Log',
                'type' : 'item',
                'icon' : 'history',
                'url'  : '/apps/log'
            },
            {
                'id'   : 'profile',
                'title': 'My Profile',
                'type' : 'item',
                'icon' : 'perm_identity',
                'url'  : '/apps/profile'
            }
        ]
    }
];

export default navigationConfig;
