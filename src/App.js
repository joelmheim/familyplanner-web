import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class WeekOverview extends Component {
    render() {
        const weekEvents = this._getEvents() || [];
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
                                <h4 className="event-count">{weekEvents.length} events this week</h4>
                            </div>
                            <div className="col-md-6">
                                <h4 className="event-figure">kolonne 2 på rad...</h4>
                            </div>
                        </div>
                        <div className="row">
                            {weekEvents}
                        </div>
                    </div>
                </div>
        );
    }

    _getEvents() {
        //ToDo - replace with request to API
        const eventList = [
            {id:1,
             actor: {pid:1, name: 'Emma', image:'./images/Emma.png' },
             helper: {pid:2, name: 'Marita',image:'./images/Marita.png'},
             start: '2018-08-22T18:10:00.000',
             end: '2018-08-22T19:30:00.000',
             activity: {name: 'Svømming', location: 'Pirbadet'}
             },
            {id:2,
             actor: {pid:3, name: 'Sondre', image:'./images/Sondre.png' },
             helper: {pid: 0 , name: 'Jørn',image:'./images/Jorn.png'},
             start: '2018-08-23T18:10:00.000',
             end: '2018-08-23T19:30:00.000',
             activity: {name: 'fotballtrening', location: 'Molde'}
            }];

        return eventList.map( (event)=>{
            return(<Event
                key={event.id}
                actor={event.actor.name}
                actorImage={event.actor.image}
                helper={event.helper.name}
                helperImage={event.helper.image}
                start={event.start}
                end={Date.parse(event.end)}
                activity={event.activity.type}/>);
        });
    }
}

class Event extends Component {
  render() {
      const dateEvent = this._getDates() || [];
      console.log("Dato ",  this.props.start, typeof this.props.start);

      return (
      <div className='col-md-4 '>
        <div className="container">
            <div className='event card card-group'>
                <p className="event-activty" >
                    <img className="image"  src={this.props.actorImage} />
                    {dateEvent}
                    <img className="image" src={this.props.helperImage} /></p>


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
      let startHour = startDateObj.getHours();
      let endHour = endDateObj.getHours()
      let startMinute = startDateObj.getMinutes();
      let endMinute = endDateObj.getMinutes();

      dateList.push({id: 1,
                    startYear: startYear,
                    startMonth: startMonth,
                    startDate: startDate,
                    startHour: startHour,
                    startMinute: startMinute,
                    endYear: endYear,
                    endMonth: endMonth,
                    endDate: endDate,
                    endHour: endHour,
                    endMinute: endMinute});
      console.log('DateList: ', dateList);

      return dateList.map( (datevent)=>{
          return(<DateEvent
              key={datevent.id}
              startYear={datevent.startYear}
              startMonth={datevent.startMonth}
              startDate={datevent.startDate}
              startHour={datevent.startHour}
              startMinute={datevent.startMinute}
              endYear={datevent.endYear}
              endMonth={datevent.endMonth}
              endDate={datevent.endDate}
              endHour={datevent.endHour}
              endMinute={datevent.endMinute}/>);
      });
  }
}

class DateEvent extends Component {

    render () {
        let duration = this._getduration;
        return (
            <div className="container">
                <div className='dateevent card card-group'>
                        <div className="start" >
                            <div className="test">
                            {this.props.startDate}, {this.props.startHour},{this.props.startMinute}
                            {this.props.endDate}, {this.props.endHour},{this.props.endMinute}
                        </div>
                </div>
            </div>
        );
    }

    _getduration(){
        let duration = this.props.endHour - this.props.startHour;
        let css_style = 'css_duration'+ duration;
        console.log('css style: ', css_style);
        return css_style;
    }
}

export default WeekOverview;
