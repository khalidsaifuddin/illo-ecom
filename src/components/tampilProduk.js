import React from 'react';

import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';
import CardProduk from './CardProduk';
import CardProdukMini from './CardProdukMini';

class tampilProduk extends React.Component {
	state = {
		routeParams: {
			start: 0,
			limit: 20,
            produk_id: (this.props.match.params.produk_id ? this.props.match.params.produk_id : null)
		},
		kategori_produk: {
			rows: [],
			total: 0
		},
		produk: {
			rows: [],
			total: 0
		},
        produk_lain: {
            rows: [],
			total: 0
        },
        produk_record: {}
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
        
        // console.log(this.props.match.params)

		this.props.getProduk(this.state.routeParams).then((result)=>{
			this.setState({
				produk: result.payload,
                produk_record: result.payload.total > 0 ? result.payload.rows[0] : {}
			},()=>{
                this.props.getKategoriProduk({...this.state.routeParams, kategori_produk_id: null}).then((result)=>{
                    this.setState({
                        kategori_produk: result.payload
                    },()=>{
                        this.props.getProduk({...this.state.routeParams, produk_id: null, limit: 3, a_random: 'Y'}).then((result)=>{
                            this.setState({
                                produk_lain: result.payload
                            })
                        })
                    })
                })
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
				{/*blog right Section start*/}
				<div className="page-margin">
					{/*breadcrumb start*/}
					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
								<div className="col-md-6 col-sm-6 col-text-center d-align-center">
									<h2 className="title"><span>Produk</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Home</a></li>
											<li className="breadcrumb-item"><a href="/produk/semua">Produk</a></li>
											<li className="breadcrumb-item active"><a href={null}>
                                                {this.state.produk_record.nama}
                                            </a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
					{/*breadcrumb end*/}

					{/*blog Section start*/}
					<section style={{marginTop:'-80px'}}>
						<div className="container">
							<div className="row">
								<div className="col-md-8 col-lg-9 blog-sec">
									<div className="row blog-list">

                                        {/* detail produk */}
                                        <div className="col-md-12 col-lg-12 order-md-last list-sidebar">
                                            detail produknya
                                        </div>
                                    
									</div>
								</div>
								<div className="col-md-4 col-lg-3 order-md-last list-sidebar">
									<div className="sidebar">
										<div className="sidebar-space">
											<h4 className="blog-title">Rekomendasi</h4>
                                            <div className="blog-divider"></div>
                                            <div className="blog-cat-detail">
                                                {this.state.produk_lain.rows.map((option)=>{
                                                    return (
                                                        <CardProdukMini produk={option} />
                                                    )
                                                })}
                                            </div>

											<h4 className="blog-title">Kategori Produk</h4>
											<div className="blog-divider"></div>
											<div className="blog-cat-detail">
												<ul>
                                                    <li className="marg-15">
                                                        <a href={"/produk/semua"}>
                                                            {this.props.match.params.kategori_produk_id === 'semua' ? <b style={{color:'#064F45', fontSize:'16px'}}>Semua Kategori</b> : <span>Semua Kategori</span>}
                                                        </a>
                                                    </li>
                                                    {this.state.kategori_produk.rows.map((option)=>{
                                                        return (
                                                            <li className="marg-15">
                                                                <a href={"/produk/"+option.kategori_produk_id}>
                                                                    {/* {option.nama} */}
                                                                    {this.props.match.params.kategori_produk_id === option.kategori_produk_id ? <b style={{color:'#064F45', fontSize:'16px'}}>{option.nama}</b> : <span>{option.nama}</span>}
                                                                </a>
                                                            </li>
                                                        )
                                                    })}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					
                    <Footer />
					{/*Footer Section End*/}
				</div>
				{/*blog right Section end*/}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getArtikel: Actions.getArtikel,
		getProduk: Actions.getProduk,
        getKategoriProduk: Actions.getKategoriProduk
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(tampilProduk));
