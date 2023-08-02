import React, { useState } from "react";
import loading from "./file.svg";
import Modal from "react-modal";
import TestFirstComp from "./components/test-first-comp/TestFirstComp";

// # Dùng bitcloud

Modal.setAppElement('body');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const App = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    document.querySelector('title').innerText = 'Your page title'; // Cập nhật thẻ title
    const c = document.querySelector('meta[name="description"]').innerText = 'Your page description'; // Cập nhật thẻ meta description
    console.log(c);
    return(
        <div>
            <img src={loading} alt="img" width="50px" />
            <button onClick={() => setModalIsOpen(true)}>Open modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={() => {}}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={() => setModalIsOpen(false)}>close</button>
                <div>I am a modal</div>
            </Modal>

            <TestFirstComp/>

        </div>
    )
};

export default App;