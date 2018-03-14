import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class WeekOverview extends Component {
    render() {
        const allEvents = this._getEvents();
        console.log('AllEvents ', allEvents, typeof allEvents);
        const mondayEvents = this._filterDayEvents(allEvents, 1) || [];
        console.log('mondayEvents: ', mondayEvents);
        const thuesdayEvents = this._filterDayEvents(allEvents, 2) || [];
        console.log('thuesdayEvents: ', thuesdayEvents);
        const wednesdayEvents = this._filterDayEvents(allEvents, 3) || [];
        const thursdayEvents = this._filterDayEvents(allEvents, 4) || [];
        const fridayEvents = this._filterDayEvents(allEvents, 5) || [];
        const saturdayEvents = this._filterDayEvents(allEvents, 6) || [];
        const sundayEvents = this._filterDayEvents(allEvents, 0) || [];
        const numEvents = allEvents.length;

        return (
            <div className="WeekOverview">
                <header className="Week-header">
                    <img src={logo} className="App-logo" alt="logo"/>
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
                    <div class="grid-container">
                        <div class="grid-item-hour">
                            Hour
                            {this._populateHours()}
                        </div>
                        <div class="grid-item-weekdays">
                            Monday
                            {this._populateEvents(mondayEvents)}
                        </div>
                        <div class="grid-item-weekdays">
                            Thuesday
                            {this._populateEvents(thuesdayEvents)}
                        </div>
                        <div class="grid-item-weekdays">
                            Wednesday
                            {this._populateEvents(wednesdayEvents)}
                        </div>
                        <div class="grid-item-weekdays">
                            Thursday
                            {this._populateEvents(thursdayEvents)}
                        </div>
                        <div class="grid-item-weekdays">
                            Friday
                            {this._populateEvents(fridayEvents)}
                        </div>
                        <div class="grid-item-weekend">
                            Saturday
                            {this._populateEvents(saturdayEvents)}
                        </div>
                        <div class="grid-item-weekend">
                            Sunday
                            {this._populateEvents(sundayEvents)}
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    _getEvents() {
        //ToDo - replace with request to API
        let eventList = []; //empty list on  each function call
        console.log('length eventlist: ', eventList.length);

        eventList = [
            {
                id: 1,
                actor: {pid: 1, name: 'Emma', image: './images/Emma.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Marita.png'},
                start: '2018-08-20T18:00:00.000',
                end: '2018-08-20T21:00:00.000',
                activity: {name: 'Svømming', location: 'Pirbadet'}
            },
            {
                id: 2,
                actor: {pid: 3, name: 'Sondre', image: './images/Sondre.png'},
                helper: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                start: '2018-08-21T14:00:00.000',
                end: '2018-08-21T16:00:00.000',
                activity: {name: 'fotballtrening', location: 'Molde'}
            },
            {
                id: 3,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                start: '2018-08-22T17:00:00.000',
                end: '2018-08-22T18:00:00.000',
                activity: {name: 'Bassøving', location: 'Charlottenlund'}
            },
            {
                id: 4,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Marita.png'},
                start: '2018-08-23T17:00:00.000',
                end: '2018-08-23T20:00:00.000',
                activity: {name: 'Korps', location: 'Vikåsen'}
            }];

        return eventList.map((event) => {
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
        );
    }

    _filterDayEvents(eventList, dayid) {
        let dayEventList = [];
        let weekdayObj;

        for (let i = 0; i < eventList.length; i++) {
            weekdayObj = new Date(eventList[i].props.start);
            if (dayid === weekdayObj.getDay()) {
                dayEventList.push(eventList[i]);
            }
        }
        console.log('length DayilyEvents dayid/length ', dayid, dayEventList.length);

        return dayEventList;
    }

    _populateHours() {
        let hoursList = [];
        const starthour = 8
        const endhour = 23;
        for (let i = starthour; i <= endhour; i++) {
            hoursList.push({id: i, hour: i});
        }

        return hoursList.map((hour) => {
            return (<Hour
                key={hour.id}
                hour={hour.hour}/>);
        });
    }

    _populateEvents(dailyEventList) {
        //ToDo - include push of items for days with no events


        console.log('dailyEvents + length: ', dailyEventList, ' ', dailyEventList.length, ' ', typeof dailyEventList);
        const starthour = 8;
        const endhour = 23;
        let eventHourList = [];
        let eventObjStart;
        let eventObjEnd;
        let activeUptoHour;
        for (let hour = starthour; hour <= endhour; hour++) {
            for (let index = 0; index < dailyEventList.length; index++) {
                eventObjStart = new Date(dailyEventList[index].props.start);
                eventObjEnd = new Date(dailyEventList[index].props.end);
                if (hour === eventObjStart.getHours()) {
                    eventHourList.push({id: hour, hour: hour, hasEvent: true, event: dailyEventList[index]});
                    activeUptoHour = eventObjEnd.getHours();
                } else {
                    if (hour < activeUptoHour) {
                        console.log('Skip this hour container due active event')
                    } else {
                        eventHourList.push({id: hour, hour: hour, hasEvent: false, event: []});
                    }
                }
            }
        }
        //TODO - fill inn all props
        return eventHourList.map((eventHour) => {
            if (eventHour.hasEvent) {
                return (<Event
                    key={eventHour.id}
                    hour={eventHour.hour}
                    hasEvent={eventHour.hasEvent}
                    activity={eventHour.event.props.activity}
                    actor={eventHour.event.props.actor}
                    actorImage={eventHour.event.props.actorImage}
                    helper={eventHour.event.props.helper}
                    helperImage={eventHour.event.props.helperImage}
                    location={eventHour.event.props.location}
                    start={eventHour.event.props.start}
                    end={eventHour.event.props.end}/>);
            } else {
                return(<Hour
                    key={eventHour.id}
                    hour={eventHour.hour}
                    hasEvent={eventHour.hasEvent}/>
                );
            }
        });
    }
}


class Hour extends Component {
  render () {
      return (

            <div className="hour">
                <p>{this.props.hour}</p>
            </div>

      );
  }
}


class Event extends Component {
  render() {
      const dateEvent = this._getDates() || [];
      console.log("Dato ",  this.props.start, typeof this.props.start);
      console.log("Activity ", this.props.activity, typeof this.props.activity);
      return (
            <div className='event'>
                <div className={this._getDuration()} >
                    <img className="image"  src={this.props.actorImage} />
                    <img className="image" src={this.props.helperImage} align="right" />
                    <p> {this.props.activity}</p>
                </div>
            </div>

    );
  }

    _getDuration() {

        const startObj = new Date(this.props.start);
        const endObj = new Date(this.props.end);

        let duration = endObj.getHours() - startObj.getHours();
        return "css_duration" + duration;
    }


//TODO - is this used/necessary?
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

//TODO - check if this is neccesary / used
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
