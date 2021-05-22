import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

import Modal from 'react-modal';



class SignUp extends React.Component {

   state = {
      foo:'bar',
      routeParams: {
         start: 0,
         limit: 20,
         id_level_wilayah: 1
      },
      provinsi: [],
      kabupaten: [],
      kecamatan: [],
      loading: false,
      teks_alert: '',
      tampil_alert: false,
      warna_alert: 'green'
   }

   getParameterByName = (name, url = this.props.location.search) => {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
   }

   daftar = () => {
      // alert('tes')
      // Alert('tes', 'Informasi');
      // console.log(this.state.routeParams)

      //cek pertama. password
      if(
         !this.state.routeParams.nama ||
         !this.state.routeParams.no_hp ||
         !this.state.routeParams.email ||
         !this.state.routeParams.password ||
         !this.state.routeParams.kode_wilayah_provinsi ||
         !this.state.routeParams.kode_wilayah_kabupaten ||
         !this.state.routeParams.kode_wilayah_kecamatan ||
         !this.state.routeParams.alamat
      ){
         // Alert('Mohon lengkapi semua isian sebelum mendaftar!', 'Peringatan')
         this.setState({
            tampil_alert: true,
            warna_alert: 'red',
            teks_alert: 'Mohon lengkapi semua isian sebelum mendaftar!'
         })
         return true
      }

      if(this.state.routeParams.password !== this.state.routeParams.password_ulang){
         //nggak sama
         // Alert('Konfirmasi password tidak sama! Mohon pastikan kembali tidak ada kesalahan ketik', 'Peringatan')
         this.setState({
            tampil_alert: true,
            warna_alert: 'red',
            teks_alert: 'Konfirmasi password tidak sama! Mohon pastikan kembali tidak ada kesalahan ketik'
         })
         return true
      }

      this.setState({
         loading: true
      },()=>{
         this.props.simpanPenggunaBaru(this.state.routeParams).then((result)=>{
            
            if(result.payload.sukses){
               //berhasil
               this.setState({
                  loading: false
               },()=>{
                  // Alert('Berhasil menyimpan data pengguna baru', 'Berhasil')
                  this.setState({
                     tampil_alert: true,
                     warna_alert: 'green',
                     teks_alert: 'Berhasil menyimpan data pengguna baru'
                  },()=>{

                  })

                  localStorage.setItem('user', JSON.stringify(result.payload.rows[0]))
                  localStorage.setItem('sudah_login', 1)

                  setTimeout(() => {
                     if(this.getParameterByName('redirect')){
                        this.props.history.push(this.getParameterByName('redirect'))
                     }else{
                        this.props.history.push('/')
                     }
                  }, 2000);
               })

            }else{
               //gagal
               this.setState({
                  loading: false
               },()=>{
                  // Alert(result.payload.pesan, 'Gagal')
                  this.setState({
                     tampil_alert: true,
                     warna_alert: 'red',
                     teks_alert: result.payload.pesan
                  },()=>{

                  })
               })
            }
            
         })
      })

   }

   componentDidMount = () => {
      this.props.getWilayah(this.state.routeParams).then((result)=>{
         this.setState({
            provinsi: result.payload.rows
         })
      })

      setTimeout(function () {
         document.querySelector(".loader-wrapper").style = "display: none";
      }, 2000);
   }

