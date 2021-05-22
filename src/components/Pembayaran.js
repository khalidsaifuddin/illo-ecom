import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';
import CardProdukMini from './CardProdukMini';


class Pembayaran extends React.Component {

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
									<h2 className="title"><span>Pembayaran</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a>Pembayaran</a></li>
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
                                        <div className="pembayaran" style={{textAlign:'center'}}>
                                            <h3>Terima kasih telah memesan produk Illo</h3>
                                            <h3 style={{marginTop:'8px', marginBottom:'32px'}}>
                                                <span style={{fontSize:'10px', fontWeight:'normal'}}>ID Transaksi</span>
                                                <br/>
                                                <span style={{fontSize:'20px'}}>{this.state.transaksi_record.transaksi_id}</span>
                                                <br/>
                                                <span style={{fontWeight:'normal'}}>
                                                    {moment(this.state.transaksi_record.create_date).format('D')} {this.bulan[moment(this.state.transaksi_record.create_date).format('M')-1]} {moment(this.state.transaksi_record.create_date).format('YYYY')}, {moment(this.state.transaksi_record.create_date).format('HH')}:{moment(this.state.transaksi_record.create_date).format('mm')}
                                                </span>
                                            </h3>
                                            <div style={{marginTop:'32px'}}>
                                                Berikut ini adalah nominal pembayaran Anda
                                                <div className="card card20" style={{color:'#4f4f4f', textAlign:'center', fontSize:'20px', fontWeight:'bold', marginTop:'16px', marginBottom:'16px'}}>
                                                    Rp {this.state.transaksi_record.total_nominal ? this.formatAngka(parseFloat(this.state.transaksi_record.total_nominal)+parseFloat(this.state.transaksi_record.ongkos_kirim)) : '0'}
                                                </div>
                                                <div>
                                                    Mohon lakukan pembayaran sebelum tanggal
                                                    <div>
                                                        {moment(this.state.transaksi_record.batas_pembayaran).format('D')} {this.bulan[moment(this.state.transaksi_record.batas_pembayaran).format('M')-1]} {moment(this.state.transaksi_record.batas_pembayaran).format('YYYY')}, {moment(this.state.transaksi_record.batas_pembayaran).format('HH')}:{moment(this.state.transaksi_record.batas_pembayaran).format('mm')}
                                                    </div>
                                                    Atau pemesanan Anda akan dibatalkan secara otomatis
                                                </div>
                                            </div>
                                            <div style={{marginTop:'32px'}}>
                                                Untuk melanjutkan pembayaran, silakan transfer sejumlah nominal di atas ke rekening bank yang tersedia di bawah ini
                                                <div className="card card20" style={{color:'#4f4f4f', textAlign:'center', fontSize:'20px', fontWeight:'bold', marginTop:'16px', marginBottom:'16px'}}>
                                                    Bank BCA<br/>
                                                    7130788889<br/>
                                                    a/n PT Illo Indonesia<br/>
                                                </div>
                                            </div>
                                            <div style={{marginTop:'32px'}}>
                                                Setelah melakukan pembayaran, mohon lakukan konfirmasi pembayaran menggunakan tombol di bawah ini. Proses verifikasi pembayaran akan membutuhkan waktu maksimal 3 x 24 jam
                                                <br/>
                                                <button style={{marginTop:'16px'}} className="btn btn-custom theme-color" onClick={()=>this.props.history.push('/KonfirmasiPembayaran/'+this.props.match.params.transaksi_id)}>
                                                    Konfirmasi Pembayaran
                                                </button>
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
        getTransaksi: Actions.getTransaksi
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(Pembayaran));
