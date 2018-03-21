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

        console.log("Dagens dato og uke: ", today, " ", thisWeek);

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
                    <div className="start"> Familyplanner</div>
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
                    Main
                    {this._populateWeekdays(this.state.weekdays, this.state.language)}
                    {this._populateHours()}
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
        console.log('length eventlist: ', eventList.length);

        eventList = [
            {
                id: 1,
                actor: {pid: 1, name: 'Emma', image: './images/Emma.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Marita.png'},
                start: '2018-03-12T18:00:00.000',
                end: '2018-03-12T21:00:00.000',
                activity: {name: 'Svømming', location: 'Pirbadet'}
            },
            {
                id: 2,
                actor: {pid: 3, name: 'Sondre', image: './images/Sondre.png'},
                helper: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                start: '2018-03-13T00:00:00.000',
                end: '2018-03-15T00:00:00.000',
                activity: {name: 'fotballtrening', location: 'Molde'}
            },
            {
                id: 3,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                start: '2018-03-14T17:00:00.000',
                end: '2018-03-14T18:00:00.000',
                activity: {name: 'Bass', location: 'Charlottenlund'}
            },
            {
                id: 4,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 2, name: 'Marita', image: './images/Marita.png'},
                start: '2018-03-20T17:00:00.000',
                end: '2018-03-20T20:00:00.000',
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
                location={event.activity.location}
            />);
        });
    }


    _populateHours() {
        let hoursList = [];
        const starthour = 7;
        const endhour = 23;
        for (let i = starthour; i <= endhour; i++) {
            if (i === starthour){
                let alldayid = starthour -1;
                hoursList.push({id: alldayid, hour: "All day"});
            }
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
        console.log("lengdre på weekdaylist ved start:", weekdaysList.length);
        console.log("Lengde på innkommende weekdays ", weekdays.length,  weekdays);
        for (let id = 0; id < weekdays.length; id++) {

            if (weekdays[id].language === language) {
                console.log("inne i ytre loop: " , id);
                console.log("første dag: ", weekdays[0].days[0]);

                for (let day = 0; day < weekdays[id].days.length; day++){
                    console.log("inne i indre loop ", day);
                    console.log("legger til ", weekdays[id].days[day]);
                    weekdaysList.push({id: day, weekdaynum: day, weekday: weekdays[id].days[day]});
                    console.log('weekdayList: ', weekdaysList.length, weekdaysList);
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
        let weekday;
        let starttime;
        let duration;

        console.log('innhold eventList før push ', eventList);

        for (let id = 0; id < events.length; id++) {
            eventStartObj = new Date(events[id].props.start);
            console.log('Start week ', eventStartObj.getWeek());
            let eventWeek = eventStartObj.getWeek();
            if(eventWeek === weekNumber) {
                eventList.push({id: id, event: events[id]});
            }
        }


        console.log('innhold eventList etter push ', eventList);

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


class Weekday extends Component {
    render() {
        return (
            <div className={this._getWeekdayinGrid()}>
                <div className="weekday">
                    <p>{this.props.weekday}</p>
                </div>
            </div>

        );
    }

    _getWeekdayinGrid() {
        let day = this.props.weekdaynum + 2;
        console.log("DAGVERDI: " , this.props.weekdaynum, typeof this.props.weekdaynum);
        let weekdayinGrid = "grid-item grid-weekday grid-row1 grid-col" + day;
        return weekdayinGrid;
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

      let start;
      if( this.props.hour === "All day") {
          start = 2;
      } else {
          start = this.props.hour -4;
      }

      console.log("TId: ", this.props.key, " Time ", this.props.hour);
      let hourinGrid = "grid-item grid-hour grid-col1"+ " grid-row" + start + " grid-rowspan1" ;
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
                {this.props.activity} {this.props.location}
            </div>
        </div> );
    }


    _getEventinGrid() {

        const startObj = new Date(this.props.start);
        const endObj = new Date(this.props.end);
        const start_time = startObj.getHours();
        const start_day = startObj.getDay();
        const end_day = endObj.getDay();
        const weekday = startObj.getDay() + 1;


        let duration;
        let row;
        let placeinGrid;
        if (start_day === end_day) {



            if (start_time === 0) {
                //all day event
                row = start_time + 2;
                placeinGrid = "grid-item grid-event grid-col" + weekday + " grid-row" + row;
            } else {
                duration = endObj.getHours() - start_time;
                row = start_time -4;
                placeinGrid = "grid-item grid-event grid-col" + weekday + " grid-row" + row + " grid-rowspan" + duration;
            }
        } else {
            //event longer than one day
            duration = end_day - start_day;
            placeinGrid = "grid-item grid-event grid-col" + weekday + " grid-colspan" + duration + " grid-row2";

        }



        return placeinGrid;
    }
}


export default WeekOverview;
