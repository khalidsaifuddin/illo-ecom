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

import Modal from 'react-modal';
import BounceLoader from "react-spinners/BounceLoader";


class KonfirmasiPembayaran extends React.Component {

	state = {
        loading: false,
		routeParams: {
			start: 0,
			limit: 20,
            transaksi_id: this.props.match.params.transaksi_id,
            pengguna_id: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)
		},
		kategori_produk: {
			rows: [],
			total: 0
		},
        produk_lain: {
            rows: [],
			total: 0
        },
        keranjang: {
            rows: [],
			total: 0
        },
        barang_total: 0,
        harga_total: 0,
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

     simpanKonfirmasi = () => {
        //  alert('tes')

        if(
            !this.state.routeParams.bank_pengirim ||
            !this.state.routeParams.no_rekening_pengirim ||
            !this.state.routeParams.nama_pengirim ||
            !this.state.routeParams.jumlah_transfer
        ){
            Alert('Mohon lengkapi semua isian sebelum melanjukan prosesnya!', 'Peringatan')
            return true
        }

        this.setState({
            loading: true
        },()=>{

            this.props.simpanKonfirmasi(this.state.routeParams).then((result)=>{

                this.setState({
                    loading: false
                },async ()=>{
                    if(result.payload.sukses){
                        //berhasil
                        const berhasil = await Confirm('Konfirmasi Pembayaran berhasil disimpan!', 'Berhasil')

                        if(berhasil){
                            this.props.history.push('/pembelian')
                        }else{

                        }
                    }else{
                        //gagal
                        const berhasil = await Confirm('Terdapat kesalahan teknis. Mohon dicoba kembali dalam beberapa saat ke depan!', 'Peringatan')
                    }

                })

            }).catch(()=>{
                //gagal teknis
                this.setState({
                    loading: false
                },async ()=>{
                    const berhasil = await Confirm('Terdapat kesalahan teknis. Mohon dicoba kembali dalam beberapa saat ke depan!', 'Peringatan')
                })
            })
        })

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
									<h2 className="title"><span>Konfirmasi Pembayaran</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/pembelian">Pembelian</a></li>
											<li className="breadcrumb-item"><a>Konfirmasi Pembayaran</a></li>
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
							<h4>Konfirmasi Pembayaran untuk ID transaksi</h4>
                            <h3 style={{marginTop:'0px'}}>{this.state.transaksi_record.transaksi_id}</h3>
							<h4>Tanggal Transaksi</h4>
                            <h3 style={{marginTop:'0px'}}>{moment(this.state.transaksi_record.create_date).format('YYYY')} {this.bulan[moment(this.state.transaksi_record.create_date).format('M')-1]} {moment(this.state.transaksi_record.create_date).format('DD')}, {moment(this.state.transaksi_record.create_date).format('HH')}:{moment(this.state.transaksi_record.create_date).format('mm')}</h3>
                            {/* <div className="card card20" style={{marginTop:'16px'}}>
                                Mohon lengkapi form di bawah ini untuk konfirmasi pembayaran Anda
                            </div> */}
                            <div className="theme-form" style={{marginTop:'0px', padding:'16px', border:'2px dashed #cccccc', borderRadius:'20px'}}>
                                <h4>Rincian Pembayaran</h4>
                                <div className="form-group" style={{marginTop:'8px'}}>
                                    <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Bank Pengirim</label>
                                    <input onChange={this.setValue('bank_pengirim')} type="text" className="form-control" placeholder="Bank Pengirim" required="required" value={this.state.routeParams.bank_pengirim} />
                                </div>
                                <div className="form-group" style={{marginTop:'8px'}}>
                                    <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>No Rekening Pengirim</label>
                                    <input onChange={this.setValue('no_rekening_pengirim')} type="text" className="form-control" placeholder="No Rekening Pengirim" required="required" value={this.state.routeParams.no_rekening_pengirim} />
                                </div>
                                <div className="form-group" style={{marginTop:'8px'}}>
                                    <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Rekening Atas Nama Pengirim</label>
                                    <input onChange={this.setValue('nama_pengirim')} type="text" className="form-control" placeholder="No Rekening Pengirim" required="required" value={this.state.routeParams.nama_pengirim} />
                                </div>
                                <div className="form-group" style={{marginTop:'8px'}}>
                                    <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Jumlah yang ditransfer</label>
                                    <input onChange={this.setValue('jumlah_transfer')} type="number" className="form-control" placeholder="Jumlah yang ditransfer" required="required" value={this.state.routeParams.jumlah_transfer} />
                                </div>
                                <button className="btn card20" style={{background:'green', color:'white'}} onClick={this.simpanKonfirmasi}>
                                    <i className="f7-icons">floppy_disk</i>&nbsp;
                                    Simpan Konfirmasi
                                </button>
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
        getTransaksi: Actions.getTransaksi,
        simpanKonfirmasi: Actions.simpanKonfirmasi
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(KonfirmasiPembayaran));
