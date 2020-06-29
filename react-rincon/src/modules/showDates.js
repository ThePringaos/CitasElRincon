import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Redirect } from "react-router-dom";

import DateService from '../services/date.service';
import ProfessionalService from '../services/professional.service'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nav from './nav';

class homeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            dates: [],
            id: sessionStorage.getItem("userId"),
            email: sessionStorage.getItem("userEmail"),
            startDate: new Date(),
            endDate: new Date(),
            daysToQuery : []
        };

        //We add addDays to DATE 
        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
    }

    componentDidMount() {
        this.isUserRegistered();
        this.loadUserId();
        this.showTodayDates();
    }

    isUserRegistered() {
        if (sessionStorage.getItem('isUserRegistered') == 'false') {
            this.setState({ redirect: '/crear-perfil' });
        }
    }

    async loadUserId() {
        await ProfessionalService.getWithEmail({ email: this.state.email })
            .then(res => {
                if (res.data.success) {
                    const { id } = res.data.data[0];
                    sessionStorage["userId"] = id;
                } else {
                    console.error('Error loading Id');
                }
            })
            .catch(err => {
                console.error('ERROR server' + err);
            });

        if(sessionStorage.getItem("userId")==null){
            this.setState({redirect : "/crear-perfil"});
        }
    }

    async showTodayDates() {
        let myDates = [];

        let aux = this.state.daysToQuery;
        if(aux.length==0){
            aux = [this.filterDate(new Date())];
        }

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
              await callback(array[index], index, array);
            }
        }

        await asyncForEach(aux, async (each) => {
            await DateService.getDates({ id: this.state.id ,day: each})
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    myDates.push({ dates: data });
                } else {
                    console.error('Error loading dates service');
                }
            })
            .catch(err => {
                console.error('ERROR server' + err);
            });
          })

        this.setState({dates: myDates});
    }

    async setStartDate(date){
        await this.setState({startDate :date});
        this.setState({daysToQuery: this.getDaysToQuery()});
        this.showTodayDates();
    }

    async setEndDate(date){
        await this.setState({endDate :date});
        this.setState({daysToQuery: this.getDaysToQuery()});
        this.showTodayDates();
    }

    filterDate(day){
        return day.getFullYear()+"/"+(day.getMonth()+1)+"/"+day.getDate();
    }

    getDaysToQuery(){
        let days = [];
        let eachDay = new Date(this.state.startDate.getTime());
        let i=1;
        const finalDay = new Date(this.state.endDate.getTime());
        while(eachDay.getTime()<= finalDay){
            days.push(this.filterDate(eachDay));
            eachDay = new Date(this.state.startDate.getTime()).addDays(i);
            i++;
        }
        return days;
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div><Nav/>
            <div className="container p-4">
                <div className="row float-right">
                    <div className="col-sm">
                        <table className="table table-hover table-borderless table-sm">
                            <tbody>
                                <tr className="table-info">
                                    <td><strong>Desde: </strong></td>
                                    <td>
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            selected={this.state.startDate}
                                            onChange={date => this.setStartDate(date)}
                                            selectsStart
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            minDate={new Date()}
                                        />
                                    </td>
                                </tr>
                                <tr className="table-info">
                                    <td><strong>Hasta: </strong></td>
                                    <td>
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            selected={this.state.endDate}
                                            onChange={date => this.setEndDate(date)}
                                            selectsEnd
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            minDate={this.state.startDate}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row my-5 mx-3">
                    <div className="d-flex justify-content-center">
                        <h2>Próximas citas</h2>
                    </div>
                </div>
                <div className="row my-5 mx-3">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.loadFillData()}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }

    loadFillData() {
        return this.state.dates.map(each => {
            if (each.dates) {
                return (
                    <tr>
                        <td >{each.dates.date}</td>
                        <td >{each.dates.time}</td>
                        <td >{each.dates.email}</td>
                        <td >{each.dates.dateType.name}</td>
                    </tr>
                );
            }
        });
        
    }
}

export default homeComponent;