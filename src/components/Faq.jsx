import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';

class Faq extends React.Component {

	state = {
		routeParams: {
			start: 0,
			limit: 20
		},
		faq: {
			rows: [],
			total: 0
		}
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

        this.props.getFaq(this.state.routeParams).then((result)=>{
            this.setState({
                faq: result.payload
            })
        })

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
                                <div className="col-md-8 col-sm-8 col-text-center d-align-center">
									<h2 className="title"><span> Frequently Asked Question (FAQ)</span></h2>
								</div>
								<div className="col-md-4 col-sm-4 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/Faq">FAQ</a></li>
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
                                                    <div id="accordion">
                                                        {this.state.faq.rows.map((option)=>{
                                                            return (
                                                                <div className="card border-theme mb-3 radius-0">
                                                                    <div className="card-header" id={option.faq_id} data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <a class="">{option.pertanyaan} <i className="fa fa-angle-down"></i></a>
                                                                    </div>

                                                                    <div id="collapseOne" className="collapse show" aria-labelledby={option.faq_id} data-parent="#accordion">
                                                                        <div className="card-body">
                                                                            <div dangerouslySetInnerHTML={{ __html: (option.jawaban ? option.jawaban.replace(/noreferrer/g, 'noreferrer" class="link external') : "<p></p>")}} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
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
		getArtikel: Actions.getArtikel,
        getFaq: Actions.getFaq
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(Faq));
