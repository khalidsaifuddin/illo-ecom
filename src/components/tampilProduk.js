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


class tampilProduk extends React.Component {
	state = {
		routeParams: {
			start: 0,
			limit: 20,
            produk_id: (this.props.match.params.produk_id ? this.props.match.params.produk_id : null),
			varian_produk_id: null,
			mitra_id: JSON.parse(localStorage.getItem('mitra_terdekat')).mitra_id,
			pengguna_id: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).pengguna_id : null),
			jumlah: 1
		},
		kategori_produk: {
			rows: [],
			total: 0
		},
		produk: {
			rows: [],
			total: 0
		},
        produk_lain: {
            rows: [],
			total: 0
        },
        produk_record: {
			harga_produk: []
		},
		gambar_utama: ''
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

		this.props.getProduk({...this.state.routeParams, mitra_id: ( JSON.parse(localStorage.getItem('mitra_terdekat')) ? JSON.parse(localStorage.getItem('mitra_terdekat')).mitra_id : null )}).then((result)=>{
			this.setState({
				produk: result.payload,
                produk_record: result.payload.total > 0 ? result.payload.rows[0] : {}
			},()=>{

				if(this.state.produk_record.gambar_produk && this.state.produk_record.gambar_produk.length > 0){
					this.state.produk_record.gambar_produk.map((option)=>{
						if(parseInt(option.gambar_utama) === 1){
							this.setState({
								gambar_utama: option.nama_file
							})
						}else{
							if(this.state.produk_record.gambar_produk.indexOf(option) === 0){
								this.setState({
									gambar_utama: option.nama_file
								})	
							}
						}
					})
				}

                this.props.getKategoriProduk({...this.state.routeParams, kategori_produk_id: null}).then((result)=>{
                    this.setState({
                        kategori_produk: result.payload
                    },()=>{
                        this.props.getProduk({...this.state.routeParams, produk_id: null, limit: 3, a_random: 'Y'}).then((result)=>{
                            this.setState({
                                produk_lain: result.payload
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
			// alert('sudah login')
			if(this.state.produk_record.varian_produk.length > 0 && !this.state.routeParams.varian_produk_id){
				Alert('Mohon pilih varian terlebih dahulu!', 'Peringatan')
				return true
			}

			this.props.simpanKeranjang({
				...this.state.routeParams
			}).then((result)=>{
				if(result.payload.sukses){
					//berhasil
					Alert('Produk berhasil ditambahkan ke keranjang', ()=>{
						this.props.history.push('/keranjang')
					})
				}else{
					//gagal
					Alert('Ada yang salah pada sistem Kami. Mohon coba kembali dalam beberapa saat ke depan')
				}
			}).catch(()=>{
				Alert('Ada yang salah pada sistem Kami. Mohon coba kembali dalam beberapa saat ke depan')
			})

			// Alert(this.state.routeParams.varian_produk_id)
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
									<h2 className="title"><span>{this.state.produk_record.nama}</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/produk/semua">Produk</a></li>
											<li className="breadcrumb-item active"><a href={null}>
                                                {this.state.produk_record.nama}
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
									<div className="row blog-list">

                                        {/* detail produk */}
                                        <div className="col-md-6 col-lg-6 order-md-last list-sidebar">
                                            {this.state.produk_record.gambar_produk && this.state.produk_record.gambar_produk.length > 0 &&
											<div style={{width:'100&'}}>
												<div
												style={{
													width:'100%',
													height:'400px',
													border:'1px solid #eee',
													background:'#4f4f4f',
													backgroundImage: 'url('+localStorage.getItem('api_base')+this.state.gambar_utama+')',
													backgroundSize:'cover',
													backgroundPosition:'center',
													backgroundRepeat:'no-repeat'
												}}
												>&nbsp;</div>
												<div style={{
													display:'inline-flex', 
													marginTop:'8px', 
													overflow:'auto',
													width:'100%'
												}}>
												{this.state.produk_record.gambar_produk.map((option)=>{
													return (
														<a style={{width:'100px',marginRight:'4px', cursor:'pointer'}} onClick={()=>this.gantiGambar(option.nama_file)}>
															<div
															style={{
																minWidth:'100px',
																height:'100px',
																background:'#434343',
																marginBottom:'16px',
																border:'1px solid #eee',
																backgroundImage: 'url('+localStorage.getItem('api_base')+option.nama_file+')',
																backgroundSize:'cover',
																backgroundPosition:'center',
																backgroundRepeat:'no-repeat'
															}}
															>&nbsp;</div>
														</a>
													)
												})}
												</div>
                                        	</div>
											}
										</div>
										<div className="col-md-6 col-lg-6 order-md-last list-sidebar">
											{parseInt(localStorage.getItem('sudah_login')) === 1 &&
											<div>
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
												{/* <h2 style={{fontWeight:'500', marginBottom:'8px'}}> */}
												<div>
													{this.state.produk_record.harga_produk.map((option)=>{
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
														{this.state.produk_record.harga_produk.map((option)=>{
															if(parseInt(option.jenis_harga_id) === parseInt(JSON.parse(localStorage.getItem('user')).jenis_mitra_id)){
																return (
																	<span style={{fontSize:'25px'}}>Rp {this.formatAngka(option.nominal)}</span>
																)
															}
														})}
													</span>
													}
												</div>
												<div style={{fontSize:'10px'}}>
													Harga {JSON.parse(localStorage.getItem('user')).jenis_mitra}
												</div>
													{/* Rp {(this.state.produk_record.harga_produk && this.state.produk_record.harga_produk.length > 0 ? this.formatAngka(this.state.produk_record.harga_produk[0].nominal) : 0)} */}
												{/* </h2> */}
											</div>
											}
											{/* <div style={{color:'#a0a0a0'}}>
												Harga Retail
											</div> */}
											
											<div style={{marginTop:'8px'}}>
												Jumlah Stok: {this.state.produk_record.stok ? this.state.produk_record.stok : '0'}
											</div>
											<div className="blog-divider"></div>
											
											{this.state.produk_record.varian_produk && this.state.produk_record.varian_produk.length > 0 &&
											<div style={{marginTop:'8px'}}>
												Varian:<br/>
												<div style={{
													display:'inline-flex', 
													marginTop:'8px', 
													overflow:'auto',
													width:'100%'
												}}>
													{this.state.produk_record.varian_produk.map((option)=>{
														return (
															<a style={{width:'100px',marginRight:'4px', cursor:'pointer'}} onClick={()=>this.gantiVarian(option.varian_produk_id)}>
																<div
																className="card"
																style={{
																	minWidth:'100px',
																	minHeight:'60px',
																	marginBottom:'16px',
																	textAlign:'center',
																	padding:'8px',
																	fontSize:'12px',
																	background: (this.state.routeParams.varian_produk_id === option.varian_produk_id ? '#e8fffb' : 'white'),
																	border:(this.state.routeParams.varian_produk_id === option.varian_produk_id ? '2px solid green' : '1px solid #ccc')
																}}
																>
																	{option.nama}
																</div>
															</a>
														)
													})}
												</div>
											</div>
											}
											<div style={{marginTop:'8px'}}>
												<span>Jumlah pembelian</span>
												<input type="number" className="form-control" placeholder="Jumlah" onChange={this.ubahJumlah} value={this.state.routeParams.jumlah} />
											</div>
											<div style={{marginTop:'8px'}}>
												<div style={{padding:'8px'}}>
													<button 
														onClick={()=>this.beli()} 
														className="btn btn-custom btn-block theme-color" 
														style={{borderRadius:'15px'}}
														disabled={this.state.produk_record.stok > 0 ? false : true}
													>
														<i className="f7-icons" style={{fontWeight:'bold'}}>cart</i>&nbsp;
														Tambah ke Keranjang
													</button>
												</div>
											</div>
											<div className="blog-divider"></div>
											<div>
												{this.state.produk_record.keterangan &&
                                                <div style={{marginTop:'8px', fontSize:'12px'}} dangerouslySetInnerHTML={{ __html: this.state.produk_record.keterangan.replace(/noreferrer/g, 'noreferrer" class="link external"').replace('<p class=""><br></p>','') }} />
                                                }
                                                {!this.state.produk_record.keterangan &&
                                                <div style={{marginTop:'8px', fontSize:'12px'}}>
                                                    Tidak ada keterangan produk
                                                </div>
                                                }
											</div>
										</div>
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
		simpanKeranjang: Actions.simpanKeranjang
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(tampilProduk));
