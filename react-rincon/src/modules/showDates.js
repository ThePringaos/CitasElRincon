import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import DateService from '../services/date.service';
import ProfessionalService from '../services/professional.service'

class homeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            id: sessionStorage.getItem("userId"),
            email: sessionStorage.getItem("userEmail")
        };
    }

    componentDidMount(){
        this.loadUserId();
        this.showTodayDates();
    }

    async loadUserId(){
        await ProfessionalService.getWithEmail({ email: this.state.email })
            .then(res => {
                if (res.data.success) {
                    const {id} = res.data.data[0];
                    sessionStorage["userId"] = id;
                } else {
                    console.error('Error loading Id');
                }
            })
            .catch(err => {
                console.error('ERROR server' + err);
            });
    }

    showTodayDates() {
        DateService.getConfirmedDatesWithProfessionalId({id:this.state.id})
            .then(res => {
                console.log(res.data.data);
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ dates: data });
                } else {
                    console.error('Error loading dates service');
                }
            })
            .catch(err => {
                console.error('ERROR server' + err);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row my-5 mx-3" >
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
        );
    }

    loadFillData(){
        return this.state.dates.map(each => {
            if (each) {
                console.log(each);
                return (
                    <tr>
                        <td >{each.date}</td>
                        <td >{each.time}</td>
                        <td >{each.email}</td>
                        <td >{each.dateType.name}</td>
                    </tr>
                );
            }
        });
    }
}

export default homeComponent;