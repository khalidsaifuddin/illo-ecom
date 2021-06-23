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

class Checkout extends React.Component {

	state = {
        loading: false,
		routeParams: {
			start: 0,
			limit: 20,
            pengguna_id: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)
		},
        keranjang: {
            rows:[],
            total:0
        },
        diskon_aktif: localStorage.getItem('diskon_aktif') ? JSON.parse(localStorage.getItem('diskon_aktif')) : null,
        barang_total: 0,
        harga_total: 0,
        ongkos_kirim: 10000,
        teks_alert: '',
        tampil_alert: false,
        warna_alert: 'green',
        kurir_aktif: {
            costs: [{
                service: '-'
            },{
                service: '-',
                cost: [{
                    value: 0
                }]
            }]
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

        if(parseInt(localStorage.getItem('sudah_login')) !== 1){
            this.props.history.push('/login?redirect='+this.props.location.pathname)
            return true
        }

		// this.props.getKategoriProduk({...this.state.routeParams, kategori_produk_id: null}).then((result)=>{
        //     this.setState({
        //         kategori_produk: result.payload
        //     },()=>{
                // this.props.getProduk({...this.state.routeParams, produk_id: null, limit: 3, a_random: 'Y'}).then((result)=>{
                //     this.setState({
                //         produk_lain: result.payload
                //     },()=>{
                        this.props.getKeranjang(this.state.routeParams).then((result)=>{
                            this.setState({
                                keranjang: result.payload
                            },()=>{
                                let barang_total = 0
                                let harga_total = 0
                                this.state.keranjang.rows.map((option)=>{

                                    let harga = 0;

                                    option.harga_produk.map((optionHarga)=>{
                                        if(parseInt(optionHarga.jenis_harga_id) === parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)){
                                            // harga = parseFloat(optionHarga.nominal)
                                            if(!option.diskon_produk_id){
                                                harga = parseFloat(optionHarga.nominal)
                                            }else{
                                                if(option.jenis_hitung_diskon_id === 1){
                                                    harga = parseFloat(optionHarga.nominal)-(parseFloat(optionHarga.nominal)*option.persen_diskon/100)
                                                }else{
                                                    harga = 0
                                                }
                                            }
                                        }
                                    })

                                    barang_total = barang_total+parseInt(option.jumlah)
                                    harga_total = harga_total+(parseInt(option.jumlah)* (harga) )
                                })

                                this.setState({
                                    barang_total: barang_total,
                                    harga_total: harga_total
                                },()=>{

                                    console.log(JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].city_id)
                                    // console.log(JSON.parse(localStorage.getItem('mitra_terdekat')).city_id)

                                    this.props.cekOngkir({
                                        origin: JSON.parse(localStorage.getItem('mitra_terdekat')).city_id,
                                        destination: JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].city_id,
                                        weight: 1000,
                                        courier: 'jne'
                                    }).then((result)=>{
                                        // console.log(result.payload.rajaongkir.results)

                                        this.setState({
                                            kurir_aktif: result.payload.rajaongkir.results[0],
                                            ongkos_kirim: result.payload.rajaongkir.results[0].costs[1].cost[0].value
                                        },()=>{
                                            console.log(this.state.kurir_aktif)
                                        })

                                    })
                                })
                            })
                        })
                    // })
                // })
        //     })
        // })

		setTimeout(function () {
			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000);
	}

    ubahJumlah = (option) => (e) => {

        this.setState({
            produk_aktif: option,
            jumlah_aktif: e.currentTarget.value
        },()=>{

            if(this.state.jumlah_aktif > 0){

                const delayDebounceFn = setTimeout(() => {
                    // console.log(e.currentTarget.value)
                    // console.log(option)
                    
                    this.props.simpanKeranjang({...this.state.produk_aktif, jumlah: this.state.jumlah_aktif}).then((result)=>{
                        this.props.getKeranjang(this.state.routeParams).then((result)=>{
                            this.setState({
                                keranjang: result.payload
                            },()=>{
                                let barang_total = 0
                                let harga_total = 0
                                this.state.keranjang.rows.map((option)=>{
            
                                    let harga = 0;
            
                                    option.harga_produk.map((optionHarga)=>{
                                        if(parseInt(optionHarga.jenis_harga_id) === parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)){
                                            harga = parseFloat(optionHarga.nominal)
                                        }
                                    })
            
                                    barang_total = barang_total+parseInt(option.jumlah)
                                    harga_total = harga_total+(parseInt(option.jumlah)* (harga) )
                                })
            
                                this.setState({
                                    barang_total: barang_total,
                                    harga_total: harga_total
                                })
                            })
                        })
                    })
                    
                }, 1000)
        
                return () => clearTimeout(delayDebounceFn)
            }else{
                this.hapus(this.state.produk_aktif)
            }

        })
        
    }

    hapus = (option) => {
        // alert(keranjang_id)
        
        this.props.simpanKeranjang({...option, soft_delete:1}).then((result)=>{
            this.props.getKeranjang(this.state.routeParams).then((result)=>{
                this.setState({
                    keranjang: result.payload
                },()=>{
                    let barang_total = 0
                    let harga_total = 0
                    this.state.keranjang.rows.map((option)=>{

                        let harga = 0;

                        option.harga_produk.map((optionHarga)=>{
                            if(parseInt(optionHarga.jenis_harga_id) === parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)){
                                harga = parseFloat(optionHarga.nominal)
                            }
                        })

                        barang_total = barang_total+parseInt(option.jumlah)
                        harga_total = harga_total+(parseInt(option.jumlah)* (harga) )
                    })

                    this.setState({
                        barang_total: barang_total,
                        harga_total: harga_total
                    })
                })
            })
        })
    }

    lanjutPembayaran = async () => {
        // alert('okte')
        // const konfirmasi = await Confirm('Apakah Anda telah yakin ingin melanjutkan pembayaran? Mohon pastikan alamat pengiriman telah sesuai sebelum melanjutkan ke pembayaran', 'Konfirmasi')

        // if(konfirmasi){
            // alert('oke')
            this.setState({
                loading: true
            },()=>{
                this.props.simpanTransaksi({
                    ...this.state.routeParams,
                    ...JSON.parse(localStorage.getItem('mitra_terdekat')),
                    ...JSON.parse(localStorage.getItem('user')),
                    ongkos_kirim: this.state.ongkos_kirim,
                    harga_final: (parseInt(this.state.harga_total)+this.state.ongkos_kirim - (this.state.diskon_aktif ? (this.state.diskon_aktif.jenis_hitung_diskon_id === 1 ? ( this.state.harga_total * this.state.diskon_aktif.persen_diskon / 100 ) : this.state.diskon_aktif.nominal_diskon ) : 0 ) ),
                    mitra_id_pembeli: parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)
                }).then((result)=>{
                    if(result.payload.sukses){
                        //berhasil
                        localStorage.removeItem('diskon_aktif')
                        this.props.history.push('/pembayaran/'+result.payload.transaksi_id)
                    }else{
                        //gagal
                        // Alert('Ada kesalahan pada sistem. Mohon coba kembali dalam beberapa saat ke depan', 'Peringatan')
                        this.setState({
                            loading: false,
                            tampil_alert: true,
                            warna_alert: 'red',
                            teks_alert: 'Ada kesalahan pada sistem. Mohon coba kembali dalam beberapa saat ke depan'
                        })
                    }
                }).catch(()=>{
                    // Alert('Ada kesalahan pada sistem. Mohon coba kembali dalam beberapa saat ke depan', 'Peringatan')
                    this.setState({
                        loading: false,
                        tampil_alert: true,
                        warna_alert: 'red',
                        teks_alert: 'Ada kesalahan pada sistem. Mohon coba kembali dalam beberapa saat ke depan'
                    })
                })
            })
        // }else{

        // }
    }

    setDiskon = (tipe) => (e) => {
        this.setState({
            routeParams: {
                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
                kode_diskon: e.currentTarget.value
            }
        },()=>{
            console.log(this.state.routeParams)
        })
    }

    cekDiskon = () => {
        this.props.cekDiskon(this.state.routeParams).then((result)=>{
            if(result.payload.total > 0){

                if(parseInt(result.payload.rows[0].aktif) !== 1){
                    //tidak aktif
                }else{
                    //aktif

                    this.setState({
                        diskon_aktif: result.payload.rows[0]
                    },()=>{
                        localStorage.setItem('diskon_aktif', JSON.stringify(result.payload.rows[0]))
                    })

                }

            }else{
                //kode tidak ditemukan
            }
        })
    }

    hapusDiskon = () => {

        this.setState({
            diskon_aktif: null
        },()=>{
            localStorage.removeItem('diskon_aktif')
        })

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
									<h2 className="title"><span>Checkout</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/keranjang">Keranjang</a></li>
											<li className="breadcrumb-item"><a>Checkout</a></li>
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
                            Memroses transaksi...
                        </div>
                    </Modal>

					{/*blog Section start*/}
					<section style={{marginTop:'-70px'}}>
						<div className="container">
							<div className="row">
								<div className="col-md-12 col-lg-12 blog-sec">
                                    <div className="card card20" style={{border:(!JSON.parse(localStorage.getItem('user')).alamat_pengguna || JSON.parse(localStorage.getItem('user')).alamat_pengguna.length < 1 ? '1px solid red' : '1px solid #ccc')}}>
                                        <h3 style={{marginTop:'8px'}}>Alamat Pengiriman</h3>
                                        <div className="alamat_pengiriman">
                                            {JSON.parse(localStorage.getItem('user')).alamat_pengguna && JSON.parse(localStorage.getItem('user')).alamat_pengguna.length > 0 &&
                                            <div>
                                                <b>{JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].nama_penerima}</b>
                                                <br/>
                                                {JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].alamat_jalan}<br/> 
                                                {JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].kecamatan}, {JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].kabupaten}, {JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].provinsi}
                                            </div>
                                            }
                                            {!JSON.parse(localStorage.getItem('user')).alamat_pengguna || JSON.parse(localStorage.getItem('user')).alamat_pengguna.length < 1 &&
                                            <div style={{color:'red'}}>
                                                Anda belum menyimpan alamat pengiriman. Mohon isi alamat pengiriman terlebih dahulu sebelum melanjutkan transaksi
                                            </div>
                                            }
                                            <div style={{width:'100%', textAlign:'right', fontSize:'12px', paddingTop:'16px'}}>
                                                <a href="/AlamatPengguna" style={{display:'inline-flex', color:'#434343'}}>
                                                    <i className="f7-icons">pencil</i>&nbsp;Kelola Alamat Pengiriman
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card20">
                                        <h3 style={{marginTop:'8px'}}>Ongkos Kirim</h3>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6">
                                                {/* Pengiriman Standar */}
                                                {this.state.kurir_aktif.name}
                                                <br/>
                                                {this.state.kurir_aktif.costs[1].service} - {this.state.kurir_aktif.costs[1].description}
                                            </div>
                                            <div className="col-md-6 col-lg-6" style={{textAlign:'right'}}>
                                                {/* Rp {this.formatAngka(this.state.ongkos_kirim)} */}
                                                Rp {this.formatAngka(this.state.kurir_aktif.costs[1].cost[0].value)}
                                                <br/>
                                                <span style={{fontSize:'10px'}}>Estimasi {this.state.kurir_aktif.costs[1].cost[0].etd} hari</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="card card20">
                                        <h3 style={{marginTop:'8px'}}>Barang akan dikirimkan dari</h3>
                                        <div style={{display:'inline-flex', marginBottom:'16px'}}>
                                            <div style={{
                                                width:'45px', 
                                                height:'45px', 
                                                borderRadius:'50%', 
                                                background:'#434343',
                                                backgroundImage: 'url(/assets/images/illo-logo-icon.png)',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                border: '1px solid #ccc',
                                                // margin: 'auto'
                                            }}>&nbsp;</div>
                                            <div style={{marginLeft:'8px'}}>
                                                <b>{JSON.parse(localStorage.getItem('mitra_terdekat')).jenis_mitra} Illo</b>
                                                <br/>
                                                {parseInt(JSON.parse(localStorage.getItem('mitra_terdekat')).jenis_mitra_id) === 3 && <span>wilayah&nbsp;{JSON.parse(localStorage.getItem('mitra_terdekat')).kecamatan}</span>}
                                                {parseInt(JSON.parse(localStorage.getItem('mitra_terdekat')).jenis_mitra_id) === 4 && <span>wilayah&nbsp;{JSON.parse(localStorage.getItem('mitra_terdekat')).kabupaten}</span>}
                                                {parseInt(JSON.parse(localStorage.getItem('mitra_terdekat')).jenis_mitra_id) === 5 && <span>wilayah&nbsp;{JSON.parse(localStorage.getItem('mitra_terdekat')).provinsi}</span>}
                                                {parseInt(JSON.parse(localStorage.getItem('mitra_terdekat')).jenis_mitra_id) === 6 && <span>Indonesia</span>}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="card card20">

                                        <h3 style={{marginTop:'8px'}}>Daftar Barang</h3>
                                        <div className="daftar_barang_di_keranjang" style={{marginBottom:'8px'}}>
                                            {/* {this.state.keranjang.total < 1 &&
                                            <div className="card card20" style={{paddingLeft:'8px', textAlign:'center', paddingBottom:'32px', paddingTop:'32px'}}>
                                                <img src="/assets/images/keranjang.jpg" style={{width:'120px', margin:'auto'}} />
                                                <br/>
                                                <div style={{color:'#434343'}}>
                                                    Belum ada barang di keranjang Anda
                                                </div>
                                            </div>
                                            } */}
                                            {this.state.keranjang.total > 0 &&
                                            <div>
                                            {this.state.keranjang.rows.map((option)=>{

                                                let harga = 0

                                                // if(parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id) === 2){
                                                option.harga_produk.map((optionHarga)=>{
                                                    if(parseInt(optionHarga.jenis_harga_id) === parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)){
                                                        if(!option.diskon_produk_id){
                                                            harga = optionHarga.nominal
                                                        }else{
                                                            if(option.jenis_hitung_diskon_id === 1){
                                                                harga = parseFloat(optionHarga.nominal)-(parseFloat(optionHarga.nominal)*option.persen_diskon/100)
                                                            }else{
                                                                harga = 0
                                                            }
                                                        }
                                                    }
                                                })
                                                // }

                                                // console.log(parseInt(optionHarga.nominal))

                                                let total = parseInt(option.jumlah) * parseFloat(harga)

                                                console.log(total)

                                                return (
                                                    <div className="card card20" style={{paddingLeft:'8px'}}>
                                                        <div className="row">
                                                            <div className="col-md-8 col-lg-8">
                                                                
                                                                <div style={{display:'inline-flex'}}>
                                                                    <div className="gambar_produk" style={{paddingRight:'0px'}}>
                                                                        {option.gambar_produk && option.gambar_produk.length > 0 &&
                                                                        <div
                                                                            style={{
                                                                                width:'100px',
                                                                                height:'100px',
                                                                                // backgroundImage: 'url('+localStorage.getItem('api_base')+option.gambar_produk[0].nama_file+')',
                                                                                backgroundImage: 'url('+localStorage.getItem('api_base_gambar')+option.gambar_produk[0].nama_file+')',
                                                                                backgroundRepeat:'no-repeat',
                                                                                backgroundSize: 'cover',
                                                                                backgroundPosition:'center',
                                                                                borderRadius:'20px'
                                                                            }}
                                                                        >&nbsp;</div>
                                                                        }
                                                                    </div>
                                                                    <div className="keterangan_produk" style={{paddingLeft:'0px'}}>
                                                                        <div style={{margin:'8px', marginTop:'0px', marginBottom: '0px', maxHeight:'30px', overflow:'hidden', textOverflow:'ellipsis', flexFlow:'nowrap', width:'100%'}}>
                                                                            <a href={"/tampilProduk/"+option.produk_id}>
                                                                                <h3 className="title" style={{marginTop:'0px', marginBottom:'0px'}}>
                                                                                    {option.nama} {option.varian_produk_id ? <span> - {option.varian_produk}</span> : ''}
                                                                                </h3>
                                                                            </a>
                                                                        </div>
                                                                        
                                                                        <div style={{paddingLeft:'8px', fontSize:'18px', fontWeight:'500'}}>
                                                                            {/* Rp 100.000 */}
                                                                            {parseInt(localStorage.getItem('sudah_login')) !== 1 &&
                                                                            <span>
                                                                                Rp {option.harga_produk && option.harga_produk.length > 0 && this.formatAngka(option.harga_produk[0].nominal)}
                                                                            </span>
                                                                            }
                                                                        </div>
                                                                        
                                                                        <div style={{marginTop:'8px', paddingLeft:'8px', paddingRight:'0px', fontSize:'8px', fontWeight:'500', color:'#9b9b9b'}}>
                                                                            {parseInt(localStorage.getItem('sudah_login')) !== 1 &&
                                                                            <span>
                                                                                <div style={{fontSize:'18px', fontWeight:'bold'}}>
                                                                                    {option.harga_produk.map((option)=>{
                                                                                        if(parseInt(option.jenis_harga_id) === 1){
                                                                                            return (
                                                                                                <span>Rp {this.formatAngka(option.nominal)}</span>
                                                                                            )
                                                                                        }
                                                                                    })}
                                                                                </div>
                                                                                Harga retail
                                                                            </span>
                                                                            }
                                                                            {parseInt(localStorage.getItem('sudah_login')) === 1 &&
                                                                            <span>
                                                                                {option.diskon_produk_id &&
                                                                                <div>
                                                                                    <div>
                                                                                        <span>
                                                                                            {option.harga_produk.map((option)=>{
                                                                                                if(parseInt(option.jenis_harga_id) === parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)){
                                                                                                    return (
                                                                                                        <span style={{textDecoration:'line-through'}}>Rp {this.formatAngka(option.nominal)}</span>
                                                                                                    )
                                                                                                }
                                                                                            })}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div>
                                                                                        {option.jenis_hitung_diskon_id === 1 &&
                                                                                        <div>Diskon {option.persen_diskon}% ({moment(option.waktu_mulai).format('DD')} {moment(option.waktu_mulai).format('M') !== moment(option.waktu_selesai).format('M') ? moment(option.waktu_mulai).format('M') : ''} - {moment(option.waktu_selesai).format('DD')} {this.bulan[moment(option.waktu_selesai).format('M')-1]} {moment(option.waktu_selesai).format('YYYY')})</div>
                                                                                        }
                                                                                        <div style={{fontSize:'18px', fontWeight:'bold'}}>
                                                                                            <span>
                                                                                                {option.harga_produk.map((optionHarga)=>{
                                                                                                    if(parseInt(optionHarga.jenis_harga_id) === parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)){
                                                                                                        return (
                                                                                                            // <span>Rp {this.formatAngka(parseFloat(option.nominal)-(parseFloat(option.nominal)*parseFloat(option.persen_diskon)/100))}</span>
                                                                                                            <span>Rp {this.formatAngka(parseFloat(optionHarga.nominal)-(parseFloat(optionHarga.nominal)*parseFloat(option.persen_diskon)/100))}</span>
                                                                                                        )
                                                                                                    }
                                                                                                })}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                }
                                                                                {!option.diskon_produk_id &&
                                                                                <div>
                                                                                    <div>
                                                                                        {option.harga_produk.map((option)=>{
                                                                                            if(parseInt(option.jenis_harga_id) === 1){
                                                                                                return (
                                                                                                    <span style={{textDecoration:'line-through'}}>Rp {this.formatAngka(option.nominal)}</span>
                                                                                                )
                                                                                            }
                                                                                        })}
                                                                                    </div>
                                                                                    <div style={{fontSize:'18px', fontWeight:'bold'}}>
                                                                                        {/* {parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id) === 2 && */}
                                                                                        <span>
                                                                                            {option.harga_produk.map((option)=>{
                                                                                                if(parseInt(option.jenis_harga_id) === parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)){
                                                                                                    return (
                                                                                                        <span>Rp {this.formatAngka(option.nominal)}</span>
                                                                                                    )
                                                                                                }
                                                                                            })}
                                                                                        </span>
                                                                                        {/* } */}
                                                                                    </div>
                                                                                </div>
                                                                                }
                                                                                
                                                                                Harga {JSON.parse(localStorage.getItem('user')).jenis_mitra}
                                                                            </span>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-lg-4" style={{textAlign:'right'}}>
                                                                Jumlah: {option.jumlah} 
                                                                <br/>
                                                                {/* Total:<br/> */}
                                                                <div style={{fontSize:'18px', fontWeight:'bold'}}>
                                                                    Rp {total > 0 ? this.formatAngka(total) : '0'}
                                                                </div>
                                                                {/* <input 
                                                                    type="number" 
                                                                    className="form-control" 
                                                                    placeholder="Jumlah" 
                                                                    onChange={this.ubahJumlah(option)} 
                                                                    defaultValue={option.jumlah} 
                                                                    style={{textAlign:'right'}} 
                                                                />
                                                                <button 
                                                                    onClick={()=>this.hapus(option)} 
                                                                    className="btn" 
                                                                    style={{
                                                                        borderRadius:'15px', 
                                                                        background:'white', 
                                                                        color:'#434343',
                                                                        marginTop:'8px'
                                                                    }}
                                                                >
                                                                    <i className="f7-icons" style={{fontWeight:'bold'}}>trash</i>&nbsp;
                                                                    Hapus
                                                                </button> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            </div>
                                            }

                                            {this.state.keranjang.total < 1 &&
                                            <div>
                                                <button onClick={()=>this.props.history.push('/produk/semua')} style={{marginTop:'16px'}} className="btn btn-custom btn-block theme-color" >
                                                    Belanja Sekarang
                                                </button>
                                            </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="card card20">
                                        <h3 style={{marginTop:'8px'}}>Diskon</h3>
                                        <input 
                                            onChange={this.setDiskon('kode_diskon')} 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Diskon" 
                                            value={this.state.routeParams.kode_diskon} 
                                        />
                                        <button onClick={this.cekDiskon} style={{marginTop:'16px', width:'180px'}} className="btn btn-custom theme-color" >
                                            <i className="f7-icons">search</i>&nbsp;
                                            Cek Diskon
                                        </button>
                                        {this.state.diskon_aktif &&
                                        <div className="card card20" style={{border:'2px dashed #7f7f7f'}}>
                                            <div className="row">
                                                <div className="col-md-6 col-lg-6">
                                                    <div style={{fontSize:'10px'}}>{this.state.diskon_aktif.keterangan}</div>
                                                    <div>{this.state.diskon_aktif.kode_diskon}</div>
                                                </div>
                                                <div className="col-md-6 col-lg-6" style={{textAlign: 'right'}}>
                                                    <div>
                                                        {this.state.diskon_aktif.jenis_hitung_diskon_id === 1 && 
                                                        <div style={{fontWeight:'bold'}}>
                                                            Potongan {this.state.diskon_aktif.persen_diskon}%
                                                        </div>
                                                        }
                                                        {this.state.diskon_aktif.jenis_hitung_diskon_id === 2 && 
                                                        <div style={{fontWeight:'bold'}}>
                                                            Potongan Rp {this.formatAngka(this.state.diskon_aktif.nominal_diskon)}
                                                        </div>
                                                        }
                                                        <div>
                                                            <a style={{color:'#434343', fontSize:'10px', cursor: 'pointer'}} onClick={this.hapusDiskon}>Hapus</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>

                                    {this.state.keranjang.total > 0 &&
                                    <div className="card card20">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6">
                                                        Jumlah Barang Total
                                                    </div>
                                                    <div className="col-md-6 col-lg-6" style={{textAlign:'right'}}>
                                                        {this.state.barang_total}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-lg-12">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6">
                                                        Sub Total
                                                    </div>
                                                    <div className="col-md-6 col-lg-6" style={{textAlign:'right', fontWeight:'normal'}}>
                                                        Rp {this.formatAngka(this.state.harga_total)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-lg-12">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6">
                                                        Ongkos Kirim
                                                    </div>
                                                    <div className="col-md-6 col-lg-6" style={{textAlign:'right', fontWeight:'normal'}}>
                                                        Rp {this.formatAngka(this.state.ongkos_kirim)}
                                                    </div>
                                                </div>
                                            </div>
                                            {this.state.diskon_aktif &&
                                            <div className="col-md-12 col-lg-12">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6" style={{color:'#11940F'}}>
                                                        Diskon {this.state.diskon_aktif.jenis_hitung_diskon_id === 1 && <span>{this.state.diskon_aktif.persen_diskon}%</span>}
                                                    </div>
                                                    <div className="col-md-6 col-lg-6" style={{textAlign:'right', fontWeight:'normal', color:'#11940F'}}>
                                                        - Rp {this.state.diskon_aktif.jenis_hitung_diskon_id === 1 ? this.formatAngka( ( this.state.harga_total * this.state.diskon_aktif.persen_diskon / 100 ) ) : this.formatAngka(this.state.diskon_aktif.nominal_diskon)}
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            <div className="col-md-12 col-lg-12">
                                                <br/>
                                                <div className="row">
                                                    <div className="col-sm-6 col-md-6 col-lg-6 blog-sec">
                                                        Total
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-lg-6 blog-sec" style={{textAlign:'right', fontWeight:'bold'}}>
                                                        Rp {this.formatAngka( (parseInt(this.state.harga_total)+this.state.ongkos_kirim - (this.state.diskon_aktif ? (this.state.diskon_aktif.jenis_hitung_diskon_id === 1 ? ( this.state.harga_total * this.state.diskon_aktif.persen_diskon / 100 ) : this.state.diskon_aktif.nominal_diskon ) : 0 ) ) )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                    {this.state.keranjang.total > 0 &&
                                    <div style={{width:'100%', textAlign:'right'}}>
                                        <button onClick={this.lanjutPembayaran} style={{marginTop:'16px'}} className="btn btn-custom theme-color" >
                                            <i className="f7-icons">arrow_right</i>&nbsp;
                                            Lanjutkan ke Pembayaran
                                        </button>
                                    </div>
                                    }
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
        getProduk: Actions.getProduk,
        getKategoriProduk: Actions.getKategoriProduk,
        getKeranjang: Actions.getKeranjang,
        simpanKeranjang: Actions.simpanKeranjang,
        simpanTransaksi: Actions.simpanTransaksi,
        cekDiskon: Actions.cekDiskon,
        cekOngkir: Actions.cekOngkir
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(Checkout));
