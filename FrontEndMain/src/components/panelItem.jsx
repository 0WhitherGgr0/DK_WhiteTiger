import '../styles/panel.css';

export default function PanelItem({info, data, color, imgSrc}){

    return (
        <div className={`panelBox_itemCard panelBox_itemCard--${color}`}>
            <h4 className="panelBox_info">{info}</h4>
            <p className="panelBox_data">{data}</p>
            <div className="panelBox_icon">
                <img src={imgSrc} alt="" />
            </div>
        </div>
    )

}