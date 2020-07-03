import { connect } from "react-redux";
// import EventsBackup "../components/ReactVirtualized/EventsBackup";
import Events from "../components/ReactVirtualized/Events";
import { setEvents } from "../store/actions/event";
const eventProps = state => {
  return state.eventsReducer;
};

const matchStateToEventProps = state => {
  const { events, hasMoreData, isLoading } = eventProps(state);
  
  return {
    width: 100,
    events,
    setEvents,
    hasMoreData,
    isLoading
  };
};

const EventsRedux = connect(matchStateToEventProps)(Events);

export default EventsRedux;
