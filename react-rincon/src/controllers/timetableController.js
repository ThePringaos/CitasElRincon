class timetableController {
    constructor() {
    }

    handleChange = async (time, day, dayData) => {
        if (time == null) return;
        const filteredTime = await String(time).match(/\d{2}:\d{2}/g)[0];
        if (day == "from") {
            dayData.myDateFrom = time;
            dayData.from = filteredTime;
        } else if (day == "to") {
            dayData.myDateTo = time;
            dayData.to = filteredTime;
        }
        return dayData;
    }

}

export default new timetableController();