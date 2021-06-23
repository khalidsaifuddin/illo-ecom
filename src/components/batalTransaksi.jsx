import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';
import CardProdukMini from './CardProdukMini';


import Modal from 'react-modal';
import BounceLoader from "react-spinners/BounceLoader";

class batalTransaksi extends React.Component {

	state = {
        loading: false,
		routeParams: {
			start: 0,
			limit: 20,
            transaksi_id: this.props.match.params.transaksi_id,
            pengguna_id: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)
		},
        transaksi: {
            rows:[],
            total:0
        },
        transaksi_record: {
            produk_transaksi: []
        },
        teks_alert: '',
        tampil_alert: false,
        warna_alert: 'green'
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
    
    formatTanggal = (tanggal, pakai_waktu = 'Y') => {
        let bulan = [
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
        
        let tanggal_str = moment(tanggal).format('D') + ' ' + bulan[(moment(tanggal).format('M')-1)] + ' ' + moment(tanggal).format('YYYY')

        if(pakai_waktu){
            tanggal_str += ', ' + moment(tanggal).format('HH') + ':' + moment(tanggal).format('mm')
        }

        return tanggal_str
    }
	
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

    batalTransaksi = () => {
        // alert(this.state.routeParams.transaksi_id)
        this.setState({
            loading: true
        },()=>{
            this.props.batalTransaksi({
                ...this.state.routeParams,
                pengguna_id_pembatal: this.state.routeParams.pengguna_id
            }).then((result)=>{
                this.setState({
                    loading: false,
                    tampil_alert: true,
                    warna_alert: 'green',
                    teks_alert: 'Transaksi berhasil dibatalkan!'
                },()=>{
                    setTimeout(() => {
                        this.props.history.push('/Pembelian')
                    }, 1000);
                })
            }).catch(()=>{
                this.setState({
                    loading: false,
                    tampil_alert: true,
                    warna_alert: 'red',
                    teks_alert: 'Terdapat kesalahan teknis. Silakan coba kembali dalam beberapa saat ke depan!'
                },()=>{

                })
            })
        })
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
									<h2 className="title"><span>Batalkan Transaksi</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/Pembelian">Pembelian</a></li>
											<li className="breadcrumb-item"><a>Batalkan Transaksi</a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
					{/*breadcrumb end*/}

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
                            Memroses data...
                        </div>
                    </Modal>

					{/*blog Section start*/}
					<section style={{marginTop:'-70px'}}>
						<div className="container">
							<div className="row">
								<div className="col-md-12 col-lg-12 blog-sec">

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

                                    <div className="card card20" style={{border:(!JSON.parse(localStorage.getItem('user')).alamat_pengguna || JSON.parse(localStorage.getItem('user')).alamat_pengguna.length < 1 ? '1px solid red' : '1px solid #ccc')}}>
                                        <h3>Apakah Anda yakin ingin membatalkan transaksi ini?</h3>
                                        <div>ID Transaksi: <b>{this.state.transaksi_record.transaksi_id}</b></div>
                                        <div>Tanggal Transaksi: <b>{this.formatTanggal(this.state.transaksi_record.create_date)}</b></div>
                                        <div>Toko: <b>{this.state.transaksi_record.nama_mitra}</b></div>
                                        <div>Daftar Produk:</div>
                                        <div>
                                            <ul style={{listStyleType:'circle'}}>
                                                {this.state.transaksi_record.produk_transaksi.map((option)=>{
                                                    return (
                                                        <li>
                                                            {option.nama}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <br/>
                                        <div>
                                            <button className="btn card20" style={{marginLeft:'4px', background:'red', color:'white'}} onClick={this.batalTransaksi}>
                                                Ya, Batalkan Transaksi
                                            </button>
                                            <button className="btn card20" style={{marginLeft:'4px', color:'white'}} onClick={()=>this.props.history.push('/Pembelian')}>
                                                Kembali ke daftar pembelian
                                            </button>
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
		getTransaksi: Actions.getTransaksi,
        batalTransaksi: Actions.batalTransaksi
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(batalTransaksi));
