import React from "react";
import {Alert, View} from "react-native";

import Name from './questions/Name';
import DueDate from "./questions/DueDate";
import CalcDueDate from "./questions/CalcDueDate";
import BirthDay from "./questions/BirthDay";
import OtherTests from "./questions/OtherTests";
import {StoreContext} from "../../components/context";
import Tts from "react-native-tts";

const Questions = ({navigation}) => {

    const { saveData } = React.useContext(StoreContext);

    const [name, setName] = React.useState('');
    const [dueDate, setDueDate] = React.useState(new Date(Date.now()+86400000*7*35));
    const [birthDate, setBirthDate] = React.useState(new Date('2000-01-01'));
    const [mm, setMm] = React.useState('');
    const [hg, setHg] = React.useState('');
    const [urineLevel, setUrineLevelValue] = React.useState('');
    const [weight, setWeightValue] = React.useState('');
    const [height, setHeightValue] = React.useState('');

    const [isSetTime, setIsSetTime] = React.useState(false);
    const [isSetBD, setIsSetBD] = React.useState(false);

    const [page, setPage] = React.useState(1);

    const speaches = [
        'Let us configure the details. First, i need to know your name.',
        'Now ok, select your due date if you know. Otherwise you can calculate your due date.',
        'In here, select your first date of last cycle, and cycle length.',
        'Now, select your birth date.',
        'In here, if you know the values for these fields, you can fill them. Otherwise, ignore them.'
    ]

    React.useEffect(() => {
        Tts.stop();
        setTimeout(() => {
            Tts.speak(speaches[page-1], {
                androidParams: {
                    // KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 1000)
    }, [page])

    const nextPage = (value) => {
        setPage(page + value);
    }

    const prevPage = (value) => {
        setPage(page - value);
    }

    const save = () => {
        saveData({
            dueDate: Date.parse(dueDate.toISOString().substr(0, 10)),
            name: name.trim(),
            birthDay: Date.parse(birthDate.toISOString().substr(0, 10)),
            bloodPressure: {
                mm: mm.trim(),
                hg: hg.trim()
            },
            urineLevel: urineLevel.trim(),
            weight: weight.trim(),
            height: height.trim()
        });
    }

    if (page === 1) {
        return (
            <Name next={nextPage} name={name} setName={setName}/>
        )
    } else if (page === 2) {
        return (
            <DueDate
                next={nextPage}
                prev={prevPage}
                dueDate={dueDate}
                setDueDate={setDueDate}
                isSetTime={isSetTime}
                setIsSetTime={setIsSetTime}
            />
        )
    } else if (page === 3) {
        return (
            <CalcDueDate next={nextPage} prev={prevPage} dueDate={dueDate} setDueDate={setDueDate}/>
        )
    } else if (page === 4) {
        return (
            <BirthDay
                isSetBD={isSetBD}
                next={nextPage}
                prev={prevPage}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                setIsSetBD={setIsSetBD}
            />
        )
    } else {
        return (
            <OtherTests
                mm={mm}
                hg={hg}
                height={height}
                urineLevel={urineLevel}
                weight={weight}
                setUrineLevelValue={setUrineLevelValue}
                setWeightValue={setWeightValue}
                setHeight={setHeightValue}
                setMm={setMm}
                setHg={setHg}
                prev={prevPage}
                finish={save}
            />
        )
    }
}

export default Questions