   gantiSelect = (tipe) => (e) => {
      // console.log(e.currentTarget.value)
      // console.log(tipe)

      this.setState({
         routeParams: {
            ...this.state.routeParams,
            [tipe]: e.currentTarget.value
         }
      },()=>{
         console.log(this.state.routeParams)

         switch (tipe) {
            case 'kode_wilayah_provinsi':
               this.props.getWilayah({
                  ...this.state.routeParams, 
                  id_level_wilayah: 2, 
                  mst_kode_wilayah: this.state.routeParams[tipe]
               }).then((result)=>{
                  this.setState({
                     kabupaten: result.payload.rows
                  })
               })
               break;
            case 'kode_wilayah_kabupaten':
               this.props.getWilayah({
                  ...this.state.routeParams, 
                  id_level_wilayah: 3, 
                  mst_kode_wilayah: this.state.routeParams[tipe]
               }).then((result)=>{
                  this.setState({
                     kecamatan: result.payload.rows
                  })
               })
               break;
            default:
               // do nothing
               break;
         }
      })
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

   render() {

      return (
         <section className="authentication-form" style={{paddingTop:'32px'}}>
            <div className="innerpage-decor">
               <div className="innerpage-circle1"><img src="assets/images/Testimonial2.png" alt="" /></div>
               <div className="innerpage-circle2"><img src="assets/images/Testimonial1.png" alt="" /></div>
            </div>
            <div>
               <div style={{width:'100%', textAlign:'center', marginBottom:'8px'}}>
                  <a className="navbar-brand" href={`${process.env.PUBLIC_URL}/`}><img src="/assets/images/illo-logo.png" alt="logo" style={{width:'100px'}} /></a>
               </div>
               {/* <BounceLoader color={"#47B161"} loading={true} size={150} /> */}
               <Modal
                  isOpen={this.state.loading}
                  // onAfterOpen={afterOpenModal}
                  // onRequestClose={closeModal}
                  // style={customStyles}
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
               <h2 className="title text-center" style={{marginBottom:'8px'}}><span>Selamat Datang!</span></h2>
               <h2 className="title text-center">Daftar<span> Pengguna Baru</span></h2>
               <p className="text-center">Sudah punya akun? Silakan <a style={{color:'#434343', fontWeight:'bold'}} href="/login">login di sini</a></p>
               <div className="card">
                  <div className="theme-form">
                     <div className="form-group">
                        <div className="md-fgrup-margin">
                           <input onChange={this.setValue('nama')} type="text" className="form-control" placeholder="Nama Anda" />
                        </div>
                     </div>
                     <div className="form-group">
                        <input onChange={this.setValue('no_hp')} type="number" className="form-control" placeholder="No Whatsapp Aktif" />
                     </div>
                     <div className="form-group">
                        <input onChange={this.setValue('email')} type="email" className="form-control" placeholder="Alamat email aktif" />
                     </div>
                     <div className="form-group">
                        <input onChange={this.setValue('password')} required="" type="password" className="form-control" placeholder="Password" />
                     </div>
                     <div className="form-group">
                        <input onChange={this.setValue('password_ulang')} type="password" name="login[password]" className="form-control" placeholder="Konfirmasi password" required="required" />
                        <div className="show-hide">
                           <span className="show"></span>
                        </div>
                     </div>
                     {/* <div className="or-saparator"><span>Identitas Diri</span></div>
                     <div className="form-group">
                        <div className="md-fgrup-margin">
                           <input onChange={this.setValue('tempat_lahir')} type="text" className="form-control" placeholder="Tempat Lahir" />
                        </div>
                     </div>
                     <DatePicker /> */}
                     <div className="form-group">
                        <div className="md-fgrup-margin">
                        </div>
                     </div>
                     <div className="or-saparator"><span>Alamat Pengiriman</span></div>
                     <div className="form-group">
                        <select onChange={this.gantiSelect('kode_wilayah_provinsi')} name="kode_wilayah_provinsi" id="kode_wilayah_provinsi" className="form-control" style={{minHeight:'45px'}}>
                           <option value="" disabled selected>Provinsi</option>
                           {this.state.provinsi.map((option)=>{
                              return (
                                 <option value={option.kode_wilayah}>{option.nama}</option>
                              )
                           })}
                        </select>
                     </div>
                     <div className="form-group">
                        <select onChange={this.gantiSelect('kode_wilayah_kabupaten')} name="kode_wilayah_kabupaten" id="kode_wilayah_kabupaten" className="form-control" style={{minHeight:'45px'}}>
                           <option value="" disabled selected>Kabupaten/Kota</option>
                           {this.state.kabupaten.map((option)=>{
                              return (
                                 <option value={option.kode_wilayah}>{option.nama}</option>
                              )
                           })}
                        </select>
                     </div>
                     <div className="form-group">
                        <select onChange={this.gantiSelect('kode_wilayah_kecamatan')} name="kode_wilayah_kecamatan" id="kode_wilayah_kecamatan" className="form-control" style={{minHeight:'45px'}}>
                           <option value="" disabled selected>Kecamatan</option>
                           {this.state.kecamatan.map((option)=>{
                              return (
                                 <option value={option.kode_wilayah}>{option.nama}</option>
                              )
                           })}
                        </select>
                     </div>
                     <div className="form-group">
                        <textarea onChange={this.setValue('alamat')} id="alamat" name="alamat" rows="4" cols="50" className="form-control" placeholder="Alamat Pengiriman">
                        </textarea>
                     </div>
                     <div className="form-group">
                        <div className="md-fgrup-margin">
                           <input onChange={this.setValue('kode_pos')} type="text" id="kode_pos" name="kode_pos" className="form-control" placeholder="Kode Pos" />
                        </div>
                     </div>
                     {/* <div className="form-group row">
                        <div className="custom-control custom-checkbox col-6">
                           <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                           <label className="custom-control-label" for="customControlAutosizing">Remember me</label>
                        </div>
                        <a href={`${process.env.PUBLIC_URL}/forget-password`} className="text-right col-6 theme-link">lost your password</a>
                     </div> */}
                     <div className="form-button text-center">
                        <button onClick={()=>this.daftar()} className="btn btn-custom theme-color">Daftar</button>
                     </div>
                     <br/>
                     <div style={{width:'100%', textAlign:'center'}}>
                        <div className="or-saparator"><span>atau</span></div>
                        <a className="btn btn-custom" href={"/login"+(this.getParameterByName('redirect') ? '?redirect='+this.getParameterByName('redirect') : '')} style={{color:'#ffffff'}}>Login</a>
                        {/* <br/> */}
                        <div className="or-saparator"><span>&nbsp;</span></div>
                        <a href="/" style={{color:'#434343'}}>Kembali ke Beranda</a>
                     </div>
                     {/* <div className="or-saparator"><span>atau</span></div> */}
                     {/* <h6 className="text-center mt-0 mb-3">Daftar dengan:</h6>
                     <div className="form-button text-center social-btns">
                        <button type="submit" className="btn btn-custom ggl">Google</button>
                     </div> */}
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
            </div>
         </section>
      );
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({
     getArtikel: Actions.getArtikel,
     getWilayah: Actions.getWilayah,
     simpanPenggunaBaru: Actions.simpanPenggunaBaru
   }, dispatch);
}

export default (connect(null, mapDispatchToProps)(SignUp));