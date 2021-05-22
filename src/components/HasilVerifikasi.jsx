import React from 'react'
import Navbar from '../components/navbar'
import {withRouter} from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../store/actions'

import moment from 'moment'
import Footer from './footer'
import CardProdukMini from './CardProdukMini'

import Modal from 'react-modal'
import BounceLoader from "react-spinners/BounceLoader"

import QRCode from 'qrcode.react'

// import Framework7 from 'framework7'
// import { f7ready } from 'framework7-react'

class FormAlamatPengguna extends React.Component {

	state = {
        loading: false,
		routeParams: {
			start: 0,
			limit: 20,
            alamat_utama: 1,
            kode_validasi_pengguna_id: this.props.match.params.kode_validasi_pengguna_id,
            pengguna_id: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)
		},
        teks_alert: '',
        tampil_alert: false,
        kode_validasi_pengguna: {
            kode_verifikasi: '0'
        }

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

        this.props.getVerifikasiPengguna(this.state.routeParams).then((result)=>{
            if(result.payload.length > 0){
                this.setState({
                    kode_validasi_pengguna: result.payload[0]
                })
            }
        })

		setTimeout(function () {
			document.querySelector(".loader-wrapper").style = "display: none"
		}, 2000)
	}

    render() {

		return (
			<div>
				<Navbar />
                <Modal
                    isOpen={this.state.loading}
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
                        Menyimpan...
                    </div>
                </Modal>
				{/*blog right Section start*/}
                <div className="page-margin">
					{/*breadcrumb start*/}
                    
					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
								<div className="col-md-6 col-sm-6 col-text-center d-align-center">
									<h2 className="title"><span>Hasil Verifikasi</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/verifikasi">Verifikasi</a></li>
											<li className="breadcrumb-item"><a>Hasil Verifikasi</a></li>
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
                                    <div className="cert_container" style={{textAlign:'center', padding:'32px'}}>
                                        <div style={{fontSize:'30px', marginBottom:'16px'}}>Terima kasih telah membeli produk original Illo!</div>
                                        <h2 style={{color:'#434343', marginBottom:'4px', fontWeight:'bold'}}>{this.state.kode_validasi_pengguna.nama}</h2>
                                        <h4>Kode Verifikasi <b>{this.state.kode_validasi_pengguna.kode_verifikasi}</b></h4>
                                        <QRCode value={this.state.kode_validasi_pengguna.kode_verifikasi} style={{width:'80px', height:'auto'}} />
                                        <div style={{marginTop:'32px'}}>Nama Pembeli:</div>
                                        <div style={{fontWeight:'bold'}}>{this.state.kode_validasi_pengguna.kode_validasi_pengguna_nama}</div>
                                        <div style={{marginTop:'8px'}}>Email Pembeli:</div>
                                        <div style={{fontWeight:'bold'}}>{this.state.kode_validasi_pengguna.kode_validasi_pengguna_email}</div>
                                        <div style={{marginTop:'8px'}}>No Whatsapp Pembeli:</div>
                                        <div style={{fontWeight:'bold'}}>{this.state.kode_validasi_pengguna.kode_validasi_pengguna_no_telepon}</div>
                                        <div style={{marginTop:'8px'}}>Waktu Verifikasi:</div>
                                        <div style={{fontWeight:'bold'}}>{moment(this.state.kode_validasi_pengguna.tanggal_verifikasi).format('DD')} {this.bulan[moment(this.state.kode_validasi_pengguna.tanggal_verifikasi).format('M')-1]} {moment(this.state.kode_validasi_pengguna.tanggal_verifikasi).format('YYYY')}, {moment(this.state.kode_validasi_pengguna.tanggal_verifikasi).format('HH')}:{moment(this.state.kode_validasi_pengguna.tanggal_verifikasi).format('mm')}</div>
                                        <div style={{marginTop:'32px'}}>URL Hasil Verifikasi:</div>
                                        <div style={{fontWeight:'bold', padding:'8px', border:'2px dashed #ccc'}}>{window.location.href}</div>
                                        <div style={{fontSize:'10px'}}>*) Silakan copy dan simpan URL hasil verifikasi diatas untuk mengakses kembali hasil verifikasi ini</div>
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
		)
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getArtikel: Actions.getArtikel,
        getAlamatPengguna: Actions.getAlamatPengguna,
        simpanAlamatPengguna: Actions.simpanAlamatPengguna,
        getWilayah: Actions.getWilayah,
        getVerifikasiPengguna: Actions.getVerifikasiPengguna
    }, dispatch)
}

export default (connect(null, mapDispatchToProps)(FormAlamatPengguna))
