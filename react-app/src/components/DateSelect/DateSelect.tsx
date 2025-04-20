import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import "./dateselect.css";

interface PropTypes {
    dates: string[];
    handleDateChange: (date: number) => void;
    selected? : number;
}

const DateSelect = ({ dates, handleDateChange, selected = 0 }: PropTypes) => {

    return <div className="date-select">
        <button
            className="date-select-control"
            disabled={selected === 0}
            onClick={() => {handleDateChange(selected - 1)}}
        >
            <ArrowLeftIcon fontSize="large" />
        </button>
        {
            dates.map((date, i) => <div
                    className={`date-select-date ${i === selected ? "selected" : ""}`}
                    key={date}
                    onClick={() => {if (i !== selected) handleDateChange(i)}}
                >
                    {date}
            </div>
            )
        }
        <button
            className="date-select-control"
            disabled={selected === dates.length - 1}
            onClick={() => {handleDateChange(selected + 1)}}
        >
            <ArrowRightIcon fontSize="large" />
        </button>
    </div>

}

export default DateSelect;