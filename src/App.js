import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class WeekOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
          events: [],
          weekdays: [],
          weekNumber: 0,
          numEvents: 0,
          language: "No",
          show:true

        };
    }

    componentDidMount(){
        this.populateState();
    }

    populateState() {
        let events = this._getEvents();
        let language = "No";
        let weekdays = this._getWeekdays();
        let today = new Date();
        let thisWeek = today.getWeek()
        this.setState({events:events, weekNumber: thisWeek, weekdays: weekdays, numEvents:events.length});


    }

    incrementWeek = () => {
        this.setState({ weekNumber: this.state.weekNumber + 1 });
    }

    decreaseWeek = () => {
        this.setState({weekNumber: this.state.weekNumber -1});
    }



    render() {
        return (
            <div className="grid-container">
                <div className="header">
                    <div className="start">Familyplanner</div>
                    <div className="nav-left">
                        <button onClick={this.decreaseWeek} >
                            -
                        </button>
                    </div>
                    <div className="week"> {this.state.weekNumber}</div>
                     <div className="nav-right">
                         <button onClick={this.incrementWeek}>
                            +
                        </button>
                     </div>
                </div>
                <div className="main">
                    {this._populateHours()}
                    {this._populateWeekdays(this.state.weekdays, this.state.language)}
                    {this._populateEvents(this.state.events, this.state.weekNumber)}
                </div>

                <div className="aside">ikon</div>
            </div>
        );
    }

    _getWeekdays(language){
       //ToDo - put in a config file?
        let weekdaysList = [];

        weekdaysList = [
            {
                id: 1,
                language: "No",
                days: ["Mandag", "Tirsdag","Onsdag","Torsdag","Fredag", "Lørdag","Søndag"]
            },
            {
                id: 2,
                language: "En",
                days: ["Monday","Thuesday", "Wednesday","Thursday","Friday","Saturday","Sunday"]
            }];

        return weekdaysList;
    }

    _getEvents() {
        //ToDo - replace with request to API
        let eventList = []; //empty list on  each function call


        eventList = [
            {
                id: 1,
                actor: {pid: 1, name: 'Emma', image: './images/Emma.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Marita.png'},
                start: '2018-03-13T18:00:00.000',
                end: '2018-03-13T21:00:00.000',
                activity: {name: 'Svømming', location: 'tirsdag Pirbadet'}
            },
            {
                id: 2,
                actor: {pid: 3, name: 'Sondre', image: './images/Sondre.png'},
                helper: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                start: '2018-03-13T00:00:00.000',
                end: '2018-03-15T00:00:00.000',
                activity: {name: 'fotballtrening', location: 'tirs-ons Molde'}
            },
            {
                id: 3,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                start: '2018-04-05T17:00:00.000',
                end: '2018-04-05T18:00:00.000',
                activity: {name: 'Bass', location: 'torsdag Charlottenlund'}
            },
            {
                id: 4,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Marita.png'},
                start: '2018-04-08T17:00:00.000',
                end: '2018-04-09T20:00:00.000',
                activity: {name: 'Søndag - mandag Korps', location: 'Vikåsen'}
            },
            {
                id: 5,
                actor: {pid: 1, name: 'Emma', image: './images/Emma.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Marita.png'},
                start: '2018-03-20T18:00:00.000',
                end: '2018-03-20T21:00:00.000',
                activity: {name: 'Svømming', location: 'Tirsdag Pirbadet'}
            },
            {
                id: 5,
                actor: {pid: 3, name: 'Sondre', image: './images/Sondre.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Jorn.png'},
                start: '2018-03-22T00:00:00.000',
                end: '2018-03-23T00:00:00.000',
                activity: {name: 'fotballtrening', location: 'Torsdag Molde'}
            },
            {
                id: 6,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                start: '2018-03-23T17:00:00.000',
                end: '2018-03-24T18:00:00.000',
                activity: {name: 'Bass', location: 'fredag 17-lørdag 18 Vikåsen'}
            },
            {
                id: 7,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Marita.png'},
                start: '2018-03-27T17:00:00.000',
                end: '2018-03-27T20:00:00.000',
                activity: {name: 'Korps', location: 'tirdag Reppe'}
            },
            {
                id: 8,
                actor: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Marita.png'},
                start: '2018-04-09T00:00:00.000',
                end: '2018-04-23T00:00:00.000',
                activity: {name: 'Reise', location: '2 uker usa'}
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
                location={event.activity.location}
            />);
        });
    }


    _populateHours() {
        const starthour = 7;
        const endhour = 23;
        let hoursList = [];

        hoursList.push({id: 0, hour: "All day"});
        for (let i = starthour; i <= endhour; i++) {
            hoursList.push({id: i, hour: i});
        }

        return hoursList.map((hour) => {
            return (<Hour
                key={hour.id}
                hour={hour.hour}/>);
        });
    }


    _populateWeekdays(weekdays, language){
        let weekdaysList = [];
        for (let id = 0; id < weekdays.length; id++) {

            if (weekdays[id].language === language) {
                for (let day = 0; day < weekdays[id].days.length; day++){
                    weekdaysList.push({id: day, weekdaynum: day, weekday: weekdays[id].days[day]});
                }
            }
        }

        return weekdaysList.map( (weekday) => {
            return ( <Weekday
                key={weekday.id}
                weekdaynum={weekday.weekdaynum}
                weekday={weekday.weekday}
            />);
        });
    }

    _populateEvents(events,weekNumber) {
        console.log("antall events i populate", events.length, typeof events, "innhold ", events);
        let eventList = [];
        let eventStartObj;
        let eventEndObj;
        let weekday;
        let starttime;
        let duration;


        for (let id = 0; id < events.length; id++) {
            eventStartObj = new Date(events[id].props.start);
            eventEndObj = new Date(events[id].props.end);
            console.log('Start week ', eventStartObj.getWeek(), ', End week: ', eventEndObj.getWeek());
            let eventStartWeek = eventStartObj.getWeek();
            let eventEndWeek = eventEndObj.getWeek();

            if  ( (eventStartWeek === weekNumber || eventEndWeek === weekNumber ) ||
                (weekNumber > eventStartWeek && weekNumber < eventEndWeek) )
            {
                    eventList.push({id: id, event: events[id]});
            }
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
                end={event.event.props.end}
                week={weekNumber}/>);
        });
    }
}


