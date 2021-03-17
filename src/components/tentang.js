import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';

class tentang extends React.Component {

	state = {
		routeParams: {
			start: 0,
			limit: 20
		},
		artikel: {
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
									<h2 className="title"><span> Tentang Illo</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/Blog">Tentang</a></li>
										</ol>
									</nav>
								</div>
								{/* <div className="col-md-12 col-sm-12 col-text-center d-align-center">
									<h2 className="title">
										Tentang Illo
									</h2>
								</div> */}
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
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim libero ac dolor auctor, vitae ullamcorper arcu faucibus. In quam mauris, ultricies a tortor ut, mollis pretium nulla. Donec consequat urna id velit scelerisque blandit. Vestibulum sit amet enim sit amet nunc mattis lobortis. Ut dignissim ipsum bibendum iaculis malesuada. Mauris vel fermentum ipsum. Vivamus dui tortor, porttitor rhoncus nulla id, venenatis posuere nulla. Morbi dapibus ac ex a dapibus. Vestibulum ac consequat nulla, id sodales velit.
                                                    </p>
                                                    <p>
                                                        Aliquam a lectus sit amet augue vulputate venenatis ac id enim. Integer mattis dignissim felis, a mollis nulla finibus at. Aliquam mollis libero eget nisl tempus feugiat. Nam aliquet sit amet tellus dapibus condimentum. Sed nisi diam, ornare id sapien dictum, rutrum laoreet arcu. Donec viverra iaculis metus, vel tempus dui viverra a. Phasellus id hendrerit elit. In pulvinar augue quam, a blandit sem tristique eget.
                                                    </p>
												</div>
											</div>
										</div>
									</div>
									<div className="blog-divider"></div>
								</div>
							</div>
						</div>
					</section>

					<div className="bg-light">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="copyright-section">
										<p>2020 Copyright &copy; powered by Diskuis</p>
									</div>
								</div>
							</div>
						</div>
					</div>
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

export default (connect(null, mapDispatchToProps)(tentang));
