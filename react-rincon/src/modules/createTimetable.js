import React, { Component, useState } from "react";
import TimetableService from '../services/timetable.service';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Redirect } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Nav from './nav';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reloadTable: null,
            redirect: null,
            userId: sessionStorage.getItem("userId"),
            tableId: null,
            periodLenght: 30,
            monday: {
                myDateFrom: null,
                from: "",
                myDateTo: null,
                to: ""
            },
            tuesday: {
                myDateFrom: null,
                from: "",
                myDateTo: null,
                to: ""
            },
            wednesday: {
                myDateFrom: null,
                from: "",
                myDateTo: null,
                to: ""
            },
            thursday: {
                myDateFrom: null,
                from: "",
                myDateTo: null,
                to: ""
            },
            friday: {
                myDateFrom: null,
                from: "",
                myDateTo: null,
                to: ""
            },
            mondayDDBB: null,
            tuesdayDDBB: null,
            wednesdayDDBB: null,
            thursdayDDB: null,
            fridayDDBB: null,
            aux: ""
        };
    }

    componentDidMount() {
        this.isUserRegistered();
        this.queryTimetable();
    }

    isUserRegistered() {
        if (sessionStorage.getItem('isUserRegistered') == 'false') {
            this.setState({ redirect: '/crear-perfil' });
        }
    }

    queryTimetable() {
        TimetableService.getWithProfessionalId({ professionalId: this.state.userId }
        ).then(res => {
            if (res.data.success) {
                const { id, monday, tuesday, wednesday, thursday, friday } = (res.data.data[0]);
                this.state.tableId = id;

                if (monday != null) {
                    this.state.mondayDDBB = monday;
                    $('#mondayRow').text(monday);
                }
                if (tuesday != null) {
                    this.state.tuesdayDDBB = tuesday;
                    $('#tuesdayRow').text(tuesday);
                }
                if (wednesday != null) {
                    this.state.wednesdayDDBB = wednesday;
                    $('#wednesdayRow').text(wednesday);
                }
                if (thursday != null) {
                    this.state.thursdayDDB = thursday;
                    $('#thursdayRow').text(thursday);
                }
                if (friday != null) {
                    this.state.fridayDDBB = friday;
                    $('#fridayRow').text(friday);
                }
            } else {
                console.error('Error quering timetable');
            }
        })
            .catch(err => {
                console.error('ERROR server' + err);
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        } 
        if (this.state.reloadTable) {
            this.queryTimetable();
        }
        return (
            <div><Nav />
                <div className="container">
                    <div className="row my-5 mx-3" >
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Lunes</th>
                                    <th scope="col">Martes</th>
                                    <th scope="col">Miércoles</th>
                                    <th scope="col">Jueves</th>
                                    <th scope="col">Viernes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td id="mondayRow"></td>
                                    <td id="tuesdayRow"></td>
                                    <td id="wednesdayRow"></td>
                                    <td id="thursdayRow"></td>
                                    <td id="fridayRow"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="row my-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm">
                                                <h3>Lunes</h3>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Desde </label>
                                                <div className="w-10">
                                                    <DatePicker
                                                        selected={this.state.monday.myDateFrom}
                                                        onChange={time => this.handleChange(time, 'mondayFrom')}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={this.state.periodLenght}
                                                        timeCaption="Time"
                                                        disabledKeyboardNavigation
                                                        timeFormat="HH:mm"
                                                        dateFormat="h:mm aa"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Hasta </label>
                                                <DatePicker
                                                    selected={this.state.monday.myDateTo}
                                                    onChange={time => this.handleChange(time, 'mondayTo')}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={this.state.periodLenght}
                                                    timeCaption="Time"
                                                    disabledKeyboardNavigation
                                                    timeFormat="HH:mm"
                                                    dateFormat="h:mm aa"
                                                />
                                            </div>
                                            <div class="col-sm">
                                                <button type="button" class="btn btn-primary m-1"
                                                    onClick={() => this.addPeriod('monday')}>Añadir</button>
                                                <button type="button" class="btn btn-danger m-1"
                                                    onClick={() => this.emptyPeriod('monday')}>Vaciar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm">
                                                <h3>Martes</h3>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Desde </label>
                                                <div className="w-10">
                                                    <DatePicker
                                                        selected={this.state.tuesday.myDateFrom}
                                                        onChange={time => this.handleChange(time, 'tuesdayFrom')}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={this.state.periodLenght}
                                                        timeCaption="Time"
                                                        disabledKeyboardNavigation
                                                        timeFormat="HH:mm"
                                                        dateFormat="h:mm aa"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Hasta </label>
                                                <DatePicker
                                                    selected={this.state.tuesday.myDateTo}
                                                    onChange={time => this.handleChange(time, 'tuesdayTo')}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={this.state.periodLenght}
                                                    timeCaption="Time"
                                                    disabledKeyboardNavigation
                                                    timeFormat="HH:mm"
                                                    dateFormat="h:mm aa"
                                                />
                                            </div>
                                            <div class="col-sm">
                                                <button type="button" class="btn btn-primary m-1"
                                                    onClick={() => this.addPeriod('tuesday')}>Añadir</button>
                                                <button type="button" class="btn btn-danger m-1"
                                                    onClick={() => this.emptyPeriod('tuesday')}>Vaciar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm">
                                                <h3>Miércoles</h3>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Desde </label>
                                                <div className="w-10">
                                                    <DatePicker
                                                        selected={this.state.wednesday.myDateFrom}
                                                        onChange={time => this.handleChange(time, 'wednesdayFrom')}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={this.state.periodLenght}
                                                        timeCaption="Time"
                                                        disabledKeyboardNavigation
                                                        timeFormat="HH:mm"
                                                        dateFormat="h:mm aa"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Hasta </label>
                                                <DatePicker
                                                    selected={this.state.wednesday.myDateTo}
                                                    onChange={time => this.handleChange(time, 'wednesdayTo')}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={this.state.periodLenght}
                                                    timeCaption="Time"
                                                    disabledKeyboardNavigation
                                                    timeFormat="HH:mm"
                                                    dateFormat="h:mm aa"
                                                />
                                            </div>
                                            <div class="col-sm">
                                                <button type="button" class="btn btn-primary m-1"
                                                    onClick={() => this.addPeriod('wednesday')}>Añadir</button>
                                                <button type="button" class="btn btn-danger m-1"
                                                    onClick={() => this.emptyPeriod('wednesday')}>Vaciar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm">
                                                <h3>Jueves</h3>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Desde </label>
                                                <div className="w-10">
                                                    <DatePicker
                                                        selected={this.state.thursday.myDateFrom}
                                                        onChange={time => this.handleChange(time, 'thursdayFrom')}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={this.state.periodLenght}
                                                        timeCaption="Time"
                                                        timeFormat="HH:mm"
                                                        disabledKeyboardNavigation
                                                        dateFormat="h:mm aa"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Hasta </label>
                                                <DatePicker
                                                    selected={this.state.thursday.myDateTo}
                                                    onChange={time => this.handleChange(time, 'thursdayTo')}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={this.state.periodLenght}
                                                    timeCaption="Time"
                                                    timeFormat="HH:mm"
                                                    disabledKeyboardNavigation
                                                    dateFormat="h:mm aa"
                                                />
                                            </div>
                                            <div class="col-sm">
                                                <button type="button" class="btn btn-primary m-1"
                                                    onClick={() => this.addPeriod('thursday')}>Añadir</button>
                                                <button type="button" class="btn btn-danger m-1"
                                                    onClick={() => this.emptyPeriod('thursday')}>Vaciar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm">
                                                <h3>Viernes</h3>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Desde </label>
                                                <div className="w-10">
                                                    <DatePicker
                                                        selected={this.state.friday.myDateFrom}
                                                        onChange={time => this.handleChange(time, 'fridayFrom')}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={this.state.periodLenght}
                                                        timeCaption="Time"
                                                        timeFormat="HH:mm"
                                                        disabledKeyboardNavigation
                                                        dateFormat="h:mm aa"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <label className="float-left">Hasta </label>
                                                <DatePicker
                                                    selected={this.state.friday.myDateTo}
                                                    onChange={time => this.handleChange(time, 'fridayTo')}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={this.state.periodLenght}
                                                    timeCaption="Time"
                                                    timeFormat="HH:mm"
                                                    disabledKeyboardNavigation
                                                    dateFormat="h:mm aa"
                                                />
                                            </div>
                                            <div class="col-sm">
                                                <button type="button" class="btn btn-primary m-1"
                                                    onClick={() => this.addPeriod('friday')}>Añadir</button>
                                                <button type="button" class="btn btn-danger m-1"
                                                    onClick={() => this.emptyPeriod('friday')}>Vaciar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleChange = async (time, day) => {
        if (time == null) return;

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
            case "tuesdayFrom":
                this.state.tuesday.myDateFrom = time;
                this.state.tuesday.from = filteredTime;
                break;
            case "tuesdayTo":
                this.state.tuesday.myDateTo = time;
                this.state.tuesday.to = filteredTime;
                break;
            case "wednesdayFrom":
                this.state.wednesday.myDateFrom = time;
                this.state.wednesday.from = filteredTime;
                break;
            case "wednesdayTo":
                this.state.wednesday.myDateTo = time;
                this.state.wednesday.to = filteredTime;
                break;
            case "thursdayFrom":
                this.state.thursday.myDateFrom = time;
                this.state.thursday.from = filteredTime;
                break;
            case "thursdayTo":
                this.state.thursday.myDateTo = time;
                this.state.thursday.to = filteredTime;
                break;
            case "fridayFrom":
                this.state.friday.myDateFrom = time;
                this.state.friday.from = filteredTime;
                break;
            case "fridayTo":
                this.state.friday.myDateTo = time;
                this.state.friday.to = filteredTime;
                break;

            default:
                break;
        }
        //This is just to render the changes
        this.setState({ aux: ":)" })
    };

    addPeriod(day) {
        const week = {
            id: this.state.tableId,
            professionalId: this.state.userId,
            monday: this.state.mondayDDBB,
            tuesday: this.state.tuesdayDDBB,
            wednesday: this.state.wednesdayDDBB,
            thursday: this.state.thursdayDDB,
            friday: this.state.fridayDDBB
        }

        if (this.state.tableId == null) {
            TimetableService.create({
                professionalId: this.state.userId,
                monday: null,
                tuesday: null,
                wednesday: null,
                thursday: null,
                friday: null
            })
                .then(res => {
                    this.setState({ tableId: res.data.id });
                })
                .catch(
                    console.error("error creando timetable")
                );
        }

        switch (day) {
            case 'monday':
                if (this.state.monday.from && this.state.monday.to) {
                    week.monday = this.state.monday.from + "-" + this.state.monday.to;
                    this.updateTimetable(week);
                }
                break;
            case 'tuesday':
                if (this.state.tuesday.from && this.state.tuesday.to) {
                    week.tuesday = this.state.tuesday.from + "-" + this.state.tuesday.to;
                    this.updateTimetable(week);
                }
                break;
            case 'wednesday':
                if (this.state.wednesday.from && this.state.wednesday.to) {
                    week.wednesday = this.state.wednesday.from + "-" + this.state.wednesday.to;
                    this.updateTimetable(week);
                }
                break;
            case 'thursday':
                if (this.state.thursday.from && this.state.thursday.to) {
                    week.thursday = this.state.thursday.from + "-" + this.state.thursday.to;
                    this.updateTimetable(week);
                }
                break;
            case 'friday':
                if (this.state.friday.from && this.state.friday.to) {
                    week.friday = this.state.friday.from + "-" + this.state.friday.to;
                    this.updateTimetable(week);
                }
                break;

            default:
                break;
        }

    }

    async emptyPeriod(day) {
        let aux;
        const week = {
            id: this.state.tableId,
            professionalId: this.state.userId,
            monday: this.state.mondayDDBB,
            tuesday: this.state.tuesdayDDBB,
            wednesday: this.state.wednesdayDDBB,
            thursday: this.state.thursdayDDB,
            friday: this.state.fridayDDBB
        }

        if (this.state.tableId == null) {
            TimetableService.create({
                professionalId: this.state.userId,
                monday: null,
                tuesday: null,
                wednesday: null,
                thursday: null,
                friday: null
            })
                .then(res => {
                    this.setState({ tableId: res.data.id });
                })
                .catch(
                    console.error("error creando timetable")
                );
        }

        switch (day) {
            case 'monday':
                aux = await this.showConfirmNotification('Lunes');
                if (aux.isConfirmed) {
                    //vaciamos el día
                    week.monday = "";
                    this.updateTimetable(week);
                }
                break;
            case 'tuesday':
                aux = await this.showConfirmNotification('Martes');
                if (aux.isConfirmed) {
                    //vaciamos el día
                    week.tuesday = "";
                    this.updateTimetable(week);
                }
                break;
            case 'wednesday':
                aux = await this.showConfirmNotification('Miércoles');
                if (aux.isConfirmed) {
                    //vaciamos el día
                    week.wednesday = "";
                    this.updateTimetable(week);
                }
                break;
            case 'thursday':
                aux = await this.showConfirmNotification('Jueves');
                if (aux.isConfirmed) {
                    //vaciamos el día
                    week.thursday = "";
                    this.updateTimetable(week);
                }
                break;
            case 'friday':
                aux = await this.showConfirmNotification('Viernes');
                if (aux.isConfirmed) {
                    //vaciamos el día
                    week.friday = "";
                    this.updateTimetable(week);
                }
                break;

            default:
                break;
        }
    }

    async showConfirmNotification(day) {
        let aux = null;
        await Swal.fire({
            title: `Vaciar ${day}`,
            text: "¿Desea vaciar el día?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar!',
            confirmButtonText: 'Confirmar'
        }).then(async (res) => {
            if (res.isConfirmed) {
                await Swal.fire(
                    'Eliminado!',
                    'Se ha vaciado el día.',
                    'success'
                );
            }
            aux = res;
        });
        return aux;
    }

    updateTimetable(data) {
        TimetableService.update(data).then((res) => {
            if (res.data.success == true) {
                this.setState({ reloadTable: true })
                Swal.fire({
                    toast: true,
                    title: "Horario actualizado",
                    position: 'top-end',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    }
}

export default App;