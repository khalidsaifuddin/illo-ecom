import React from 'react';

import Navbar from '../components/navbar';
import {withRouter, browserRouter} from 'react-router';
// import { useHistory } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';
import CardProduk from './CardProduk';
import CardProdukMini from './CardProdukMini';
import { Alert, Confirm } from 'react-st-modal';

import DatePicker from 'react-date-picker';

import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

import Modal from 'react-modal';


class profil extends React.Component {
	state = {
		routeParams: {
			start: 0,
			limit: 20,
            ...JSON.parse(localStorage.getItem('user'))
		},
		pengguna: JSON.parse(localStorage.getItem('user')),
        date_value: new Date()
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

	formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
	
	componentDidMount() {
        
        // console.log(this.props.match.params)

        this.props.getPengguna({
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
        }).then((result)=>{
            this.setState({
                pengguna: result.payload.total > 0 ? result.payload.rows[0] : this.state.pengguna,
                routeParams: {
                    ...this.state.routeParams,
                    ...result.payload.rows[0]
                }
            },()=>{
                console.log(this.state.routeParams)
            })
        })

		

		setTimeout(function () {
			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000);
	}

	gantiGambar = (nama_file) => {
		this.setState({
			gambar_utama: nama_file
		})
	}
	
	gantiVarian = (varian_produk_id) => {
		this.setState({
			routeParams: {
				...this.state.routeParams,
				varian_produk_id: varian_produk_id
			}
		})
	}

	ubahJumlah = (e) => {
		// console.log(e.currentTarget.value)
		if(e.currentTarget.value < 0){
			// alert('Jumlah tidak bisa kurang dari 0!')
			const result = Alert('Jumlah pembelian tidak bisa kurang dari 0!', 'Peringatan');
			
			this.setState({
				routeParams: {
					...this.state.routeParams,
					jumlah: 0
				}
			},()=>{
				return true
			})
		}else{

			this.setState({
				routeParams: {
					...this.state.routeParams,
					jumlah: e.currentTarget.value
				}
			})
		}

	}

	beli = () => {
		// alert(produk_id)
		if(parseInt(localStorage.getItem('sudah_login')) === 1){
			//sudah login
			alert('sudah login')
		}else{

			//belum login. arahkan ke halaman login/daftar
			// console.log(this.props.location)
			this.props.history.push('/login?redirect='+this.props.location.pathname)
			// console.log(this.props.history)
			// const history = useHistory()
			// history.push("/login")
			// window.location.href('/login')
			// alert('belum login bos')
			// useHistory.push('/login')
			// console.log(useHistory)
		}
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

    gantiSelect = (tipe) => (e) => {
  
        this.setState({
           routeParams: {
              ...this.state.routeParams,
              [tipe]: e.currentTarget.value
           }
        },()=>{
           console.log(this.state.routeParams)
        })
     }

    simpan = () => {
        this.setState({
            loading: true
        },()=>{
            this.props.simpanPenggunaBaru(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false
                },()=>{
                    Alert('Berhasil menyimpan data', 'Berhasil')
                    localStorage.setItem('user', JSON.stringify(result.payload.rows[0]))
                })
            })
        })
    }

    onChange = () => {
        Alert('tes')
    }

    keluar = () => {
        localStorage.setItem('sudah_login', '0');
        localStorage.setItem('user', '');
        localStorage.setItem('token', '');

        window.location.href="/";
    }

