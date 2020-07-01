import React, { Component, useState } from "react";
import ProfessionalService from '../services/professional.service';
import TimetableService from '../services/timetable.service';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Redirect } from "react-router-dom";

import Nav from '../components/nav';
import DayTemplate from '../templates/timetableDay';
import TimeTableController from '../controllers/timetableController';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reloadTable: null,
            redirect: null,
            myUser: null,
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
        ProfessionalService.get(this.state.userId).then(res => {
            if (res.data.success) {
                this.setState({ myUser: res.data.data[0] });
                const { id, monday, tuesday, wednesday, thursday, friday } = (this.state.myUser.timetable);
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
        }).catch(err => {
            console.error('ERROR server' + err);
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        if (this.state.reloadTable) {
            this.queryTimetable();
            this.setState({ reloadTable: false });
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

                    <DayTemplate
                        dayName='Lunes'
                        day={this.state.monday}
                        handleChangeFrom={ async time => {
                            this.setState({monday: await TimeTableController.handleChange(time, 'from',this.state.monday)});
                        }}
                        handleChangeTo={async time => {
                            this.setState({monday: await TimeTableController.handleChange(time, 'to',this.state.monday)});
                        }}
                        myInterval={this.state.periodLenght}
                        onClickAddPeriod={() => this.addPeriod('monday')}
                        onClickEmptyPeriod={() => this.emptyPeriod('monday')}
                    />

                    <DayTemplate
                        dayName='Martes'
                        day={this.state.tuesday}
                        handleChangeFrom={ async time => {
                            this.setState({tuesday: await TimeTableController.handleChange(time, 'from',this.state.tuesday)});
                        }}
                        handleChangeTo={async time => {
                            this.setState({tuesday: await TimeTableController.handleChange(time, 'to',this.state.tuesday)});
                        }}
                        myInterval={this.state.periodLenght}
                        onClickAddPeriod={() => this.addPeriod('tuesday')}
                        onClickEmptyPeriod={() => this.emptyPeriod('tuesday')}
                    />

                    <DayTemplate
                        dayName='Miércoles'
                        day={this.state.wednesday}
                        handleChangeFrom={ async time => {
                            this.setState({wednesday: await TimeTableController.handleChange(time, 'from',this.state.wednesday)});
                        }}
                        handleChangeTo={async time => {
                            this.setState({wednesday: await TimeTableController.handleChange(time, 'to',this.state.wednesday)});
                        }}
                        myInterval={this.state.periodLenght}
                        onClickAddPeriod={() => this.addPeriod('wednesday')}
                        onClickEmptyPeriod={() => this.emptyPeriod('wednesday')}
                    />

                    <DayTemplate
                        dayName='Jueves'
                        day={this.state.thursday}
                        handleChangeFrom={ async time => {
                            this.setState({thursday: await TimeTableController.handleChange(time, 'from',this.state.thursday)});
                        }}
                        handleChangeTo={async time => {
                            this.setState({thursday: await TimeTableController.handleChange(time, 'to',this.state.thursday)});
                        }}
                        myInterval={this.state.periodLenght}
                        onClickAddPeriod={() => this.addPeriod('thursday')}
                        onClickEmptyPeriod={() => this.emptyPeriod('thursday')}
                    />

                    <DayTemplate
                        dayName='Viernes'
                        day={this.state.friday}
                        handleChangeFrom={ async time => {
                            this.setState({friday: await TimeTableController.handleChange(time, 'from',this.state.friday)});
                        }}
                        handleChangeTo={async time => {
                            this.setState({friday: await TimeTableController.handleChange(time, 'to',this.state.friday)});
                        }}
                        myInterval={this.state.periodLenght}
                        onClickAddPeriod={() => this.addPeriod('friday')}
                        onClickEmptyPeriod={() => this.emptyPeriod('friday')}
                    />
                </div>
            </div>
        );
    }

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
                    console.log('hehee')
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
        if (this.state.tableId == null) {
            TimetableService.create(data).then((res) => {
                this.state.myUser.timetableId = res.data.id;
                ProfessionalService.update(this.state.myUser).then(() => {
                    Swal.fire({
                        toast: true,
                        title: "Horario actualizado",
                        position: 'top-end',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.setState({ reloadTable: true })
                });

            })
        } else {
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
}

export default App;