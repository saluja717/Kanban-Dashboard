
import './NameIcon.css'

const NameIcon = (name, online, icon) => {
    // Split the name by spaces
    // console.log(name)
    const nameParts = name.split(' ');

    // Determine the display text
    const displayText = nameParts.length === 1
        ? nameParts[0].charAt(0).toUpperCase()  // First letter if only first name
        : (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase(); // First two letters if first and last name

    return (
        <div className={icon}>
            {displayText}
            <div className="online" style={online ? { backgroundColor: "lightgreen" } : { backgroundColor: "lightgrey" }}></div>
        </div>

    );
};

export default NameIcon;