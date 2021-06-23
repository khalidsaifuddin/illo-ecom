import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';

import Modal from './Modal_tmp'

class PengajuanMitra extends React.Component {

	state = {
        loading: false,
		routeParams: {
			start: 0,
			limit: 20,
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
		},
		mitra: {
			rows: [],
			total: 0
		},
		record_artikel: {},
        provinsi: [],
        kabupaten: [],
        pengajuan_sukses: false,
        warna_alert: 'green',
        teks_alert: '',
        tampil_alert: false
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

		// this.props.getArtikel(this.state.routeParams).then((result)=>{
		// 	this.setState({
		// 		record_artikel: result.payload.total > 0 ? result.payload.rows[0] : {}
		// 	})
		// })

        this.props.getProvince(this.state.routeParams).then((result)=>{
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

           if(tipe === 'province_id'){

                this.props.getCity({
                   province_id: this.state.routeParams.province_id, 
                   province: this.state.routeParams.province_id
                }).then((result)=>{
                    this.setState({
                        kabupaten: result.payload.rajaongkir.results
                    })
                })

           }
        })
    }

    simpanPengajuan = () => {
        this.setState({
            loading: true
        },()=>{
            this.props.simpanPengajuanMitra(this.state.routeParams).then((result)=>{
                
                this.setState({
                    loading: false,
                    pengajuan_sukses: result.payload.sukses,
                    tampil_alert: true,
                    teks_alert: 'Pengajuan Anda berhasil disimpan!'                
                })

            }).catch(()=>{
                this.setState({
                    loading: false
                })
            })
        })

        // console.log(this.state.routeParams)
    }
	
	render() {

		return (
			<div>
				<Navbar />
                <Modal loading={this.state.loading} />
				<div className="page-margin">

					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
                                <div className="col-md-6 col-sm-6 col-text-center d-align-center">
									<h2 className="title"><span>Pengajuan Mitra</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/mitra">Mitra</a></li>
											<li className="breadcrumb-item"><a href="/pengajuan-mitra">Pengajuan Mitra</a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>

					<section style={{paddingTop:'16px'}}>
						<div className="container">
							<div className="row">
								<div className="col-sm-12">
									<div className="blog-item">
										<div className="blog-text">
											<div className="blog-description">
												<div style={{marginTop:'-8px', width:'100%', overflowX:'hidden'}}>
                                                    {this.state.pengajuan_sukses &&
                                                    <div className="card card20" style={{padding:'16px', marginBottom:'16px', background:(this.state.warna_alert === 'green' ? '#81c784' : 'red'), color:'white'}}>
                                                        <div className="row">
                                                            <div className="col-md-8 col-lg-8 blog-sec">
                                                                {this.state.teks_alert}
                                                            </div>
                                                            <div className="col-md-4 col-lg-4 blog-sec" style={{textAlign:'right'}}>
                                                                <button className="btn" style={{background:'transparent', color:'white'}} onClick={()=>this.setState({tampil_alert:false})}>Tutup</button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-8 col-lg-8 blog-sec">
                                                                <a href="/mitra" style={{fontSize:'15px', fontWeight:'bold', color:'white'}}>Kembali ke halaman mitra</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }
                                                    {!this.state.pengajuan_sukses &&
                                                    <div>
                                                        <div className="theme-form" style={{marginTop:'0px', padding:'16px', border:'2px dashed #cccccc', borderRadius:'20px'}}>
                                                            <h3 style={{marginTop:'4px', marginBottom:'16px', fontWeight:'normal'}}>Pengajuan sebagai mitra Illo</h3>
                                                            <div className="form-group" style={{marginTop:'8px'}}>
                                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Jenis Mitra</label>
                                                                <select className="form-control" placeholder="Provinsi" required="required" style={{height:'54px'}} onChange={this.setValue('jenis_mitra_id')}>
                                                                    <option value="-">-</option>
                                                                    <option value={3}>{"Reseller"}</option>
                                                                    <option value={4}>{"Agen"}</option>
                                                                    <option value={5}>{"Distributor"}</option>
                                                                </select>
                                                                {/* <input onChange={this.setValue('nama')} type="text" className="form-control" placeholder="Jenis Mitra" required="required" value={this.state.routeParams.nama} /> */}
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
                                                                <select className="form-control" placeholder="Provinsi" required="required" style={{height:'54px'}} onChange={this.setValue('city_id')}>
                                                                    <option value="-">-</option>
                                                                    {this.state.kabupaten.map((option)=>{
                                                                        return (
                                                                            <option value={option.city_id}>{option.type} {option.city_name}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>
                                                            <div className="form-group" style={{marginTop:'8px'}}>
                                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Kecamatan</label>
                                                                <input onChange={this.setValue('kecamatan')} type="text" className="form-control" placeholder="Kecamatan" required="required" value={this.state.routeParams.kecamatan} />
                                                            </div>
                                                            <div className="form-group" style={{marginTop:'8px'}}>
                                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Desa/Kelurahan</label>
                                                                <input onChange={this.setValue('desa_kelurahan')} type="text" className="form-control" placeholder="Desa/Kelurahan" required="required" value={this.state.routeParams.desa_kelurahan} />
                                                            </div>
                                                            <div className="form-group" style={{marginTop:'8px'}}>
                                                                <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Alamat Lengkap</label>
                                                                <input onChange={this.setValue('alamat_jalan')} type="text" className="form-control" placeholder="Alamat Lengkap" required="required" value={this.state.routeParams.alamat_jalan} />
                                                            </div>
                                                        </div>
                                                        <div className="blog-divider"></div>
                                                        <button className="btn card20" style={{background:'green', color:'white'}} onClick={this.simpanPengajuan}>
                                                            <i className="f7-icons">arrow_right_circle_fill</i>&nbsp;
                                                            Simpan
                                                        </button>
                                                    </div>
                                                    }
												</div>
											</div>
										</div>
									</div>
									<div className="blog-divider"></div>
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
        getProvince: Actions.getProvince,
        getCity: Actions.getCity,
        simpanPengajuanMitra: Actions.simpanPengajuanMitra
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(PengajuanMitra));
