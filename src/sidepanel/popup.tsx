
const PopUp = () => {
    const openPopup = () => {
        chrome.sidePanel
            .setPanelBehavior({ openPanelOnActionClick: true })
            .catch((error) => console.error(error));
            chrome.sidePanel.openPanel();
    }

    return (
        <div className="popup">
            <div className="popup__content">
                <div className="popup__close" onClick={openPopup}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="popup__header">
                    <h2>Popup Header</h2>
                </div>
                <div className="popup__body">
                    <p>Popup Body</p>
                </div>
                <div className="popup__footer">
                    <button onClick={openPopup}>Open Judy Chat</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp