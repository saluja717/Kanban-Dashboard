import { useEffect, useState } from "react";
import NameIcon from '../NameIcon/NameIcon'
import NoPriority from '../../assets/icon/No-priority.svg'
import LowPriority from '../../assets/icon/Img - Low Priority.svg'
import MediumPriority from '../../assets/icon/Img - Medium Priority.svg'
import HighPriority from '../../assets/icon/Img - High Priority.svg'
import UrgentPriority from '../../assets/icon/SVG - Urgent Priority colour.svg'


import './Card.css'

const Card = (props) => {

    const [data, setdata] = useState([]);

    useEffect(() => {
        let new_data = props.data.filter((value) => {
            return props.val == value[props.groupType]
        });
        if (props.ordering == "Priority") {
            console.log("priority")
            new_data.sort((a, b) => b.priority - a.priority)
        }
        else {
            new_data.sort((a, b) => a.title.localeCompare(b.title))
        }
        setdata(new_data)


    }, [props.val, props.ordering])





    function get(val) {
        if (val == 4) return UrgentPriority;
        else if (val == 3) return HighPriority;
        else if (val == 2) return MediumPriority;
        else if (val == 1) return LowPriority;
        return NoPriority;
    }

    return (
        <div className="card-main-com">
            {
                data.length ? data.map((value) => {
                    return (
                        <div className="card-main">
                            <div className="id_header">
                                <div style={{ color: "grey", zIndex: 200, fontSize: "20px" }}>{value["id"]}</div>
                                <div>{NameIcon(props.name[value["userId"]], props.name[value["userId"] + " Online"], "icon1")}</div>
                            </div>
                            <div style={{ fontWeight: "bold", fontSize: "20px" }}>{value["title"]}</div>
                            <div className="img">
                                <img src={get(value["priority"])} />
                                <div>{value["tag"][0]}</div>
                            </div>
                        </div>
                    );
                })
                    :

                    <div className="card-main">
                        <div style={{ fontWeight: "bold", fontSize: "20px" }}>NO DATA</div>
                    </div>

            }
        </div>
    )
}

export default Card;