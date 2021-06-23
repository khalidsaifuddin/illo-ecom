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

// import Framework7 from 'framework7'
// import { f7ready } from 'framework7-react';

class GantiMitra extends React.Component {

	state = {
        loading: false,
		routeParams: {
			start: 0,
			limit: 20,
            pengguna_id: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)
		},
        anggota_mitra: {
            rows: [],
            total: 0
        },
        mitra_terdekat: JSON.parse(localStorage.getItem('mitra_terdekat'))
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

        this.props.getAnggotaMitra({...this.state.routeParams, pengguna_id: null}).then((result)=>{
            this.setState({
                anggota_mitra: result.payload
            })
        })

		setTimeout(function () {
			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000);
	}

    gantiMitraAktif = (option) => {

        this.props.simpanMitraAktif({
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            mitra_id: option.mitra_id
        }).then((result)=>{
            this.props.history.push('/')
        }).catch(()=>{
            
        })

        // console.log(option)

        // console.log(JSON.stringify(option))

        // localStorage.setItem('mitra_terdekat', JSON.stringify(option))
        // // this.props.history.push('/')

        // console.log(localStorage.getItem('mitra_terdekat'))

        // setTimeout(() => {
        //     this.props.history.push('/')
        // }, 1000);
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
									<h2 className="title"><span>Ganti Mitra</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/profil">Profil</a></li>
											<li className="breadcrumb-item"><a>Ganti Mitra</a></li>
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
                                    
                                    <div className="card card20" style={{width:'100%'}}>
                                        Toko Mitra aktif saat ini:
                                        <div>
                                            <b style={{fontSize:'18px'}}>{this.state.mitra_terdekat.pengguna}</b>
                                            <br/>
                                            {this.state.mitra_terdekat.jenis_mitra}&nbsp;-&nbsp;
                                            {this.state.mitra_terdekat.jenis_mitra_id === 6 && 'Indonesia'} 
                                            {this.state.mitra_terdekat.jenis_mitra_id === 5 && this.state.mitra_terdekat.provinsi} 
                                            {this.state.mitra_terdekat.jenis_mitra_id === 4 && this.state.mitra_terdekat.kabupaten} 
                                            {this.state.mitra_terdekat.jenis_mitra_id === 3 && this.state.mitra_terdekat.kecamatan}
                                        </div>
                                    </div>
                                    <div style={{marginTop:'16px', marginLeft:'16px'}}>
                                        <h4 className="blog-title">
                                            Mitra lain yang tersedia
                                        </h4>
                                    </div>
                                    {/* isinya ganti mitra */}
                                    {this.state.anggota_mitra.rows.map((option)=>{
                                        return (
                                            <div className="card card20" style={{width:'100%'}}>
                                                <div className="row">
                                                    <div className="col-md-8 col-sm-8">        
                                                        <div>
                                                            <b>{option.nama_pengguna}</b>
                                                        </div>
                                                        <div>
                                                            {option.jenis_mitra}&nbsp;-&nbsp;
                                                            {option.jenis_mitra_id === 6 && 'Indonesia'} 
                                                            {option.jenis_mitra_id === 5 && option.provinsi} 
                                                            {option.jenis_mitra_id === 4 && option.kabupaten} 
                                                            {option.jenis_mitra_id === 3 && option.kecamatan}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4" style={{textAlign:'right'}}>
                                                        <button 
                                                            onClick={()=>this.gantiMitraAktif(option)} 
                                                            className="btn btn-custom theme-color" 
                                                            style={{borderRadius:'15px'}}
                                                        >
                                                            Pilih Toko
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

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
                                                        <a href={"/Pembelian"}>
                                                            Pembelian
                                                        </a>
                                                    </li>
                                                    <li className="marg-15">
                                                        <a href={"/Penjualan"}>
                                                            Penjualan
                                                        </a>
                                                    </li>
                                                    <li className="marg-15">
                                                        <a href={"/AlamatPengguna"}>
                                                            Alamat Pengiriman
                                                        </a>
                                                    </li>
                                                    <li className="marg-15">
                                                        <a href={"/GantiMitra"}>
                                                            Ganti Mitra
                                                        </a>
                                                    </li>
                                                    <li className="marg-15">
                                                        <a href={"/VoucherDiskon"}>
                                                            Voucher Diskon
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
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getArtikel: Actions.getArtikel,
        getAnggotaMitra: Actions.getAnggotaMitra,
        simpanMitraAktif: Actions.simpanMitraAktif
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(GantiMitra));
