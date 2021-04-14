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

class Pembelian extends React.Component {

	state = {
        loading: false,
		routeParams: {
			start: 0,
			limit: 20,
            status_transaksi: 'semua',
            status_transaksi_teks: 'Semua',
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

    gantiStatus = (tipe, teks) => {
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                status_transaksi: tipe,
                status_transaksi_teks: teks
            }
        },()=>{
            this.props.getTransaksi(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false,
                    transaksi: result.payload,
                    transaksi_record: result.payload.total > 0 ? result.payload.rows[0] : {}
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
                    Memuat...
                </div>
                </Modal>
				{/*blog right Section start*/}
				<div className="page-margin">
					{/*breadcrumb start*/}
					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
								<div className="col-md-6 col-sm-6 col-text-center d-align-center">
									<h2 className="title"><span>Pembelian</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a>Pembelian</a></li>
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
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('semua', 'Semua')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.routeParams.status_transaksi === 'semua' ? '#eeffd8' : 'white'),
                                                    border: (this.state.routeParams.status_transaksi === 'semua' ? '1px solid green' : '1px solid #ccc'    )
                                                }}
                                                >
                                                    Semua
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('menunggu_pembayaran', 'Menunggu Pembayaran')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.routeParams.status_transaksi === 'menunggu_pembayaran' ? '#eeffd8' : 'white'),
                                                    border: (this.state.routeParams.status_transaksi === 'menunggu_pembayaran' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Menunggu Pembayaran
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('menunggu_verifikasi', 'Menunggu Verifikasi')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.routeParams.status_transaksi === 'menunggu_verifikasi' ? '#eeffd8' : 'white'),
                                                    border: (this.state.routeParams.status_transaksi === 'menunggu_verifikasi' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Menunggu Verifikasi
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('diproses', 'Diproses')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.routeParams.status_transaksi === 'diproses' ? '#eeffd8' : 'white'),
                                                    border: (this.state.routeParams.status_transaksi === 'diproses' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Diproses
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('dikirim', 'Dikirim')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.routeParams.status_transaksi === 'dikirim' ? '#eeffd8' : 'white'),
                                                    border: (this.state.routeParams.status_transaksi === 'dikirim' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Dikirim
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('diterima', 'Diterima')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.routeParams.status_transaksi === 'diterima' ? '#eeffd8' : 'white'),
                                                    border: (this.state.routeParams.status_transaksi === 'diterima' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Diterima
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('selesai', 'Selesai')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.routeParams.status_transaksi === 'selesai' ? '#eeffd8' : 'white'),
                                                    border: (this.state.routeParams.status_transaksi === 'selesai' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Selesai
                                                </div>
                                            </a>
                                            <a style={{width:'100px',marginRight:'24px', cursor:'pointer'}} onClick={()=>this.gantiStatus('dikomplain', 'Dikomplain')}>
                                                <div
                                                className="card"
                                                style={{
                                                    minWidth:'120px',
                                                    minHeight:'60px',
                                                    marginBottom:'16px',
                                                    textAlign:'center',
                                                    padding:'8px',
                                                    fontSize:'12px',
                                                    background: (this.state.routeParams.status_transaksi === 'dikomplain' ? '#eeffd8' : 'white'),
                                                    border: (this.state.routeParams.status_transaksi === 'dikomplain' ? '1px solid green' : '1px solid #ccc')
                                                }}
                                                >
                                                    Dikomplain
                                                </div>
                                            </a>
                                        </div>

                                        <h3>Daftar Transaksi ({this.state.routeParams.status_transaksi_teks})</h3>
                                        
                                        {this.state.transaksi.rows.map((option)=>{
                                            return (
                                                <div className="card card20">
                                                    {/* {option.transaksi_id} */}
                                                    <div style={{display:'inline-flex'}}>
                                                        <i className="f7-icons" style={{fontSize:'40px'}}>bag_fill</i>
                                                        <div style={{minWidth:'50%', paddingLeft:'8px'}}>
                                                            <div>{moment(option.create_date).format('DD') + ' ' + this.bulan[(moment(option.create_date).format('M')-1)] + ' ' + moment(option.create_date).format('YYYY') + ', ' + moment(option.create_date).format('HH') + ':' + moment(option.create_date).format('mm')}</div>
                                                            <div style={{fontSize:'10px'}}>
                                                                {option.produk_transaksi.length} Produk
                                                            </div>
                                                            {/* <div style={{fontSize:'10px'}}>{moment(option.create_date).format('DD') + ' ' + this.bulan[(moment(option.create_date).format('M')-1)] + ' ' + moment(option.create_date).format('YYYY') + ', ' + moment(option.create_date).format('HH') + ':' + moment(option.create_date).format('mm')}</div> */}
                                                        </div>
                                                        <div style={{textAlign:'right', width:'100%'}}>
                                                            {/* <div>
                                                                {parseInt(option.status_pembayaran_id) === 0 &&
                                                                <div>
                                                                    <span>Menunggu Pembayaran</span><br/>
                                                                    <span style={{fontSize:'10px'}}>Batas pembayaran maksimal: {moment(option.batas_pembayaran).format('D')} {this.bulan[moment(option.batas_pembayaran).format('M')-1]} {moment(option.batas_pembayaran).format('YYYY')}, {moment(option.batas_pembayaran).format('HH')}:{moment(option.batas_pembayaran).format('mm')}</span>
                                                                </div>
                                                                }
                                                            </div>
                                                            <div>
                                                                {parseInt(option.status_pembayaran_id) === 1 && parseInt(option.status_konfirmasi_id) === 0 &&
                                                                <span>Menunggu Verifikasi</span>
                                                                }
                                                            </div>
                                                            <div>
                                                                {parseInt(option.status_konfirmasi_id) === 1 &&
                                                                <span>Diproses</span>
                                                                }
                                                            </div> */}
                                                            <div style={{width:'100%', textAlign:'right', display:'inline-flex', border:'0px dashed #ccc', padding:'8px', justifyContent:'flex-end'}}>
                                                                <div style={{textAlign:'center', marginRight:'8px'}}>
                                                                    {parseInt(option.status_pembayaran_id) === 0 && <i className="f7-icons" style={{color:'gray'}}>circle</i>}
                                                                    {parseInt(option.status_pembayaran_id) !== 0 && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                                                    <div style={{fontSize:'10px'}}>Dibayar</div>
                                                                </div>
                                                                <div style={{textAlign:'center', marginRight:'8px'}}>
                                                                    {parseInt(option.status_konfirmasi_id) === 0 && <i className="f7-icons" style={{color:'gray'}}>circle</i>}
                                                                    {parseInt(option.status_konfirmasi_id) !== 0 && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                                                    <div style={{fontSize:'10px'}}>Diverifikasi</div>
                                                                </div>
                                                                <div style={{textAlign:'center', marginRight:'8px'}}>
                                                                    {parseInt(option.status_konfirmasi_id) !== 1 && <i className="f7-icons" style={{color:'gray'}}>circle</i>}
                                                                    {parseInt(option.status_konfirmasi_id) === 1 && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                                                    <div style={{fontSize:'10px'}}>Diproses</div>
                                                                </div>
                                                                <div style={{textAlign:'center', marginRight:'8px'}}>
                                                                    {parseInt(option.status_pengiriman_id) !== 1 && <i className="f7-icons" style={{color:'gray'}}>circle</i>}
                                                                    {parseInt(option.status_pengiriman_id) === 1 && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                                                    <div style={{fontSize:'10px'}}>Dikirim</div>
                                                                </div>
                                                                <div style={{textAlign:'center', marginRight:'8px'}}>
                                                                    {parseInt(option.status_diterima_id) !== 1 && <i className="f7-icons" style={{color:'gray'}}>circle</i>}
                                                                    {parseInt(option.status_diterima_id) === 1 && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                                                    <div style={{fontSize:'10px'}}>Diterima</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{fontSize:'12px', marginTop: '8px', marginLeft:'4px'}}>
                                                        {option.produk_transaksi.length > 0 &&
                                                        <div className="produkPertama" style={{display:'inline-flex'}}>
                                                            <div style={{
                                                                width:'40px',
                                                                height:'40px',
                                                                border:'1px solid #eee',
                                                                background:'#4f4f4f',
                                                                backgroundImage: 'url('+localStorage.getItem('api_base')+option.produk_transaksi[0].gambar_produk+')',
                                                                backgroundSize:'cover',
                                                                backgroundPosition:'center',
                                                                backgroundRepeat:'no-repeat'
                                                            }}>&nbsp;</div>
                                                            <div style={{marginLeft:'4px'}}>
                                                                {option.produk_transaksi[0].nama} {option.produk_transaksi[0].varian_produk_id ? <span> - {option.produk_transaksi[0].varian_produk}</span> : ''}
                                                                <br/>
                                                                {option.produk_transaksi[0].jumlah} pcs
                                                            </div>
                                                            <div>
                                                            
                                                            </div>
                                                        </div>
                                                        }
                                                        <div style={{fontSize:'10px', marginTop: '8px', marginLeft:'4px'}}>
                                                            Total Belanja
                                                        </div>
                                                        <div style={{fontSize:'20px', marginTop: '0px', marginLeft:'4px', fontWeight:'bold'}}>
                                                            Rp {this.formatAngka(parseInt(option.total_nominal)+parseInt(option.ongkos_kirim))}
                                                        </div>
                                                    </div>
                                                    <div style={{width:'100%', textAlign:'right', fontSize:'12px', marginTop: '8px', marginLeft:'4px'}}>
                                                        <div style={{width:'100%'}}>
                                                            {parseInt(option.status_pembayaran_id) === 0 &&
                                                            <button className="btn card20" style={{background:'green', color:'white'}} onClick={()=>this.props.history.push('/KonfirmasiPembayaran/'+option.transaksi_id)}>
                                                                Konfirmasi Pembayaran
                                                            </button>
                                                            }
                                                            <button className="btn card20" style={{marginLeft:'4px', background:'#039be5', color:'white'}} onClick={()=>this.props.history.push('/Pembayaran/'+option.transaksi_id)}>
                                                                Detail Transaksi
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}


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

export default (connect(null, mapDispatchToProps)(Pembelian));
