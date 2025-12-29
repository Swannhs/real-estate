import { useEffect, useRef, useState } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import { useMediaQuery, Box } from '@mui/material';

// third-party
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';

// project-imports
import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
import Toolbar from 'sections/apps/calendar/Toolbar';

import { dispatch, useSelector } from 'store';
import { updateCalendarView } from 'store/reducers/calendar';
import axios from 'utils/axios';
import { API_CONFIG } from 'config/api';

// ==============================|| BOOKING - CALENDAR ||============================== //

const BookingCalendar = () => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { calendarView } = useSelector((state) => state.calendar);
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // In a real scenario, fetching from booking-service
      // const response = await axios.get(`${API_CONFIG.BOOKING_SERVICE_URL}/api/v1/bookings`);
      // For now, using mock data or empty array if service not reachable
      const mockBookings = [
        {
          id: '1',
          title: 'Booking #1 - John Doe',
          start: new Date().toISOString(),
          end: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
          allDay: true,
          color: '#00e676'
        },
        {
          id: '2',
          title: 'Booking #2 - Jane Smith',
          start: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
          end: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
          allDay: true,
          color: '#2979ff'
        }
      ];
      setBookings(mockBookings);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }
  }, [matchDownSM]);

  // calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView: string) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <CalendarStyled>
        <Toolbar
          date={date}
          view={calendarView}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onChangeView={handleViewChange}
        />

        <FullCalendar
          weekends
          editable={false}
          droppable={false}
          selectable={true}
          events={bookings}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={date}
          initialView={calendarView}
          dayMaxEventRows={3}
          eventDisplay='block'
          headerToolbar={false}
          allDayMaintainDuration
          height={matchDownSM ? 'auto' : 720}
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyled>
    </Box>
  );
};

export default BookingCalendar;
