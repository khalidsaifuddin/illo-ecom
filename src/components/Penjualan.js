import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';
import CardProdukMini from './CardProdukMini';
import { Alert, Confirm } from 'react-st-modal';

class Penjualan extends React.Component {

	state = {
		routeParams: {
			start: 0,
			limit: 20,
            transaksi_id: this.props.match.params.transaksi_id,
            pengguna_id: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)
		},
        transaksi: {
            rows: [],
            total: 0
        },
        status_transaksi: 'semua',
        transaksi_record: {}
	}
    
    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
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

        if(parseInt(localStorage.getItem('sudah_login')) !== 1){
            this.props.history.push('/login?redirect='+this.props.location.pathname)
            return true
        }

        this.props.getTransaksi(this.state.routeParams).then((result)=>{
            this.setState({
                transaksi: result.payload,
                transaksi_record: result.payload.total > 0 ? result.payload.rows[0] : {}
            })
        })

		setTimeout(function () {
			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000);
	}

    gantiStatus = (tipe) => {
        this.setState({
            status_transaksi: tipe
        })
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
									<h2 className="title"><span>Penjualan</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a>Penjualan</a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
					{/*breadcrumb end*/}

					{/*blog Section start*/}
					<section style={{marginTop:'-70px'}}>
						<div className="container">
							<div className="row">
								<div className="col-md-12 col-lg-12 blog-sec">
                                    <div className="card card20">
                                        
                                        <div style={{
                                            display:'inline-flex', 
                                            marginTop:'8px', 
                                            overflow:'auto',
                                            width:'100%'
                                        }}>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('semua')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.status_transaksi === 'semua' ? '#eeffd8' : 'white'),
                                                    border: (this.state.status_transaksi === 'semua' ? '1px solid green' : '1px solid #ccc'    )
                                                }}
                                                >
                                                    Semua
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('menunggu_pembayaran')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.status_transaksi === 'menunggu_pembayaran' ? '#eeffd8' : 'white'),
                                                    border: (this.state.status_transaksi === 'menunggu_pembayaran' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Menunggu Pembayaran
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('menunggu_verifikasi')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.status_transaksi === 'menunggu_verifikasi' ? '#eeffd8' : 'white'),
                                                    border: (this.state.status_transaksi === 'menunggu_verifikasi' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Menunggu Verifikasi
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('diproses')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.status_transaksi === 'diproses' ? '#eeffd8' : 'white'),
                                                    border: (this.state.status_transaksi === 'diproses' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Diproses
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('dikirim')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.status_transaksi === 'dikirim' ? '#eeffd8' : 'white'),
                                                    border: (this.state.status_transaksi === 'dikirim' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Dikirim
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('diterima')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.status_transaksi === 'diterima' ? '#eeffd8' : 'white'),
                                                    border: (this.state.status_transaksi === 'diterima' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Diterima
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('selesai')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.status_transaksi === 'selesai' ? '#eeffd8' : 'white'),
                                                    border: (this.state.status_transaksi === 'selesai' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Selesai
                                                </div>
                                            </a>
                                        </div>

                                        <h3>Daftar Transaksi</h3>
                                        
                                        

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
        getTransaksi: Actions.getTransaksi
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(Penjualan));
