import { useEffect, useState } from "react";
import Grouping from "../Grouping/Grouping";
import './Dashboard.css'
import Display from '../../assets/icon/Display.svg'
import Down from '../../assets/icon/down.svg'
import Cancelled from '../../assets/icon/Cancelled.svg'


const Dashboard = () => {
    const [data, setdata] = useState(null);
    const [groupType, setgroupType] = useState(null)
    const [ordering, setOrdering] = useState(null)

    const CALL = async () => {
        let response = []
        response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment").then(res => res.json());
        setdata(response)
    }

    useEffect(() => {
        const storage_data = JSON.parse(localStorage.getItem('filter'))

        if (storage_data == null) {
            localStorage.setItem('filter', JSON.stringify({
                group: "User",
                order: "Title"
            }))
            setgroupType("User");
            setOrdering("Title")
        }
        else {
            setOrdering(storage_data.order);
            setgroupType(storage_data.group)
        }
        CALL()
    }, [])

    const changeDisplay = () => {
        console.log("hii")
        var val = document.getElementsByClassName("option")[0];
        const computedStyle = window.getComputedStyle(val);
        if (computedStyle.display === "none") {
            val.style.display = "block";
        } else {
            val.style.display = "none";
        }
    }

    return (
        <div>
            {groupType ?
                <div className="header">
                    <div className="btn" onClick={changeDisplay}> <img src={Display} style={{ marginRight: 10 }} /> Display   <img src={Down} style={{ marginLeft: 10, top: 3, position: "relative" }} /> </div>
                    <div className="option">
                        <div class="cancel" onClick={changeDisplay}><img src={Cancelled} /></div>
                        <div className="selection">
                            <label for="group">Grouping</label>
                            <select id="group" name="group" defaultValue={groupType} onChange={(e) => {
                                setgroupType(e.target.value)
                                localStorage.setItem('filter', JSON.stringify({
                                    group: e.target.value, order: ordering
                                }))
                            }}>
                                <option>Status</option>
                                <option>User</option>
                                <option>Priority</option>
                            </select>
                        </div>

                        <div className="selection" style={{ marginTop: "10px" }}>
                            <label for="order">Ordering</label>
                            <select name="order" defaultValue={ordering} onChange={(e) => {
                                setOrdering(e.target.value)
                                localStorage.setItem('filter', JSON.stringify({
                                    group: groupType, order: e.target.value
                                }))
                            }}
                                id="order">
                                <option>Title</option>
                                <option>Priority</option>
                            </select>
                        </div>
                    </div>
                </div>
                : null}
            <div>  {data ? <Grouping data={data} ordering={ordering} groupType={groupType} /> : null} </div>
        </div>
    )
}

export default Dashboard;