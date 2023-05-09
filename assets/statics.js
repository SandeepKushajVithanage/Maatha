const Color1 = {
    primaryColor: '#edc5f6',
    secondaryColor: '#fff',
    thirdColor: '#790e8b'
};

const Color2 = {
    primaryColor: '#fcc9ee',
    secondaryColor: '#fff',
    thirdColor: '#ff0094'
};

const Color3 = {
    primaryColor: '#ccfaf8',
    secondaryColor: '#fff',
    thirdColor: '#018b9d'
};

const Color4 = {
    primaryColor: '#fff',
    secondaryColor: '#efefef',
    thirdColor: '#790e8b'
};

export const colors = Color4;

export const gradientColors = ['#ca23ef', '#700388']

export const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
}

export const day = 86400000;
export const week = day * 7;
export const month = day * 30;
export const year = day * 365;

export const today = Date.parse(new Date().toISOString().substr(0, 10))

export const getPeriod = (dueDate) => {
    if(dueDate){
        const difference = (today - (dueDate - week*38)) / month;
        const months = Math.floor(difference);
        const rest = difference - months;
        return {
            month: months+1,
            week: rest <= 0.25 ? 1 : rest <= 0.5 ? 2 : rest <= 0.75 ? 3 : 4
        };
    }else {
        return {
            month: -1,
            week: -1
        };
    }
}

// {
//     "history":[{"key": "Home-hgsOXVBxuNLdPTDs9jue5", "type": "route"}, {"key": "Exercises-tFfu2c03TKQHFiJlnxkgK", "type": "route"}],
//     "index": 3,
//     "key": "drawer-T90DQgavCxD4qrHnr3zIn",
//     "routeNames": ["Home", "ToDoList", "Notifications", "Exercises", "Profile", "EditProfile", "AboutUs"],
//     "routes": [{"key": "Home-hgsOXVBxuNLdPTDs9jue5", "name": "Home", "params": undefined},
//     {"key": "ToDoList-fnU_E0eu0_ZVxfwaJTX_U", "name": "ToDoList", "params": undefined},
//     {"key": "Notifications-CqjJgJcH9rrB0WcLNtYNf", "name": "Notifications", "params": undefined},
//     {"key": "Exercises-tFfu2c03TKQHFiJlnxkgK", "name": "Exercises", "params": undefined},
//     {"key": "Profile-vviRwEh8J2HuwdGvusG5A", "name": "Profile", "params": undefined},
//     {"key": "EditProfile-FAB0UzlEjBMSeWHKiiQ8k", "name": "EditProfile", "params": undefined},
//     {"key": "AboutUs-S4-krolFDGMB4Zcgi0cJ7", "name": "AboutUs", "params": undefined}],
//     "stale": false, "type": "drawer"
// }

