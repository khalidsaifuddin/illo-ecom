import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';
import { Alert } from 'react-st-modal';

class verifikasi extends React.Component {

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

    setValue = (tipe) => (e) => {
        this.setState({
           routeParams: {
              ...this.state.routeParams,
              [tipe]: e.currentTarget.value
           }
        },()=>{
           console.log(this.state.routeParams)
        })
    }

    prosesVerifikasi = () => {

        if(
            !this.state.routeParams.nama ||
            !this.state.routeParams.email ||
            !this.state.routeParams.no_telepon ||
            !this.state.routeParams.kode_produk ||
            !this.state.routeParams.kode_serial
        ){
            Alert('Mohon lengkapi semua isian sebelum melanjutkan proses!', 'Peringatan')
            return true
        }

        console.log(this.state.routeParams)
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
									<h2 className="title"><span> Verifikasi Produk Illo</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="">Verifikasi</a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>

					<section style={{paddingTop:'16px'}}>
						<div className="container">
							<div className="row">
                            
								<div className="col-md-8 col-lg-9 blog-sec">
									<div className="blog-item">
                                        <div className="theme-form" style={{marginTop:'0px', padding:'16px', border:'2px dashed #cccccc', borderRadius:'20px'}}>
                                            <h3 style={{marginTop:'4px', marginBottom:'16px', fontWeight:'normal'}}>Verifikasi originalitas produk Illo</h3>
                                            <div className="form-group" style={{marginTop:'8px'}}>
                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Nama Pemilik Produk</label>
                                                <input onChange={this.setValue('nama')} type="text" className="form-control" placeholder="Nama" required="required" value={this.state.routeParams.nama} />
                                            </div>
                                            <div className="form-group" style={{marginTop:'8px'}}>
                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Alamat Email Pemilik Produk</label>
                                                <input onChange={this.setValue('email')} type="text" className="form-control" placeholder="Email" required="required" value={this.state.routeParams.email} />
                                            </div>
                                            <div className="form-group" style={{marginTop:'8px'}}>
                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>No Whatsapp Pemilik Produk</label>
                                                <input onChange={this.setValue('no_telepon')} type="text" className="form-control" placeholder="No Whatsapp" required="required" value={this.state.routeParams.no_telepon} />
                                            </div>
                                            <div className="form-group" style={{marginTop:'8px'}}>
                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Kode Produk</label>
                                                <input onChange={this.setValue('kode_produk')} type="text" className="form-control" placeholder="Kode Produk" required="required" value={this.state.routeParams.kode_produk} />
                                            </div>
                                            <div className="form-group" style={{marginTop:'8px'}}>
                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Kode Serial</label>
                                                <input onChange={this.setValue('kode_validasi')} type="text" className="form-control" placeholder="Kode Serial" required="required" value={this.state.routeParams.kode_validasi} />
                                                <label style={{marginBottom:'4px', marginLeft:'20px', marginTop:'16px', fontSize:'10px', fontStyle:'italic', color:'#434343'}}>
                                                    Kode serial dapat Anda dapatkan dengan menggosok kotak hologram yang ada pada kemasan illo.
                                                    <br/>Pastikan bawah kotak hologram ini masih tersegel ketika Anda menerima produk baru illo
                                                </label>
                                            </div>
                                        </div>
                                        <div className="blog-divider"></div>
                                        <button className="btn card20" style={{background:'green', color:'white'}} onClick={this.prosesVerifikasi}>
                                            <i className="f7-icons">arrow_right_circle_fill</i>&nbsp;
                                            Verifikasi Produk Illo
                                        </button>
								    </div>
                                </div>
                                <div className="col-md-4 col-lg-3 order-md-last list-sidebar">
									<div className="sidebar">
										<div className="sidebar-space">
                                            <div className="card card20" style={{marginTop:'0px', fontStyle:'italic', fontSize:'12px', textAlign:'center'}}>
                                                <i className="f7-icons" style={{fontSize:'60px', color:'#cccccc'}}>exclamationmark_circle</i>
                                                <br/>
                                                Mohon pastikan bahwa data yang Anda masukkan adalah data pembeli asli dari produk Illo yang Anda ingin verifikasi
                                                <br/>
                                                <br/>
                                                Verifikasi originalitas hanya dapat dilakukan sekali dan Anda tidak dapat melakukan verifikasi produk yang telah diverifikasi sebelumnya
                                            </div>
                                        </div>
                                    </div>
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

export default (connect(null, mapDispatchToProps)(verifikasi));
