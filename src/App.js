import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class WeekOverview extends Component {
    render() {
        const allEvents = this._getEvents() || [];
        console.log('AllEvents ', allEvents, typeof allEvents);

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
                            <h4 className="event-figure">Week number...</h4>
                        </div>
                    </div>
                    <div className="grid-container">

                        <div className="grid-col3 grid-row1 grid-span2">
                            row1-2, colum 3
                        </div>
                        <div className="grid-item">
                            row 2-4, column 2
                        </div>
                        {this._populateHours()}
                        {this._populateEvents(allEvents)}


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


    _populateHours() {
        let hoursList = [];
        const starthour = 0;
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

    _populateEvents(events) {
        console.log("antall events ", events.length, typeof events);
        let eventList = [];
        let eventStartObj;
        let weekday;
        let starttime;
        let duration;

        for (let id = 0; id < events.length; id++) {
            eventList.push({id: id, event: events[id]});
        }

        return eventList.map((event) => {
            return ( <Event
                key={event.id}
                activity={event.event.props.activity}
                actor={event.event.props.actor}
                actorImage={event.event.props.actorImage}
                helper={event.event.props.helper}
                helperImage={event.event.props.helperImage}
                location={event.event.props.location}
                start={event.event.props.start}
                end={event.event.props.end}/>);
        });
    }
}

class Hour extends Component {
  render () {
      return (

            <div className={this._getHourinGrid()}>
                <div className="hour">
                    <p>{this.props.hour}</p>
                </div>
            </div>

      );
  }

  _getHourinGrid() {
      let hourinGrid = "grid-item grid-col1"+ " grid-row" + this.props.hour + " grid-span1" ;
      return hourinGrid;
  }
}


class Event extends Component {
    render() {
       return(
        <div className={this._getEventinGrid()}>
            <div className="event">
                <img className="image" src={this.props.actorImage} align="left"/>
                <img className="image" src={this.props.helperImage} align="right"/>
                <p> {this.props.activity} {this.props.location}</p>
            </div>
        </div> );
    }


    _getEventinGrid() {

        const startObj = new Date(this.props.start);
        const endObj = new Date(this.props.end);

        let start_time = startObj.getHours();
        let duration = endObj.getHours() - start_time;
        let weekday = startObj.getDay() + 1;
        let placeinGrid = "grid-item grid-col" + weekday + " grid-row" + start_time + " grid-span" + duration;
        console.log(placeinGrid);
        return placeinGrid;
    }
}


export default WeekOverview;