	render() {
		return (
			<div>
				<Navbar />
				{/*blog right Section start*/}
                <Modal
                  isOpen={this.state.loading}
                  // onAfterOpen={afterOpenModal}
                  // onRequestClose={closeModal}
                  // style={customStyles}
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
                     Memuat...
                  </div>
               </Modal>
                <div className="page-margin">
					{/*breadcrumb start*/}
					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
								<div className="col-md-6 col-sm-6 col-text-center d-align-center">
									<h2 className="title"><span>{JSON.parse(localStorage.getItem('user')).nama}</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item active"><a href={null}>
                                                Profil {JSON.parse(localStorage.getItem('user')).nama}
                                            </a></li>
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
								<div className="col-md-8 col-lg-9 blog-sec">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-3 col-lg-3">
                                            
                                            <div style={{
                                                width:'150px', 
                                                height:'150px', 
                                                borderRadius:'50%', 
                                                background:'#434343',
                                                backgroundImage: 'url('+(this.state.routeParams.gambar ? this.state.routeParams.gambar : '/assets/images/boy.jpg')+')',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                border: '1px solid #ccc',
                                                margin: 'auto'
                                            }}>&nbsp;</div>
                                            <div style={{width:'100%', textAlign:'center', marginTop:'8px'}}>
                                                <b>Keanggotaan</b>
                                            </div>
                                            <div className={(parseInt(this.state.routeParams.jenis_mitra_id) === 2 ? "divAnggotaPriv" : (parseInt(this.state.routeParams.jenis_mitra_id) === 3 ? "divAnggotaReseller" : (parseInt(this.state.routeParams.jenis_mitra_id) === 4 ? "divAnggotaAgen" : (parseInt(this.state.routeParams.jenis_mitra_id) === 5 ? "divAnggotaDistributor" : "divAnggotaPriv"))))}>
                                                {this.state.routeParams.jenis_mitra}
                                            </div>
                                            {/* <div style={{width:'100%', textAlign:'center', marginTop:'16px'}}>
                                                <button onClick={()=>this.simpan()} className="btn btn-custom theme-color">
                                                    <i className="f7-icons">floppy_disk</i>&nbsp;
                                                    Simpan
                                                </button>
                                            </div> */}
                                        </div>
                                        <div className="col-sm-12 col-md-9 col-lg-9">
                                            <div className="or-saparator"><span>Identitas Utama</span></div>
                                            <div className="theme-form" style={{marginTop:'0px'}}>
                                                <div className="form-group">
                                                    <div className="md-fgrup-margin">
                                                        <input disabled={true} defaultValue={this.state.routeParams.username} onChange={this.setValue('username')} type="text" className="form-control" placeholder="Email" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="md-fgrup-margin">
                                                        <input disabled={true} defaultValue={this.state.routeParams.no_hp} onChange={this.setValue('no_hp')} type="text" className="form-control" placeholder="No Whatsapp" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="md-fgrup-margin">
                                                        <input value={this.state.routeParams.nama} onChange={this.setValue('nama')} type="text" className="form-control" placeholder="Nama" />
                                                    </div>
                                                </div>
                                                {/* <div className="form-group">
                                                    <div className="md-fgrup-margin">
                                                        <input value={this.state.routeParams.tempat_lahir} onChange={this.setValue('tempat_lahir')} type="text" className="form-control" placeholder="Tempat Lahir" />
                                                    </div>
                                                </div> */}
                                                {/* <div className="form-group">
                                                    <div className="md-fgrup-margin">
                                                        <input value={this.state.routeParams.tanggal_lahir} onChange={this.setValue('tanggal_lahir')} type="text" className="form-control" placeholder="Tanggal Lahir" />
                                                        
                                                    </div>
                                                </div> */}
                                                <div className="form-group">
                                                    <select value={this.state.routeParams.jenis_kelamin} onChange={this.gantiSelect('jenis_kelamin')} name="jenis_kelamin" id="jenis_kelamin" className="form-control" style={{minHeight:'45px'}}>
                                                        <option value="" disabled selected={(this.state.routeParams.jenis_kelamin ? false : true)}>Jenis Kelamin</option>
                                                        <option value="L">Laki-laki</option>
                                                        <option value="P">Perempuan</option>
                                                    </select>
                                                </div>
                                                {/* <div className="form-group">
                                                    <div className="md-fgrup-margin">
                                                        <input value={this.state.routeParams.jenis_kelamin} onChange={this.setValue('jenis_kelamin')} type="text" className="form-control" placeholder="Jenis kelamin" />
                                                    </div>
                                                </div> */}
                                                <div className="form-button text-right">
                                                    <button onClick={()=>this.simpan()} className="btn btn-custom theme-color">
                                                        <i className="f7-icons">floppy_disk</i>&nbsp;
                                                        Simpan Perubahan
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="or-saparator" style={{marginTop:'16px'}}><span>Alamat Pengiriman</span></div>
                                            <br/>
                                            <div className="form-control" style={{paddingLeft:'32px', paddingRight:'32px', borderRadius:'20px'}}>
                                                {this.state.routeParams.alamat_pengguna && this.state.routeParams.alamat_pengguna.length > 0 &&
                                                <div>
                                                    Nama Penerima: <b>{this.state.routeParams.alamat_pengguna[0].nama_penerima}</b>
                                                    <br/>
                                                    {this.state.routeParams.alamat_pengguna[0].alamat_jalan}<br/> 
                                                    {this.state.routeParams.alamat_pengguna[0].kecamatan}, {this.state.routeParams.alamat_pengguna[0].kabupaten}, {this.state.routeParams.alamat_pengguna[0].provinsi}
                                                </div>
                                                }
                                            </div>
                                            <div style={{width:'100%', textAlign:'right', fontSize:'12px', paddingTop:'16px'}}>
                                                <a href="/AlamatPengguna" style={{display:'inline-flex', color:'#434343'}}>
                                                    <i className="f7-icons">pencil</i>&nbsp;Kelola Alamat Pengiriman
                                                </a>
                                            </div>
                                        </div>
                                    </div>
								</div>
								<div className="col-md-4 col-lg-3 order-md-last list-sidebar">
									<div className="sidebar">
										<div className="sidebar-space">
											<h4 className="blog-title">Menu Pengguna</h4>
											<div className="blog-divider"></div>
											<div className="blog-cat-detail">
												<ul>
                                                    <li className="marg-15">
                                                        <a href={"http://app.illo.biz.id"} target="_blank">
                                                            Member Area
                                                        </a>
                                                    </li>
                                                    <li className="marg-15">
                                                        <a href={"/Keanggotaan"}>
                                                            Keanggotaan
                                                        </a>
                                                    </li>
                                                    <li className="marg-15">
                                                        <a href={"/GantiPassword"}>
                                                            Ganti Password
                                                        </a>
                                                    </li>
                                                    <li className="marg-15">
                                                        <a href={"/AlamatPengguna"}>
                                                            Alamat Pengiriman
                                                        </a>
                                                    </li>
                                                    <li className="marg-15">
                                                        <a onClick={this.keluar} style={{cursor:'pointer'}}>
                                                            Keluar
                                                        </a>
                                                    </li>
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
        getPengguna: Actions.getPengguna,
        simpanPenggunaBaru: Actions.simpanPenggunaBaru
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(profil));
