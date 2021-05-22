import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';
// import { Alert } from 'react-st-modal';
import Modal from 'react-modal';
import BounceLoader from "react-spinners/BounceLoader";

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
        loading: false,
		record_artikel: {},
        teks_alert: '',
        tampil_alert: false,
        warna_alert: 'green'
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
            !this.state.routeParams.kode_verifikasi
        ){
            // Alert('Mohon lengkapi semua isian sebelum melanjutkan proses!', 'Peringatan')
            this.setState({
                tampil_alert: true,
                warna_alert: 'red',
                teks_alert: 'Mohon lengkapi semua isian sebelum melanjutkan proses!'
            })
            return true
        }

        this.setState({
            loading: true
        },()=>{
            this.props.verifikasi(this.state.routeParams).then((result)=>{

                console.log(result.payload)

                if(result.payload.length > 0){
                    //ketemu
                    if(result.payload[0].kode_validasi_pengguna_id !== null){
                        //sudah pernah didaftarkan

                        if((result.payload[0].email === this.state.routeParams.email) && (result.payload[0].no_telepon === this.state.routeParams.no_telepon)){
                            //recheck
                            this.props.history.push('/hasilVerifikasi/'+result.payload[0].kode_validasi_pengguna_id)
                        }else{
                            this.setState({
                                loading: false,
                                tampil_alert: true,
                                warna_alert: 'red',
                                teks_alert: 'Kode Verifikasi pernah didaftarkan sebelumnya! Anda tidak dapat memverifikasi kode yang sama dua kali atau lebih'
                            })
                        }

                    }else{
                        //belum pernah didaftarkan
                        // this.setState({
                        //     loading: false,
                        //     tampil_alert: true,
                        //     warna_alert: 'green',
                        //     teks_alert: 'Kode Verifikasi Ditemukan!'
                        // })

                        this.props.simpanVerifikasiPengguna(this.state.routeParams).then((result)=>{
                            if(result.payload.sukses){
                                //berhasil
                                this.setState({
                                    loading: true
                                },()=>{
                                    this.props.history.push('/hasilVerifikasi/'+result.payload.kode_validasi_pengguna_id)
                                })

                            }else{
                                //gagal
                                this.setState({
                                    loading: false,
                                    tampil_alert: true,
                                    warna_alert: 'red',
                                    teks_alert: 'Ada kesalahan teknis. Silakan coba kembali dalam beberapa waktu ke depan!'
                                })
                            }
                        }).catch(()=>{
                            this.setState({
                                loading: false,
                                tampil_alert: true,
                                warna_alert: 'red',
                                teks_alert: 'Ada kesalahan teknis. Silakan coba kembali dalam beberapa waktu ke depan!'
                            })
                        })

                    }

                }else{
                    //nggak ketemu
                    this.setState({
                        loading: false,
                        tampil_alert: true,
                        warna_alert: 'red',
                        teks_alert: 'Kode Verifikasi Tidak Ditemukan! Silakan coba kembali dan pastikan tidak ada kesalahan ketik'
                    })
                }

            }).catch(()=>{
                this.setState({
                    loading: false,
                    tampil_alert: true,
                    warna_alert: 'red',
                    teks_alert: 'Ada kesalahan teknis. Silakan coba kembali dalam beberapa waktu ke depan!'
                })
            })
        })
        
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

                    <Modal
                        isOpen={this.state.loading}
                        contentLabel=""
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
                            Memverifikasi produk...
                        </div>
                    </Modal>

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
                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Kode Verifikasi</label>
                                                <input onChange={this.setValue('kode_verifikasi')} type="text" className="form-control" placeholder="Kode Verifikasi" required="required" value={this.state.routeParams.kode_validasi} />
                                                <label style={{marginBottom:'4px', marginLeft:'20px', marginTop:'16px', fontSize:'10px', fontStyle:'italic', color:'#434343'}}>
                                                    Kode verifikasi dapat Anda dapatkan pada stiker yang menempel pada botol produk illo.
                                                    <br/>Pastikan bahwa kotak kemasan produk illo masih tersegel ketika Anda menerima produk baru illo
                                                </label>
                                            </div>
                                        </div>
                                        <div className="blog-divider"></div>
                                        <button className="btn card20" style={{background:'green', color:'white'}} onClick={this.prosesVerifikasi}>
                                            <i className="f7-icons">arrow_right_circle_fill</i>&nbsp;
                                            Verifikasi Produk Illo
                                        </button>
                                        {this.state.tampil_alert &&
                                        <div className="card card20" style={{padding:'16px', marginBottom:'16px', background:(this.state.warna_alert === 'green' ? '#81c784' : 'red'), color:'white'}}>
                                            <div className="row">
                                                <div className="col-md-8 col-lg-8 blog-sec">
                                                    {this.state.teks_alert}
                                                </div>
                                                <div className="col-md-4 col-lg-4 blog-sec" style={{textAlign:'right'}}>
                                                    <button className="btn" style={{background:'transparent', color:'white'}} onClick={()=>this.setState({tampil_alert:false})}>Tutup</button>
                                                </div>
                                            </div>
                                        </div>
                                        }
								    </div>
                                </div>
                                <div className="col-md-4 col-lg-3 order-md-last list-sidebar">
									<div className="sidebar">
										<div className="sidebar-space">
                                            <div className="card card20" style={{marginTop:'0px', fontStyle:'normal', fontSize:'12px', textAlign:'center', paddingBottom:'32px'}}>
                                                <i className="f7-icons" style={{fontSize:'60px', color:'#f57f17'}}>exclamationmark_circle</i>
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
		getArtikel: Actions.getArtikel,
        verifikasi: Actions.verifikasi,
        simpanVerifikasiPengguna: Actions.simpanVerifikasiPengguna
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(verifikasi));
