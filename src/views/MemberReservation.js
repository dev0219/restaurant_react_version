import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import TitleComponent from '../components/TitleComponent';
import ConfirmMessageComponent from '../components/ConfirmMessageComponent';
import InputTitleComponent from '../components/InputTitleComponent';
import SelectNumberComponent from '../components/SelectNumberComponent';
import ButtonComponent from '../components/ButtonComponent';
import { connect } from 'react-redux';
import { handleStoreConfirm, handleStoreRestaurantInfo } from '../actions';
import { createReservation, checkReservation } from '../api/reservation';
import "../styles/memberReservation.css";


const MemberReservation = ({dispatch, restaurantinfo, userinfo}) => {

    const navigate = useNavigate();
    const [isCalled, setIsCalled] = useState(false);
    const currentDate = new Date();
    const [dayNames, setDayNames] = useState([
        "sunday",
        "monday",
        "tuesday",
        "wendnesday",
        "thursday",
        "friday",
        "saturday",
      ]);
    const [day, setDay] = useState("");
    const [date, setDate] = useState(currentDate.getDate());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [seats, setSeats] = useState(2);
    const [confirmstatus, setConfirmStatus] = useState("");

    const handleChoosemonth = (val) => {
        setMonth(val);
    }

    const handleChoosedate = (val) => {
        setDate(val);
    }

    const handleChooseseat = (val) => {
        setSeats(val);
    }

    const handleReserveNow = async () => {
        const currentyear = currentDate.getFullYear();
        const selected_bookdate = new Date(
            currentyear + "-" + month + "-" + date
          );
        let reservationObj = {
            name: restaurantinfo.restaurant.name,
            restaurantId: restaurantinfo.restaurant._id,
            date: currentyear + "-" + month + "-" + date,
            seats: seats,
            userId: userinfo.userId,
            day: dayNames[selected_bookdate.getDay()],
          };
        if (restaurantinfo.restaurant.days.includes(dayNames[selected_bookdate.getDay()])) {
            const is_available_seat = await checkReservation(reservationObj);
            if (is_available_seat.success) { 
                let availableSeats = restaurantinfo.restaurant.seats - is_available_seat.data.result.seats;
                if (availableSeats < seats) {
                    let confirmStatusTxt = currentyear +
                        "-" +
                        month +
                        "-" +
                        date +
                        ", " +
                        seats +
                        " Seats are not available." +
                        "Maximum Seating: " +
                        restaurantinfo.restaurant.seats +
                        " & Available Seats: " +
                        availableSeats +
                        ".";
                    setConfirmStatus(confirmStatusTxt);
                    setIsCalled(true);
                } else {
                    setIsCalled(false);
                    const is_created_reservation = await createReservation(
                        reservationObj
                      );
                    if (is_created_reservation.data.result.status == 2) { 
                        dispatch(handleStoreConfirm(true));
                        setTimeout(() => {
                            navigate("/memberprofile");
                        }, 2000);
                    }
                }
            } 
        } else {
            setConfirmStatus("The restaurant is not opened for the seleted date. Please try with another date.");
            setIsCalled(true);
        }

    }

    const getBookdata = async () => {
        const dayIndex = currentDate.getDay();
        setDay(dayNames[dayIndex])
        if (
            restaurantinfo.restaurant.name == "" ||
            restaurantinfo.restaurant.restaurantImg == ""
        ) {
            let getRetaurantInfo = JSON.parse(
            localStorage.getItem("restaurantInfo")
            );
            dispatch(handleStoreRestaurantInfo(getRetaurantInfo));
        }
    }

    useEffect(() => {
        getBookdata();
    }, [])
    
    return (
        <div className="member-restaurants-elements">
            <TitleComponent title="Book Reservation" />
            <h4>Restaurant Name : { restaurantinfo.restaurant.name }</h4>
            <h4>Seats Available : { restaurantinfo.restaurant.seats }</h4>
            <div className="open-days">
                <h4>Open Days</h4>
                <div className="open-day-item">
                    {restaurantinfo.restaurant.days.map((item, index) => {
                        return (
                            <div key={index}>
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
            {isCalled && <ConfirmMessageComponent id="confirm" content={confirmstatus} />}
            <h4>Date</h4>
            <div className="select-reservation-date">
                <div className="select-reservation-date-element">
                    <InputTitleComponent name="Choose a date" />
                    <SelectNumberComponent value={date} step="1" maxnumber="31" onClickEvent={handleChoosedate}/>
                </div>
                <div className="select-reservation-month-element">
                    <InputTitleComponent name="Choose a month" />
                    <SelectNumberComponent value={month} step="1" maxnumber="12" onClickEvent={handleChoosemonth}/>
                </div>
            </div>
            <div className="reservation-now-actions"></div>
            <div className="select-seat-element">
                <InputTitleComponent name="Choose a seat" />
                <SelectNumberComponent value={seats} step="2" maxnumber={restaurantinfo.restaurant.seats} onClickEvent={handleChooseseat}/>
            </div>

            <ButtonComponent id="resbtn" name="RESERVE NOW" onClickEvent={handleReserveNow} />

        </div>
    )    
}

const mapStateToProps = state => ({
    restaurantinfo: state.restaurantinfo,
    userinfo: state.userinfo
})

export default connect(mapStateToProps)(MemberReservation);