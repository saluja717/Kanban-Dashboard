import { useEffect, useState } from "react";
import Card from "../Card/Card";
import './Grouping.css'
import Dot from '../../assets/icon/3 dot menu.svg'
import Add from '../../assets/icon/add.svg'
import Backlog from '../../assets/icon/Backlog.svg'
import Cancelled from '../../assets/icon/Cancelled.svg'
import Done from '../../assets/icon/Done.svg'
import NoPriority from '../../assets/icon/No-priority.svg'
import LowPriority from '../../assets/icon/Img - Low Priority.svg'
import MediumPriority from '../../assets/icon/Img - Medium Priority.svg'
import HighPriority from '../../assets/icon/Img - High Priority.svg'
import UrgentPriority from '../../assets/icon/SVG - Urgent Priority colour.svg'
import InProgress from '../../assets/icon/in-progress.svg'
import Todo from '../../assets/icon/To-do.svg'
import NameIcon from "../NameIcon/NameIcon";


const Grouping = (props) => {

    const [groupName, setgroupName] = useState([])
    const [count, setcount] = useState([]);
    const [name, setName] = useState({})

    const counter = (key, value) => {
        var c = 0;
        props.data.tickets.map((val) => {
            if (val[key] == value) c++;
        })
        return c;
    }

    useEffect(() => {

        setgroupName([]);
        setName({});
        setcount([])
        const naming = {};
        props.data.users.map((value) => {
            setgroupName((prev) => [...prev, value.id])
            setcount((prev) => [...prev, counter("userId", value.id)]);
            naming[value.id] = value.name
            naming[value.id + " Online"] = value.available
        })
        setName(naming)
        // }
        if (props.groupType == "Status") {
            setgroupName([]);
            setcount([])
            // props.data.tickets.map((value) => {
            //     setgroupName((prev) => {
            //         const exists = prev.includes(value.status);
            //         if (!exists) {
            //             setcount((prev) => [...prev, counter("status", value.status)]);
            //             return [...prev, value.status];
            //         }
            //         return prev;
            //     });
            // })
            let status_data = ["Todo", "In progress", "Backlog", "Done", "Cancelled"];
            setgroupName(status_data)

            status_data.map((value) => {
                setcount((prev) => [...prev, counter("status", value)]);
            })


        }
        else if (props.groupType == "Priority") {
            setgroupName([]);
            setcount([])
            setgroupName(["No priority", "Low", "Medium", "High", "Urgent"])
            for (let i = 0; i < 5; i++) {
                setcount((prev) => [...prev, counter("priority", i)]);
            }
        }
        // console.log("yes", count)
    }, [props.groupType, props.ordering])


    const findIcon = (value) => {
        if (value == "Todo") return <img className="name_icon" src={Todo} />;
        else if (value == "In progress") return <img className="name_icon" src={InProgress} />;
        else if (value == "Backlog") return <img className="name_icon" src={Backlog} />;
        else if (value == "No priority") return <img className="name_icon" src={NoPriority} />;
        else if (value == "Low") return <img className="name_icon" src={LowPriority} />;
        else if (value == "Medium") return <img className="name_icon" src={MediumPriority} />;
        else if (value == "High") return <img className="name_icon" src={HighPriority} />;
        else if (value == "Urgent") return <img className="name_icon" src={UrgentPriority} />;
        else if (value == 'Cancelled') return <img className="name_icon" src={Cancelled} />;
        else if (value == 'Done') return <img className="name_icon" src={Done} />
        else return NameIcon(name[value], name[value + " Online"], "icon")

    }

    return (
        <div className="main">
            <div className="main-handler">

                {
                    groupName ?
                        groupName.map((value, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="block">

                                        <div className="main-handler__item">
                                            <div className="name_tag">
                                                {findIcon(value)}
                                                {props.groupType == "User" ? <div>{name[value]} <span>{count[idx]}</span> </div> : <div>{value} <span>{count[idx]}</span></div>}
                                            </div>
                                            <div class="side_img"><img src={Add} /><img src={Dot} /></div>
                                        </div>


                                        <Card ordering={props.ordering} name={name} data={props.data.tickets} val={props.groupType != 'Priority' ? value : idx} groupType={props.groupType == "User" ? "userId" : props.groupType == "Status" ? "status" : "priority"} />
                                    </div>
                                </div>
                            )
                        }) : <p>Loading</p>
                }

            </div>
        </div>
    );
}

export default Grouping;