
import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import Modal from 'react-modal';
import BounceLoader from "react-spinners/BounceLoader";

class Modal_tmp extends React.Component {
    render() {
        return (
            <Modal
                isOpen={this.props.loading}
                contentLabel="Example Modal"
                style={{
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        transform             : 'translate(-50%, -50%)',
                        minHeight             : '225px',
                        minWidth              : '194px',
                        borderRadius          : '20px',
                        background            : 'rgb(255,255,255,0.8)',
                        border                : '1px solid #eee',
                        textAlign             : 'left'
                    }
                }}
            >
                <BounceLoader color={"#47B161"} loading={true} size={150} />
                <div style={{marginTop:'170px', width:'100%', textAlign:'center', color:'#434343'}}>
                    Memuat...
                </div>
            </Modal>
        )
    }
}

export default Modal_tmp