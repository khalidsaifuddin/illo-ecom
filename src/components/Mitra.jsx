import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';

class Mitra extends React.Component {

	state = {
		routeParams: {
			start: 0,
			limit: 20
		},
		mitra: {
			rows: [],
			total: 0
		},
		record_artikel: {}
	}

	bulan = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ]
	
	componentDidMount() {

		setTimeout(function () {
			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000);
	}
	
	render() {

		return (
			<div>
				<Navbar />
				<div className="page-margin">

					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
                                <div className="col-md-6 col-sm-6 col-text-center d-align-center">
									<h2 className="title"><span> Mitra Illo</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/Mitra">Mitra</a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>

					<section style={{paddingTop:'16px'}}>
						<div className="container">
							<div className="row">
								<div className="col-sm-12">
									<div className="blog-item">
										<div className="blog-text">
											<div className="blog-description">
												<div style={{marginTop:'-8px', width:'100%', overflowX:'hidden'}}>
                                                    
												</div>
											</div>
										</div>
									</div>
									<div className="blog-divider"></div>
								</div>
							</div>
						</div>
					</section>

					<Footer />
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getArtikel: Actions.getArtikel
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(Mitra));
