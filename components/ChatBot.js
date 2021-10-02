import {getPeriod} from "../assets/statics";
import {instructions} from '../assets/instructions'
import {BackHandler} from "react-native";
import {questions} from "../assets/questions";

export const ChatBot = async (data) => {

    const details = await data.data();

    const search = data.text.trim().toLowerCase()
        .replace(/ /g,'')
        .replace(/\./g,'')
        .replace(/\?/g,'')
        .replace(/\'/g,'');

    const period = await getPeriod(details.dueDate);

    if(questions.jokes.includes(search)){

        let data = {};
        await fetch('https://api.yomomma.info/')
            .then(response => response.json())
            .then(d => {
                data = d;
            })
            .catch(err => {
                console.log(err)
            });

        return {
            text: data.joke + ' 🤔',
            // ans: data.punchline + ' 😂',
            ans2: 'Do you need any thing else? If you need to know the things what ' +
                'I have for you! Please let me know!'
        };
    }else if(questions.dueDate.includes(search)){
        const date = new Date(details.dueDate).toString().substr(0,15);
        return {
            text: `Your due date is ${date} 😍`
        };
    }else if(questions.food_plan.includes(search)){
        const res = instructions.food_plan[period.month.toString()][period.week.toString()];
        return { text: res + " 😍"};
    }
    else if(questions.exit.includes(search)){
        BackHandler.exitApp();
        return { text: 'Ok. Good bye 🙄' }
    }else if(questions.trimester.includes(search)){
        const res = instructions.trimester_details[period.month.toString()][period.week.toString()];
        return { text: res + " 😍"};
    }
    else if(questions.exercises.includes(search)){
        data.navigation.navigate('Exercises');
        return { text: 'These are the exercises that you should follow. '};
    }
    else if(questions.updateTodoList.includes(search)){
        data.navigation.navigate('ToDoList');
        return { text: 'Here is the task list of you. '};
    }
    else if(questions.todoList.includes(search)){
        var toDoList = await data.toDo();
        if (toDoList===null){
            toDoList =[]
        }
        var text = null;
        for(var i=0; i<toDoList.length; i++){
            if(text===null){
                text = '';
            }
            text = text + toDoList[i].text + '. \n';
        }
        if(text===null){
            return {
                text: 'You have not added any birth plan yet. ',
                ans: 'If you wish you can update your birth plan. ',
                ans2: 'What do you want?'
            };
        }else {
            return {
                text: 'Your birth plans are, \n' + text,
                ans: 'If you wish you can go to your birth plan page and update your birth plans there. ',
                ans2: 'What dou you want? '
            }
        }
    }
    else if(questions.secret.includes(search)){
        return {
            text: 'I suggest a good song',
            video: {uri:"https://drive.google.com/uc?export=download&id=17kxWQpBcdKCsRh4YEJRcHnNQFguktJen"},
            ans: 'Do you need any thing else? If you need to know the ' +
                'things what I have for you! Please let me know! '
        }
    }
    else if(questions.hello.includes(search)){
        return {
            text: 'Hello '+ details.name + '\nHow are you? '
        }
    }
    else if(questions.fine.includes(search)){
        return {
            text: "Nice to hear that you are fine!\n" +
                "So, I have arranged a diet plan and an exercises plan here to improve your physical health. " +
                "And also you can hear some funny jokes about entertainment as well as music which I'm " +
                "recommending to you! and I can arrange the information on your current blood pressure, " +
                "current weight height, current urine level and trimester information for you and your " +
                "baby! And you can update those current blood pressure, current weight height, current " +
                "urine level, current due date. And you can maintain your birth plan as well. If you " +
                "need anything from those, please let me know! Have a nice day!"
        }
    }
    else if(questions.notFine.includes(search)){
        return {
            text: 'Don\'t worry dear! I can tell a joke and suggest some mind relaxation music to you to ' +
                'reduce your pains? What do you need? '
        }
    }
    else if(questions.whatHave.includes(search)){
        return {
            text: "I have arranged a diet plan and an exercises plan here to improve your physical health. " +
                "And also you can hear some funny jokes about entertainment as well as music which I'm " +
                "recommending to you! and I can arrange the information on your current blood pressure, " +
                "current weight height, current urine level and trimester information for you and your " +
                "baby! And you can update those current blood pressure, current weight height, current " +
                "urine level, due date.\n" +
                "  And you can maintain your birth plan as well. If you need anything from those, please " +
                "let me know! Have a nice day!"
        }
    }
    else if(questions.weightHeight.includes(search)){
        if(details.weight && details.height){
            const value = details.weight / ((details.height/100) * (details.height/100));
            const bmi = value.toFixed(2);
            if (bmi<18.5){
                return {
                    text: `Your weight is ${details.weight} kg and your height is ${details.height} cm.\nYour BMI value is ${bmi}. So you are under weight. `
                }
            }else if(bmi>25){
                return {
                    text: `Your weight is ${details.weight} kg and your height is ${details.height} cm.\nYour BMI value is ${bmi}. You are over weight. `
                }
            }else{
                return {
                    text: `Your weight is ${details.weight} kg and your height is ${details.height} cm.\nYour BMI value is ${bmi}. So you are in normal range. You are completely ok. `
                }
            }
        }else {
            return {
                text: 'You have not entered your weight and height to the app. Please if you know those values, ' +
                    'update your profile. '
            }
        }
    }

    else if(questions.updateProfile.includes(search)){
        data.navigation.navigate('EditProfile');
        return {
            text: 'You can update your profile now. '
        }
    }

    else if(questions.profile.includes(search)){
        data.navigation.navigate('Profile');
        return {
            text: 'This is your profile. '
        }
    }

    else if(questions.urineLevel.includes(search)){
        if(details.urineLevel){
            if (details.urineLevel<4.8){
                return {
                    text: `Your urine level is ${details.urineLevel} ph. It is too low. `
                }
            }else if(details.urineLevel>8){
                return {
                    text: `Your urine level is ${details.urineLevel} ph. It is too high. `
                }
            }else {
                return {
                    text: `Your urine level is ${details.urineLevel} ph. It is normal. You are ok. `
                }
            }

        }else {
            return {
                text: 'You have not entered your urine level value to the app. ' +
                    'If you know that value, please update your profile. '
            }
        }
    }

    else if(questions.bloodPressure.includes(search)){
        if(details.bloodPressure.mm && details.bloodPressure.hg){
            const bp = details.bloodPressure.mm / details.bloodPressure.hg

            if(bp < 90/60){
                return {
                    text: `Your blood pressure value is ${details.bloodPressure.mm}/${details.bloodPressure.hg} mm/Hg. It is too low. `
                }
            }else if(bp > 140/90){
                return {
                    text: `Your blood pressure value is ${details.bloodPressure.mm}/${details.bloodPressure.hg} mm/Hg. It is too high. `
                }
            }else{
                return {
                    text: `Your blood pressure value is ${details.bloodPressure.mm}/${details.bloodPressure.hg} mm/Hg. It is normal. `
                }
            }
        }else {
            return {
                text: 'You have not entered your blood pressure value to the app. ' +
                    'If you know that value, please update your profile. '
            }
        }
    }

    else if (questions.whoAreYou.includes(search)){
        return {
            text: "I'm Maatha. I'm yor personal assistant. Let me know if you need something from me. "
        }
    }

    else if (questions.howAreYou.includes(search)){
        return {
            text: "I'm fine. How are you? "
        }
    }
    else if(questions.music.includes(search)){

        const rndInt = Math.floor(Math.random() * 10)
        const music = instructions.music[rndInt];

        return {
            text: 'I suggest a good song',
            link: music,
            ans: 'Do you need any thing else? If you need to know the ' +
                'things what I have for you! Please let me know! '
        }
    }
    else{
        return {
            text: "I'm really sorry. I have no idea, what you are asking for. 🙄",
            ans: "Is there anything to know from me? "
        };
    }
}