class Weekday extends Component {
    render() {
        return (
            <div className={this._getWeekdayinGrid()}>
                <div className="weekday">
                    {this.props.weekday}
                </div>
            </div>

        );
    }

    _getWeekdayinGrid() {
        let day = this.props.weekdaynum + 2;
        let weekdayinGrid = "grid-item grid-weekday grid-row1 grid-col" + day;
        return weekdayinGrid;
    }
}





class Hour extends Component {
  render () {
      return (
        <div className={this._getHourinGrid()}>
            <div className="hour">
                {this.props.hour}
            </div>
        </div>
      );
  }



  _getHourinGrid() {
      let start;

      if( this.props.hour === "All day") {
          start = 2;
      } else {
          start = this.props.hour -4;
      }

      let hourinGrid = "grid-item grid-hour grid-col1"+ " grid-row" + start + " grid-rowspan1" ;
      return hourinGrid;
  }
}


class Event extends Component {
    render() {
       return(
        <div className={this._getEventinGrid()}>
            <img className="image" src={this.props.actorImage} align="left"/>
            <img className="image" src={this.props.helperImage} align="right"/>
            {this.props.activity} {this.props.location}
        </div> );
    }


    _getEventinGrid() {

        const startObj = new Date(this.props.start);
        const endObj = new Date(this.props.end);
        const startHour = startObj.getHours();
        let startDay = startObj.getDay();
        const startWeek = startObj.getWeek();
        let endDay = endObj.getDay();
        const endWeek = endObj.getWeek();
        let startDayColumn;
        let endDayColumn;

        const displayWeek= this.props.week;

        console.log('vis uke: ', displayWeek);

        let duration;
        let row;
        let placeinGrid;

        if (startDay === 0) { //sunday is 0 as default from Date
            startDay = 7;
            startDayColumn = 8;
        } else {
            startDayColumn = startDay +1;
        }

        if (endDay === 0) {
            endDay = 7;
            endDayColumn = 8;
        } else {
            endDayColumn = endDay +1;
        }


        placeinGrid = "grid-item grid-event grid-col";

        if (startWeek === endWeek) {
            if (startDay === endDay) {
                if (startHour === 0) {
                    //all day event
                    row = startHour + 2;
                    placeinGrid += startDayColumn + " grid-row" + row ;
                } else {
                    duration = endObj.getHours() - startHour;
                    row = startHour -4;
                    placeinGrid += startDayColumn + " grid-row" + row + " grid-rowspan" + duration +" grid-layer2";
                }
            } else {
                //event longer than one day
                duration = endDay - startDay;
                placeinGrid += startDayColumn + " grid-colspan" + duration + " grid-row2" +" grid-layer2";
            }
        } else { ///event går over helg -> neste uke  -put into all day event row
            if (startWeek === displayWeek) {
                duration = 8 - startDay;
                placeinGrid +=  startDayColumn + " grid-colspan" + duration + " grid-row2";
            } else if ( (displayWeek > startWeek) && (displayWeek < endWeek) ) {
                duration = 7;
                placeinGrid += "2" + " grid-colspan" + duration + " grid-row2" +" grid-layer1";
            } else {
                duration = endDay;
                placeinGrid +=  endDayColumn + " grid-colspan" + duration + " grid-row2";
            }

        }



        return placeinGrid;
    }
}


export default WeekOverview;
