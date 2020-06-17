import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
    state = {
        monday: {
            myDateFrom: new Date(),
            from: "",
            myDateTo: new Date(),
            to: ""
        },
        aux: ""
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-body">
                                <DatePicker
                                    selected={this.state.monday.myDateFrom}
                                    onChange={time => this.handleChange(time, 'mondayFrom')}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={20}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />

                                <DatePicker
                                    selected={this.state.monday.myDateTo}
                                    onChange={time => this.handleChange(time, 'mondayTo')}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={20}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleChange = async (time, day) => {
        const filteredTime = await String(time).match(/\d{2}:\d{2}/g)[0];
        switch (day) {
            case "mondayFrom": 
                this.state.monday.myDateFrom = time;
                this.state.monday.from = filteredTime;
                break;
            case "mondayTo":
                this.state.monday.myDateTo = time;
                this.state.monday.to = filteredTime;
                break;

            default:
                break;
        }
        //This is just to render the changes
        this.setState({aux: ":)"})
    };

}

export default App;