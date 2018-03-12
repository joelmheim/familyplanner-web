import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class WeekOverview extends Component {
    render() {
        const mondayEvents = this._getEvents(1) || [];
        const thuesdayEvents = this._getEvents(2) || [];
        const wednesdayEvents = this._getEvents(3) || [];
        const thursdayEvents = this._getEvents(4) || [];
        const fridayEvents = this._getEvents(5) || [];
        const weekendEvents = this._getEvents(6) || [];
        const numEvents = mondayEvents.length
                        + thuesdayEvents.length
                        + wednesdayEvents.length
                        + thursdayEvents.length
                        + fridayEvents.length
                        + weekendEvents.length
        return (
            <div className="WeekOverview">
                <header className="Week-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to FamilyPlanner</h1>
                </header>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>This week's events</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h4 className="event-count">{numEvents} events this week</h4>
                        </div>
                        <div className="col-md-6">
                            <h4 className="event-figure">kolonne 2 på rad...</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2">
                            Monday
                            {mondayEvents}
                        </div>
                        <div className="col-md-2">
                            Thuesday
                                {thuesdayEvents}
                        </div>
                        <div className="col-md-2">
                            Wednesday
                            {wednesdayEvents}
                        </div>
                        <div className="col-md-2">
                            Thursday
                            {thursdayEvents}
                        </div>
                        <div className="col-md-2">
                            Friday
                            {fridayEvents}
                        </div>
                        <div className="col-md-2">
                            Weekend
                            {weekendEvents}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _getEvents(dayOfWeek) {
        //ToDo - replace with request to API
        const eventList = [
            {id:1,
             actor: {pid:1, name: 'Emma', image:'./images/Emma.png' },
             helper: {pid:2, name: 'Marita',image:'./images/Marita.png'},
             start: '2018-08-20T18:00:00.000',
             end: '2018-08-20T19:00:00.000',
             activity: {name: 'Svømming', location: 'Pirbadet'}
             },
            {id:2,
             actor: {pid:3, name: 'Sondre', image:'./images/Sondre.png' },
             helper: {pid: 0 , name: 'Jørn',image:'./images/Jorn.png'},
             start: '2018-08-21T14:00:00.000',
             end: '2018-08-21T16:00:00.000',
             activity: {name: 'fotballtrening', location: 'Molde'}
             },
            {
                id: 3,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                start: '2018-08-22T13:00:00.000',
                end: '2018-08-22T16:00:00.000',
                activity: {name: 'Bassøving', location: 'Charlottenlund'}
            },
            {id:4,
                actor: {pid:4, name: 'Maia', image:'./images/Maia.png' },
                helper: {pid: 2 , name: 'Marita',image:'./images/Marita.png'},
                start: '2018-08-23T17:00:00.000',
                end: '2018-08-23T20:00:00.000',
                activity: {name: 'Korps', location: 'Vikåsen'}
            }];

        return eventList.map( (event)=>{
            let eventObj = new Date(event.start);
            console.log('dayofweek:', dayOfWeek, 'objday ', eventObj.getDay() );
            if (dayOfWeek === eventObj.getDay() ) {

                return (<Event
                    key={event.id}
                    actor={event.actor.name}
                    actorImage={event.actor.image}
                    helper={event.helper.name}
                    helperImage={event.helper.image}
                    start={event.start}
                    end={(event.end)}
                    activity={event.activity.name}
                    location={event.activity.location}/>);
            }
        });
    }
}

class Event extends Component {
  render() {
      const dateEvent = this._getDates() || [];
      console.log("Dato ",  this.props.start, typeof this.props.start);
      console.log("Activity ", this.props.activity, typeof this.props.activity);
      return (
        <div className="container">
            <div className='event'>
                <div className="event-activty" >
                    <img className="image"  src={this.props.actorImage} />
                    <img className="image" src={this.props.helperImage} align="right" />
                    <p>Activity: {this.props.activity} {dateEvent}</p>

                </div>


            </div>
        </div>
    );
  }


  _getDates(){

      let dateList = [];

      let startDateObj = new Date(this.props.start);
      let endDateObj = new Date(this.props.end);
      let startYear = startDateObj.getYear();
      let endYear = endDateObj.getYear();
      let startMonth = startDateObj.getMonth();
      let endMonth = endDateObj.getMonth();
      let startDate = startDateObj.getDate();
      let endDate = endDateObj.getDate();
      let startDay = endDateObj.getDay();
      let endDay = endDateObj.getDay();
      let startHour = startDateObj.getHours();
      let endHour = endDateObj.getHours()
      let startMinute = startDateObj.getMinutes();
      let endMinute = endDateObj.getMinutes();

      dateList.push({id: 1,
                    startYear: startYear,
                    startMonth: startMonth,
                    startDate: startDate,
                    startDay: startDay,
                    startHour: startHour,
                    startMinute: startMinute,
                    endYear: endYear,
                    endMonth: endMonth,
                    endDate: endDate,
                    endDay: endDay,
                    endHour: endHour,
                    endMinute: endMinute});
      console.log('DateList: ', dateList);

      return dateList.map( (datevent)=>{
          return(<DateEvent
              key={datevent.id}
              startYear={datevent.startYear}
              startMonth={datevent.startMonth}
              startDate={datevent.startDate}
              startDayofWeek={datevent.startDay}
              startHour={datevent.startHour}
              startMinute={datevent.startMinute}
              endYear={datevent.endYear}
              endMonth={datevent.endMonth}
              endDate={datevent.endDate}
              endDayofWeek={datevent.endDay}
              endHour={datevent.endHour}
              endMinute={datevent.endMinute}/>);
      });
  }
}

class DateEvent extends Component {

    render() {
        let duration = this._getduration();
        return (
            <div className="container">
                <div className='dateevent card card-group'>
                    <div className="start">
                        <div className={this._getduration()}>
                            //{this.props.startDate}, {this.props.startHour},{this.props.startMinute},{this.props.endDate}, {this.props.endHour},{this.props.endMinute}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _getduration() {

        let durationHours = this.props.endHour- this.props.startHour;
        let css_style = "css_duration" + durationHours;
        //css_style +=  durationHours;
        //css_style +=  '">';
        console.log('css style: ', css_style);
        return css_style;
    }
}

export default WeekOverview;
