import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';

class kategori extends React.Component {

	state = {
		routeParams: {
			start: 0,
			limit: 20
		},
		kategori_produk: {
			rows: [],
			total: 0
		}
	}

	gradients = [
		'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
		'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
		'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)',
		'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
		'linear-gradient(to top, #d299c2 0%, #fef9d7 100%)',
		'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
		'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
		'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)'
	]

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

		this.props.getKategoriProduk(this.state.routeParams).then((result)=>{
			this.setState({
				kategori_produk: result.payload
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
                                <div className="col-md-6 col-sm-6 col-text-center d-align-center">
									<h2 className="title"><span> Kategori</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/kategori">Kategori</a></li>
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
													<div className="row">
														{this.state.kategori_produk.rows.map((option)=>{
															return (
																<div className="col-md-4 col-sm-6">
																	<a href={"/produk/"+option.kategori_produk_id} style={{width:'100%'}}>
																		<div className="card" style={{
																			margin:'8px', 
																			width:'100%', 
																			background:(this.gradients[this.state.kategori_produk.rows.indexOf(option)]),minHeight:'60px', 
																			textAlign:'center',
																			color:'white', 
																			fontWeight:'400',
																			marginLeft:'0px',
																			border:'none',
																			minHeight:'100px',
																			fontSize: '20px',
																			borderRadius: '20px'
																		}}>
																			<div style={{
																				width:'100%', 
																				height:'100px', 
																				background:'rgba(0, 0, 0, 0.4)',
																				padding:'8px',
																				paddingTop:'16px',
																				borderRadius: '20px'
																			}}>
																				<span style={{textShadow:'2px 2px #434343'}}>
																					{option.nama}
																				</span>
																			</div>
																		</div>
																	</a>
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

					<div className="bg-light">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="copyright-section">
										<p>2021 Copyright &copy; powered by Illo</p>
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
		getArtikel: Actions.getArtikel,
		getKategoriProduk: Actions.getKategoriProduk
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(kategori));
