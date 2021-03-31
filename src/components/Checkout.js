import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';
import CardProdukMini from './CardProdukMini';

class Checkout extends React.Component {

	state = {
		routeParams: {
			start: 0,
			limit: 20,
            pengguna_id: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)
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

		this.props.getKategoriProduk({...this.state.routeParams, kategori_produk_id: null}).then((result)=>{
            this.setState({
                kategori_produk: result.payload
            },()=>{
                this.props.getProduk({...this.state.routeParams, produk_id: null, limit: 3, a_random: 'Y'}).then((result)=>{
                    this.setState({
                        produk_lain: result.payload
                    },()=>{
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
                })
            })
        })

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

    checkout = () => {
        alert('okte')
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
									<h2 className="title"><span>Keranjang</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/produk/semua">Keranjang</a></li>
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
                                            wilayah&nbsp;
                                            {parseInt(JSON.parse(localStorage.getItem('mitra_terdekat')).jenis_mitra_id) === 3 && <span>{JSON.parse(localStorage.getItem('mitra_terdekat')).kecamatan}</span>}
                                            {parseInt(JSON.parse(localStorage.getItem('mitra_terdekat')).jenis_mitra_id) === 4 && <span>{JSON.parse(localStorage.getItem('mitra_terdekat')).kabupaten}</span>}
                                            {parseInt(JSON.parse(localStorage.getItem('mitra_terdekat')).jenis_mitra_id) === 5 && <span>{JSON.parse(localStorage.getItem('mitra_terdekat')).provinsi}</span>}
                                        </div>
                                    </div>
                                    <div className="daftar_barang_di_keranjang">
                                        {this.state.keranjang.total < 1 &&
                                        <div className="card card20" style={{paddingLeft:'8px', textAlign:'center', paddingBottom:'32px', paddingTop:'32px'}}>
                                            <img src="./assets/images/keranjang.jpg" style={{width:'120px', margin:'auto'}} />
                                            <br/>
                                            <div style={{color:'#434343'}}>
                                                Belum ada barang di keranjang Anda
                                            </div>
                                        </div>
                                        }
                                        {this.state.keranjang.total > 0 &&
                                        <div>
                                        {this.state.keranjang.rows.map((option)=>{
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
                                                                            backgroundImage: 'url('+localStorage.getItem('api_base')+option.gambar_produk[0].nama_file+')',
                                                                            backgroundRepeat:'no-repeat',
                                                                            backgroundSize: 'cover',
                                                                            backgroundPosition:'center',
                                                                            borderRadius:'20px'
                                                                        }}
                                                                    >&nbsp;</div>
                                                                    }
                                                                </div>
                                                                <div className="keterangan_produk" style={{paddingLeft:'0px'}}>
                                                                    <div style={{margin:'8px', marginTop:'0px', maxHeight:'30px', overflow:'hidden', textOverflow:'ellipsis', flexFlow:'nowrap', width:'100%'}}>
                                                                        <a href={"/tampilProduk/"+option.produk_id}>
                                                                            <h3 className="title" style={{marginTop:'0px'}}>
                                                                                {option.nama} {option.varian_produk_id ? <span> - {option.varian_produk}</span> : ''}
                                                                            </h3>
                                                                            {/* <h4>
                                                                                {option.varian_produk}
                                                                            </h4> */}
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
                                                                    {/* <div style={{paddingLeft:'8px', fontSize:'10px', fontWeight:'500', color:'#9b9b9b'}}>
                                                                        {parseInt(localStorage.getItem('sudah_login')) !== 1 &&
                                                                        <span>
                                                                            Harga retail
                                                                        </span>
                                                                        }
                                                                    </div> */}
                                                                    <div style={{paddingLeft:'8px', paddingRight:'16px', fontSize:'8px', fontWeight:'500', color:'#9b9b9b'}}>
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
                                                                                {parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id) === 2 &&
                                                                                <span>
                                                                                    {option.harga_produk.map((option)=>{
                                                                                        if(parseInt(option.jenis_harga_id) === parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)){
                                                                                            return (
                                                                                                <span>Rp {this.formatAngka(option.nominal)}</span>
                                                                                            )
                                                                                        }
                                                                                    })}
                                                                                </span>
                                                                                }
                                                                            </div>
                                                                            Harga {JSON.parse(localStorage.getItem('user')).jenis_mitra}
                                                                        </span>
                                                                        }
                                                                    </div>
                                                                    {/* <div style={{padding:'8px'}}>
                                                                        <button onClick={()=>this.beli(option.produk_id)} type="submit" className="btn btn-custom btn-block theme-color" style={{borderRadius:'15px'}}>
                                                                            <i className="f7-icons" style={{fontWeight:'bold'}}>cart</i>&nbsp;
                                                                            Beli
                                                                        </button>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-lg-4" style={{textAlign:'right'}}>
                                                            Jumlah<br/>
                                                            <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                placeholder="Jumlah" 
                                                                // onChange={this.ubahJumlah(option)} 
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
                                                            </button>
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
                                                            Harga Total
                                                        </div>
                                                        <div className="col-md-6 col-lg-6" style={{textAlign:'right', fontWeight:'bold'}}>
                                                            Rp {this.formatAngka(this.state.harga_total)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        }

                                        {this.state.keranjang.total > 0 &&
                                        <div style={{width:'100%', textAlign:'right'}}>
                                            <button onClick={this.checkout} style={{marginTop:'16px'}} className="btn btn-custom theme-color" >
                                                <i className="f7-icons">cart_fill</i>&nbsp;
                                                Checkout
                                            </button>
                                        </div>
                                        }
                                    </div>
								</div>
								<div className="col-md-4 col-lg-3 order-md-last list-sidebar">
									<div className="sidebar">
										<div className="sidebar-space">
											<h4 className="blog-title">Rekomendasi</h4>
                                            <div className="blog-divider"></div>
                                            <div className="blog-cat-detail">
                                                {this.state.produk_lain.rows.map((option)=>{
                                                    return (
                                                        <CardProdukMini produk={option} pengguna={JSON.parse(localStorage.getItem('user'))} />
                                                    )
                                                })}
                                            </div>

											<h4 className="blog-title">Kategori Produk</h4>
											<div className="blog-divider"></div>
											<div className="blog-cat-detail">
												<ul>
                                                    <li className="marg-15">
                                                        <a href={"/produk/semua"}>
                                                            {this.props.match.params.kategori_produk_id === 'semua' ? <b style={{color:'#064F45', fontSize:'16px'}}>Semua Kategori</b> : <span>Semua Kategori</span>}
                                                        </a>
                                                    </li>
                                                    {this.state.kategori_produk.rows.map((option)=>{
                                                        return (
                                                            <li className="marg-15">
                                                                <a href={"/produk/"+option.kategori_produk_id}>
                                                                    {/* {option.nama} */}
                                                                    {this.props.match.params.kategori_produk_id === option.kategori_produk_id ? <b style={{color:'#064F45', fontSize:'16px'}}>{option.nama}</b> : <span>{option.nama}</span>}
                                                                </a>
                                                            </li>
                                                        )
                                                    })}
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
        getProduk: Actions.getProduk,
        getKategoriProduk: Actions.getKategoriProduk,
        getKeranjang: Actions.getKeranjang,
        simpanKeranjang: Actions.simpanKeranjang
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(Checkout));
