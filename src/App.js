import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class WeekOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
          events: [],
          weekNumber: 0,
          numEvents: 0,
          clicks: 0,
          show:true

        };
    }

    componentDidMount(){
        this.populateState();
    }

    populateState() {
        let events = this._getEvents();
        let today = new Date();
        let thisWeek = today.getWeek()
        this.setState({events:events, weekNumber: thisWeek, numEvents:events.length});

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
                    Familyplanner
                    <button onClick={this.decreaseWeek}>-</button>
                        {this.state.weekNumber}
                    <button onClick={this.incrementWeek}>+</button>
                </div>
                <div className="main">
                    Main
                    {this._populateHours()}
                    {this._populateEvents(this.state.events, this.state.weekNumber)}
                </div>

                <div className="aside">ikon</div>
            </div>
        );
    }

    //TO DO - denne er ikke rett
    _getWeekNumber() {
        return ( (nameform) => {
            return ( <NameForm
                key={nameform.id}
                weeknumber={nameform.weeknumber}/>);
        });
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
                start: '2018-03-13T14:00:00.000',
                end: '2018-08-13T16:00:00.000',
                activity: {name: 'fotballtrening', location: 'Molde'}
            },
            {
                id: 3,
                actor: {pid: 4, name: 'Maia', image: './images/Maia.png'},
                helper: {pid: 0, name: 'Jørn', image: './images/Jorn.png'},
                start: '2018-03-14T17:00:00.000',
                end: '2018-03-14T18:00:00.000',
                activity: {name: 'Bassøving', location: 'Charlottenlund'}
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


class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
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
      let hourinGrid = "grid-item grid-hour grid-col1"+ " grid-row" + this.props.hour + " grid-span1" ;
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
        let placeinGrid = "grid-item grid-event grid-col" + weekday + " grid-row" + start_time + " grid-span" + duration;
        console.log(placeinGrid);
        return placeinGrid;
    }
}


export default WeekOverview;
