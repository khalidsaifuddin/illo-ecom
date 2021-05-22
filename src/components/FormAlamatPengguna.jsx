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

class FormAlamatPengguna extends React.Component {

	state = {
        loading: false,
		routeParams: {
			start: 0,
			limit: 20,
            alamat_utama: 1,
            alamat_pengguna_id: this.props.match.params.alamat_pengguna_id,
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
        transaksi_record: {},
        alamat_pengguna: {
            rows: [],
            total: 0
        },
        provinsi: [],
        kabupaten: [],
        kecamatan: [],
        teks_alert: '',
        tampil_alert: false

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

        // console.log(Framework7.dialog)
        // var app = new Framework7({});
        // console.log(f7ready)
        // f7ready((f7) => {
        //     f7.dialog.alert('Component mounted');
        // })

        if(parseInt(localStorage.getItem('sudah_login')) !== 1){
            this.props.history.push('/login?redirect='+this.props.location.pathname)
            return true
        }

        this.props.getAlamatPengguna(this.state.routeParams).then((result)=>{
            if(result.payload.total > 0){

                this.setState({
                    alamat_pengguna: result.payload,
                    routeParams: {
                        ...this.state.routeParams,
                        ...result.payload.rows[0]
                    }
                })
            }
        })

        // this.props.getWilayah({id_level_wilayah: 1}).then((result)=>{
        //     this.setState({
        //         provinsi: result.payload.rows
        //     })
        // })
        
        this.props.getProvince({id_level_wilayah: 1}).then((result)=>{
            this.setState({
                provinsi: result.payload.rajaongkir.results
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

        //    if(tipe === 'kode_wilayah_provinsi'){
           if(tipe === 'province_id'){
                // this.props.getWilayah({id_level_wilayah: 2, mst_kode_wilayah: this.state.routeParams.kode_wilayah_provinsi}).then((result)=>{
                //     this.setState({
                //         kabupaten: result.payload.rows
                //     })
                // })
                
                this.props.getCity({province: this.state.routeParams.province_id}).then((result)=>{
                    this.setState({
                        kabupaten: result.payload.rajaongkir.results
                    })
                })

        //    }else if(tipe === 'kode_wilayah_kabupaten'){
           }else if(tipe === 'city_id'){
                // this.props.getWilayah({id_level_wilayah: 3, mst_kode_wilayah: this.state.routeParams.kode_wilayah_kabupaten}).then((result)=>{
                this.props.getWilayah({id_level_wilayah: 3}).then((result)=>{
                    this.setState({
                        kecamatan: result.payload.rows
                    })
                })
            }
        })
     }

     simpanKonfirmasi = () => {
        //  alert('tes')

        if(
            !this.state.routeParams.nama_penerima ||
            !this.state.routeParams.alamat_jalan ||
            !this.state.routeParams.kode_wilayah_kecamatan ||
            !this.state.routeParams.kode_wilayah_kabupaten ||
            !this.state.routeParams.kode_wilayah_provinsi
        ){
            // Alert('Mohon lengkapi semua isian sebelum melanjukan prosesnya!', 'Peringatan')
            return true
        }

        this.setState({
            loading: true
        },()=>{

            this.props.simpanAlamatPengguna(this.state.routeParams).then((result)=>{

                this.setState({
                    loading: false
                },()=>{
                    if(result.payload.sukses){
                        this.setState({
                            tampil_alert: true,
                            teks_alert: 'Alamat Pengiriman Berhasil Disimpan!'
                        })
                    }else{

                    }
                })

                // this.setState({
                //     loading: false
                // },async ()=>{
                //     if(result.payload.sukses){
                //         //berhasil
                //         const berhasil = await Confirm('Alamat Pengiriman berhasil disimpan!', 'Berhasil')

                //         if(berhasil){
                //             this.props.history.push('/AlamatPengguna')
                //         }else{

                //         }
                //     }else{
                //         //gagal
                //         const berhasil = await Confirm('Terdapat kesalahan teknis. Mohon dicoba kembali dalam beberapa saat ke depan!', 'Peringatan')
                //     }

                // })

            }).catch(()=>{

                //gagal teknis
                this.setState({
                    loading: false
                },()=>{

                })
                
                // this.setState({
                //     loading: false
                // },async ()=>{
                //     const berhasil = await Confirm('Terdapat kesalahan teknis. Mohon dicoba kembali dalam beberapa saat ke depan!', 'Peringatan')
                // })
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
									<h2 className="title"><span>{this.state.routeParams.alamat_pengguna_id ? 'Edit' : 'Tambah'} Alamat Pengiriman</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/profil">Profil</a></li>
											{/* <li className="breadcrumb-item"><a href="/AlamatPengguna">Alamat Pengiriman</a></li> */}
											<li className="breadcrumb-item"><a>Tambah Alamat</a></li>
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
                                    <div className="theme-form" style={{marginTop:'0px', padding:'16px', border:'2px dashed #cccccc', borderRadius:'20px'}}>
                                        <h4>Alamat Pengiriman</h4>
                                        <div className="form-group" style={{marginTop:'8px'}}>
                                            <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Nama Penerima</label>
                                            <input onChange={this.setValue('nama_penerima')} type="text" className="form-control" placeholder="Nama Penerima" required="required" value={this.state.routeParams.nama_penerima} />
                                        </div>
                                        <div className="form-group" style={{marginTop:'8px'}}>
                                            <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Alamat Lengkap</label>
                                            <input onChange={this.setValue('alamat_jalan')} type="text" className="form-control" placeholder="Alamat Lengkap" required="required" value={this.state.routeParams.alamat_jalan} />
                                        </div>
                                        <div className="form-group" style={{marginTop:'8px'}}>
                                            <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Kode Pos</label>
                                            <input onChange={this.setValue('kode_pos')} type="text" className="form-control" placeholder="Kode Pos" required="required" value={this.state.routeParams.kode_pos} />
                                        </div>
                                        <div className="form-group" style={{marginTop:'8px'}}>
                                            <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Desa/Kelurahan</label>
                                            <input onChange={this.setValue('desa_kelurahan')} type="text" className="form-control" placeholder="Desa/Kelurahan" required="required" value={this.state.routeParams.desa_kelurahan} />
                                        </div>
                                        <div className="form-group" style={{marginTop:'8px'}}>
                                            <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Provinsi</label>
                                            {/* <select className="form-control" placeholder="Provinsi" required="required" style={{height:'54px'}} onChange={this.setValue('kode_wilayah_provinsi')}> */}
                                            <select className="form-control" placeholder="Provinsi" required="required" style={{height:'54px'}} onChange={this.setValue('province_id')}>
                                                <option value="-">-</option>
                                                {this.state.provinsi.map((option)=>{
                                                    return (
                                                        // <option value={option.kode_wilayah}>{option.nama}</option>
                                                        <option value={option.province_id}>{option.province}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group" style={{marginTop:'8px'}}>
                                            <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Kota/Kabupaten</label>
                                            {/* <select className="form-control" placeholder="Kota/Kabupaten" required="required" style={{height:'54px'}} onChange={this.setValue('kode_wilayah_kabupaten')}> */}
                                            <select className="form-control" placeholder="Kota/Kabupaten" required="required" style={{height:'54px'}} onChange={this.setValue('city_id')}>
                                                <option value="-">-</option>
                                                {this.state.kabupaten.map((option)=>{
                                                    return (
                                                        // <option value={option.kode_wilayah}>{option.nama}</option>
                                                        <option value={option.city_id}>{option.type} {option.city_name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group" style={{marginTop:'8px'}}>
                                            <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Kecamatan</label>
                                            <select className="form-control" placeholder="Kecamatan" required="required" style={{height:'54px'}} onChange={this.setValue('kode_wilayah_kecamatan')}>
                                                <option value="-">-</option>
                                                {this.state.kecamatan.map((option)=>{
                                                    return (
                                                        <option value={option.kode_wilayah}>{option.nama}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group" style={{marginTop:'8px'}}>
                                            <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Lintang</label>
                                            <input onChange={this.setValue('lintang')} type="text" className="form-control" placeholder="Lintang" required="required" value={this.state.routeParams.lintang} />
                                        </div>
                                        <div className="form-group" style={{marginTop:'8px'}}>
                                            <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Bujur</label>
                                            <input onChange={this.setValue('bujur')} type="text" className="form-control" placeholder="Bujur" required="required" value={this.state.routeParams.bujur} />
                                        </div>
                                        <button className="btn card20" style={{background:'green', color:'white'}} onClick={this.simpanKonfirmasi}>
                                            <i className="f7-icons">floppy_disk</i>&nbsp;
                                            Simpan Alamat
                                        </button>
                                        {this.state.tampil_alert &&
                                        <div className="card card20" style={{marginBottom:'16px', background:'#81c784', color:'white'}}>
                                            <div className="row">
                                                <div className="col-md-8 col-lg-8 blog-sec">
                                                    {this.state.teks_alert}
                                                </div>
                                                <div className="col-md-4 col-lg-4 blog-sec" style={{textAlign:'right'}}>
                                                    <button className="btn" style={{background:'transparent', color:'white'}} onClick={()=>this.setState({tampil_alert:false})}>Tutup</button>
                                                    <button className="btn" style={{background:'transparent', color:'white'}} onClick={()=>this.props.history.push('/AlamatPengguna')}>Kembali ke Daftar Alamat</button>
                                                </div>
                                            </div>
                                        </div>
                                        }
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
        getAlamatPengguna: Actions.getAlamatPengguna,
        simpanAlamatPengguna: Actions.simpanAlamatPengguna,
        getWilayah: Actions.getWilayah,
        getProvince: Actions.getProvince,
        getCity: Actions.getCity
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(FormAlamatPengguna));
