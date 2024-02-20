const dayStart = '07:30';
const dayEnd = '17:45';

function scheduleMeeting(startTime, duartionMinutes) {
    const startHhmm = toHHMM(startTime);
    const dayStartTemp = toHHMM(dayStart);

    if (startHhmm < dayStartTemp) {
        console.log(false);
        return;
    }

    const endHhmm = addTime(startHhmm, duartionMinutes);
    const dayEndTemp = toHHMM(dayEnd);

    if (endHhmm > dayEndTemp) {
        console.log(false);
        return;
    }

    console.log(true);
}

function toHHMM(time) {
    return parseInt(time.split(':').join(''), 10);
}

function addTime(baseTime, duration) {
    const hours = parseInt(duration / 60);
    const minutes = parseInt(duration % 60);

    const computedTime = baseTime + hours * 100 + minutes;

    let computedHours = parseInt(computedTime / 100);
    let computedMinutes = parseInt(computedTime % (computedHours * 100));

    while (computedMinutes >= 60) {
        computedHours++;
        computedMinutes -= 60;
    }

    return computedHours * 100 + computedMinutes;
}

scheduleMeeting('7:00', 15); // false
scheduleMeeting('07:15', 30); // false
scheduleMeeting('7:30', 30); // true
scheduleMeeting('11:30', 60); // true
scheduleMeeting('17:00', 45); // true
scheduleMeeting('17:30', 30); // false
scheduleMeeting('18:00', 15); // false
