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
import Dropzone from 'react-dropzone';



class KonfirmasiPembayaran extends React.Component {
    
    hariIni = () => {
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
        let yyyy = today.getFullYear()
    
        // today = mm + '/' + dd + '/' + yyyy;
        today = yyyy + '-' + mm + '-' + dd
        
        return today
    }
    
	state = {
        loading: false,
		routeParams: {
			start: 0,
			limit: 20,
            tanggal_pembayaran: this.hariIni(),
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
        transaksi_record: {},
        file_bukti_pembayaran: '',
        bukti_pembayaran: '',
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
            !this.state.routeParams.jumlah_transfer ||
            !this.state.routeParams.bukti_pembayaran ||
            !this.state.routeParams.tanggal_pembayaran
        ){
            // Alert('Mohon lengkapi semua isian sebelum melanjukan prosesnya!', 'Peringatan')
            this.setState({
                loading: false,
                tampil_alert: true,
                warna_alert: 'red',
                teks_alert: 'Mohon lengkapi semua isian sebelum melanjukan prosesnya!'
            })

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
                        this.setState({
                            tampil_alert: true,
                            warna_alert: 'green',
                            teks_alert: (<div><span>Konfirmasi Pembayaran berhasil disimpan!</span><br/><a href="/pembelian" style={{color:'white', fontWeight:'bold'}}>Lihat Daftar Pembelian</a></div>)
                         },()=>{
                         
                        })

                        // const berhasil = await Confirm('Konfirmasi Pembayaran berhasil disimpan!', 'Berhasil')

                        // if(berhasil){
                        //     this.props.history.push('/pembelian')
                        // }else{

                        // }
                    }else{
                        //gagal
                        // const berhasil = await Confirm('Terdapat kesalahan teknis. Mohon dicoba kembali dalam beberapa saat ke depan!', 'Peringatan')
                        this.setState({
                            tampil_alert: true,
                            warna_alert: 'red',
                            teks_alert: (<div><span>Terdapat kesalahan teknis. Mohon dicoba kembali dalam beberapa saat ke depan!</span></div>)
                        },()=>{
                         
                        })
                    }

                })

            }).catch(()=>{
                //gagal teknis
                this.setState({
                    loading: false
                },async ()=>{
                    // const berhasil = await Confirm('Terdapat kesalahan teknis. Mohon dicoba kembali dalam beberapa saat ke depan!', 'Peringatan')
                    this.setState({
                        tampil_alert: true,
                        warna_alert: 'red',
                        teks_alert: (<div><span>Terdapat kesalahan teknis. Mohon dicoba kembali dalam beberapa saat ke depan!</span></div>)
                    },()=>{
                     
                    })
                })
            })
        })

    }

    gantiTanggal = (tipe) => (e) => {
        // console.log(this.state.routeParams.tanggal_pembayaran)
        // return true

        let arrTanggal = this.state.routeParams.tanggal_pembayaran.split('-')

        switch (tipe) {
            case 'tanggal':
                this.setState({
                    routeParams: {
                        ...this.state.routeParams,
                        tanggal_pembayaran: arrTanggal[0] + '-' + arrTanggal[1] + '-' + e.currentTarget.value
                    }
                },()=>{
                    console.log(this.state.routeParams)
                })
                break;
            case 'bulan':
                this.setState({
                    routeParams: {
                        ...this.state.routeParams,
                        tanggal_pembayaran: arrTanggal[0] + '-' + e.currentTarget.value + '-' + arrTanggal[2]
                    }
                },()=>{
                    console.log(this.state.routeParams)
                })
                break;
            case 'tahun':
                this.setState({
                    routeParams: {
                        ...this.state.routeParams,
                        tanggal_pembayaran: e.currentTarget.value + '-' + arrTanggal[1] + '-' + arrTanggal[2]
                    }
                },()=>{
                    console.log(this.state.routeParams)
                })
                break;
            default:
                break;
        }
    }

    acceptedFile = (file) => {
        if(file[0].size >= 5500000){ //2Mb
            // this.$f7.dialog.close()
            // Alert('Ukuran gambar tidak boleh melebihi 5MB! Silakan perkecil ukuran gambar Anda atau gunakan gambar lain', 'Peringatan');
            this.setState({
                tampil_alert: true,
                warna_alert: 'red',
                teks_alert: (<div><span>Ukuran gambar tidak boleh melebihi 5MB! Silakan perkecil ukuran gambar Anda atau gunakan gambar lain!</span></div>)
            },()=>{
             
            })
            
            return true;
        }
    
        // try {

            if(
                file[0].name.split(".")[(parseInt(file[0].name.split(".").length)-1)] === 'jpg' ||
                file[0].name.split(".")[(parseInt(file[0].name.split(".").length)-1)] === 'png' ||
                file[0].name.split(".")[(parseInt(file[0].name.split(".").length)-1)] === 'jpeg' ||
                file[0].name.split(".")[(parseInt(file[0].name.split(".").length)-1)] === 'webp' ||
                file[0].name.split(".")[(parseInt(file[0].name.split(".").length)-1)] === 'gif'
            ){

                let ekstensi = file[0].name.split(".")[(parseInt(file[0].name.split(".").length)-1)];
                console.log(ekstensi)

                this.props.generateUUID(this.state.routeParams).then((result)=>{

                    this.setState({
                        guid: result.payload,
                        routeParams: {
                            ...this.state.routeParams,
                            gambar: result.payload+"."+ekstensi,
                            file_gambar: "/assets/berkas/"+result.payload+"."+ekstensi
                        }
                    },()=>{
                        console.log(this.state.routeParams)
            
                        return new Promise(
                            (resolve, reject) => {
                                const xhr = new XMLHttpRequest();
                                xhr.open('POST', "https://be.diskuis.id" + '/api/Ruang/upload');
                                xhr.onload = this.uploadBerhasil;
                                xhr.onerror = this.uploadGagal;
                                const data = new FormData();
                                data.append('image', file[0]);
                                data.append('pengguna_id', JSON.parse(localStorage.getItem('user')).pengguna_id);
                                data.append('guid', this.state.guid);
                                data.append('gambar', this.state.guid+"."+ekstensi);
                                data.append('jenis', 'bukti_pembayaran');
                                xhr.send(data);
                            }
                        );
                    });

                });

            }else{
                // this.$f7.dialog.close()
                // Alert('Hanya dapat mengupload file gambar dengan format .jpg atau .png!', 'Peringatan');
                this.setState({
                    tampil_alert: true,
                    warna_alert: 'red',
                    teks_alert: (<div><span>Hanya dapat mengupload file gambar dengan format .jpg atau .png!</span></div>)
                },()=>{
                 
                })
                return true;
            }

        // } catch (error) {
        //     // this.$f7.dialog.close()
        //     Alert('file tidak dikenali. Mohon gunakan file lain!', 'Peringatan');
        //     return true;
        // }


    }

    uploadBerhasil = (xhr) => {
        console.log(JSON.parse(xhr.currentTarget.responseText));
        let response = JSON.parse(xhr.currentTarget.responseText);
        if(response.msg == 'sukses'){
            this.setState({
                file_bukti_pembayaran: response.filename,
                loading: false,
                routeParams: {
                    ...this.state.routeParams,
                    bukti_pembayaran: response.filename
                }
            },()=>{
                console.log(this.state.routeParams)
            })
        }
    }

    uploadGagal = (xhr) => {
        // Alert('Ada kesalahan pada sistem atau jaringan Anda, mohon cek kembali sebelum melakukan upload ulang', 'Mohon maaf');
        this.setState({
            tampil_alert: true,
            warna_alert: 'red',
            teks_alert: (<div><span>Ada kesalahan pada sistem atau jaringan Anda, mohon cek kembali sebelum melakukan upload ulang</span></div>)
        },()=>{
         
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
                                    <input onChange={this.setValue('nama_pengirim')} type="text" className="form-control" placeholder="Rekening Atas Nama Pengirim" required="required" value={this.state.routeParams.nama_pengirim} />
                                </div>
                                <div className="form-group" style={{marginTop:'8px'}}>
                                    <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Jumlah yang ditransfer</label>
                                    <input onChange={this.setValue('jumlah_transfer')} type="number" className="form-control" placeholder="Jumlah yang ditransfer" required="required" value={this.state.routeParams.jumlah_transfer} />
                                </div>
                                <div className="form-group" style={{marginTop:'8px'}}>
                                    <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Tanggal Transfer</label>
                                    <div style={{width:'100%', display:'inline-flex'}}>
                                        <select onChange={this.gantiTanggal('tanggal')} className="form-control" style={{height:'54px', marginRight:'8px'}}>
                                            <option value={'01'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '01' ? true : false)}>1</option>
                                            <option value={'02'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '02' ? true : false)}>2</option>
                                            <option value={'03'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '03' ? true : false)}>3</option>
                                            <option value={'04'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '04' ? true : false)}>4</option>
                                            <option value={'05'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '05' ? true : false)}>5</option>
                                            <option value={'06'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '06' ? true : false)}>6</option>
                                            <option value={'07'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '07' ? true : false)}>7</option>
                                            <option value={'08'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '08' ? true : false)}>8</option>
                                            <option value={'09'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '09' ? true : false)}>9</option>
                                            <option value={'10'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '10' ? true : false)}>10</option>
                                            <option value={'11'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '11' ? true : false)}>11</option>
                                            <option value={'12'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '12' ? true : false)}>12</option>
                                            <option value={'13'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '13' ? true : false)}>13</option>
                                            <option value={'14'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '14' ? true : false)}>14</option>
                                            <option value={'15'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '15' ? true : false)}>15</option>
                                            <option value={'16'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '16' ? true : false)}>16</option>
                                            <option value={'17'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '17' ? true : false)}>17</option>
                                            <option value={'18'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '18' ? true : false)}>18</option>
                                            <option value={'19'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '19' ? true : false)}>19</option>
                                            <option value={'20'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '20' ? true : false)}>20</option>
                                            <option value={'21'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '21' ? true : false)}>21</option>
                                            <option value={'22'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '22' ? true : false)}>22</option>
                                            <option value={'23'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '23' ? true : false)}>23</option>
                                            <option value={'24'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '24' ? true : false)}>24</option>
                                            <option value={'25'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '25' ? true : false)}>25</option>
                                            <option value={'26'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '26' ? true : false)}>26</option>
                                            <option value={'27'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '27' ? true : false)}>27</option>
                                            <option value={'28'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '28' ? true : false)}>28</option>
                                            <option value={'29'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '29' ? true : false)}>29</option>
                                            <option value={'30'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '30' ? true : false)}>30</option>
                                            <option value={'31'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[2] === '31' ? true : false)}>31</option>
                                        </select>
                                        <select onChange={this.gantiTanggal('bulan')} className="form-control" style={{height:'54px', marginRight:'8px'}}>
                                            <option value={'01'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '01' ? true : false)}>Januari</option>
                                            <option value={'02'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '02' ? true : false)}>Februari</option>
                                            <option value={'03'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '03' ? true : false)}>Maret</option>
                                            <option value={'04'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '04' ? true : false)}>April</option>
                                            <option value={'05'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '05' ? true : false)}>Mei</option>
                                            <option value={'06'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '06' ? true : false)}>Juni</option>
                                            <option value={'07'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '07' ? true : false)}>Juli</option>
                                            <option value={'08'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '08' ? true : false)}>Agustus</option>
                                            <option value={'09'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '09' ? true : false)}>September</option>
                                            <option value={'10'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '10' ? true : false)}>Oktober</option>
                                            <option value={'11'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '11' ? true : false)}>November</option>
                                            <option value={'12'} selected={(this.state.routeParams.tanggal_pembayaran.split('-')[1] === '12' ? true : false)}>Desember</option>
                                        </select>
                                        <select onChange={this.gantiTanggal('tahun')} className="form-control" style={{height:'54px', marginRight:'8px'}}>
                                            <option value={'2020'}>2021</option>
                                            <option value={'2021'} selected>2021</option>
                                            <option value={'2022'}>2022</option>
                                            <option value={'2023'}>2022</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group" style={{marginTop:'8px'}}>
                                    <label className="custom-control-label" style={{marginBottom:'4px', marginLeft:'20px'}}>Bukti Pembayaran</label>
                                    <Dropzone className="droping" onDrop={this.acceptedFile}>
                                    {({getRootProps, getInputProps}) => (
                                        <section style={{paddingTop:'8px'}}>
                                            <div {...getRootProps()} style={{borderRadius:'20px', height:'300px',border:'4px dashed #ccc', textAlign: 'center', paddingTop:(this.state.file_bukti_pembayaran !== '' ? '16px' : '10%'), paddingLeft:'16px', paddingRight:'16px'}}>
                                                <input {...getInputProps()} />
                                                {this.state.file_bukti_pembayaran === '' &&
                                                <i slot="media" className="f7-icons" style={{fontSize:'60px', color:'#434343'}}>square_arrow_up</i>
                                                }
                                                {this.state.file_bukti_pembayaran !== '' &&
                                                <div>
                                                <img style={{height:'150px'}} src={'https://be.diskuis.id'+this.state.file_bukti_pembayaran} />
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </div>
                                                }
                                                {this.state.bukti_pembayaran === '' &&
                                                <div>
                                                <p>Tarik dan seret gambar pilihan Anda ke sini, atau klik/Sentuh untuk cari gambar</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </div>
                                                }
                                                {this.state.bukti_pembayaran !== '' && this.state.file_bukti_pembayaran === '' &&
                                                <div>
                                                <p style={{fontSize:'20px'}}>{this.state.bukti_pembayaran}</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </div>
                                                }
                                            </div>
                                        </section>
                                    )}
                                    </Dropzone>
                                </div>
                                <button className="btn card20" style={{background:'green', color:'white'}} onClick={this.simpanKonfirmasi}>
                                    <i className="f7-icons">floppy_disk</i>&nbsp;
                                    Simpan Konfirmasi
                                </button>
                            </div>
                        </div>
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
        generateUUID: Actions.generateUUID,
		getArtikel: Actions.getArtikel,
        getTransaksi: Actions.getTransaksi,
        simpanKonfirmasi: Actions.simpanKonfirmasi
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(KonfirmasiPembayaran));
