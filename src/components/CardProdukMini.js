import React from 'react';


class CardProdukMini extends React.Component {

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    beli = (produk_id) => {
        alert(produk_id)
    }
  
    render() {
		
        return (
            <div className="card" style={{
                minWidth:'100%', 
                height:'160px',
                marginRight:'16px', 
                borderRadius:'20px',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                transition: '0.3s',
                border: '0px solid #ccc',
                marginBottom:'24px'
            }}>
                {/* {this.props.produk.nama} */}
                <div className="row">
                    <div className="col-md-5 col-lg-5 order-md-last list-sidebar" style={{paddingRight:'0px'}}>
                        {this.props.produk.gambar_produk && this.props.produk.gambar_produk.length > 0 &&
                        <div
                            style={{
                                width:'100%',
                                height:'160px',
                                // backgroundImage: 'url('+localStorage.getItem('api_base')+this.props.produk.gambar_produk[0].nama_file+')',
                                backgroundImage: 'url('+localStorage.getItem('api_base_gambar')+this.props.produk.gambar_produk[0].nama_file+')',
                                backgroundRepeat:'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition:'center',
                                borderRadius:'20px 0px 0px 20px'
                            }}
                        >&nbsp;</div>
                        }
                    </div>
                    <div className="col-md-7 col-lg-7 order-md-last list-sidebar" style={{paddingLeft:'0px'}}>
                        <div style={{margin:'8px', maxHeight:'30px', overflow:'hidden', flexFlow:'nowrap', width:'calc( 100% - 16px )'}}>
                            <a href={"/tampilProduk/"+this.props.produk.produk_id}>
                                <h3 className="title" style={{marginTop:'0px'}}>
                                    {this.props.produk.nama}
                                </h3>
                            </a>
                        </div>
                        <div style={{minHeight:'30px', paddingTop:'0px', margin:'8px', maxHeight:'50px', overflow:'hidden', textOverflow:'ellipsis', flexFlow:'nowrap', marginTop:'-8px'}}>
                            {this.props.produk.keterangan &&
                            <div className="boxKeterangan" style={{marginTop:'0px', fontSize:'10px'}} dangerouslySetInnerHTML={{ __html: this.props.produk.keterangan.replace(/noreferrer/g, 'noreferrer" class="link external"').replace('<p class=""><br></p>','').replace(/(<([^>]+)>)/gi, "").substring(0,50) }} />
                            }
                        </div>
                        <div style={{paddingLeft:'8px', fontSize:'12px', color:'#9b9b9b'}}>
                            {this.props.produk.kategori_produk}
                        </div>
                        <div style={{paddingLeft:'8px', fontSize:'18px', fontWeight:'500'}}>
                            {/* Rp 100.000 */}
                            {parseInt(localStorage.getItem('sudah_login')) !== 1 &&
                            <span>
                                Rp {this.props.produk.harga_produk && this.props.produk.harga_produk.length > 0 && this.formatAngka(this.props.produk.harga_produk[0].nominal)}
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
                            {/* {parseInt(localStorage.getItem('sudah_login')) !== 1 &&
                            <span>
                                <div style={{fontSize:'18px', fontWeight:'bold'}}>
                                    {this.props.produk.harga_produk.map((option)=>{
                                        if(parseInt(option.jenis_harga_id) === 1){
                                            return (
                                                <span>Rp {this.formatAngka(option.nominal)}</span>
                                            )
                                        }
                                    })}
                                </div>
                                Harga retail
                            </span>
                            } */}
                            {parseInt(localStorage.getItem('sudah_login')) === 1 &&
                            <span>
                                <div>
                                    {this.props.produk.harga_produk.map((option)=>{
                                        if(parseInt(option.jenis_harga_id) === 1){
                                            return (
                                                <span style={{textDecoration:'line-through'}}>Rp {this.formatAngka(option.nominal)}</span>
                                            )
                                        }
                                    })}
                                </div>
                                <div style={{fontSize:'18px', fontWeight:'bold'}}>
                                    {parseInt(this.props.pengguna.jenis_mitra_id) === 2 &&
                                    <span>
                                        {this.props.produk.harga_produk.map((option)=>{
                                            if(parseInt(option.jenis_harga_id) === parseInt(this.props.pengguna.jenis_mitra_id)){
                                                return (
                                                    <span>Rp {this.formatAngka(option.nominal)}</span>
                                                )
                                            }
                                        })}
                                    </span>
                                    }
                                </div>
                                Harga {this.props.pengguna.jenis_mitra}
                            </span>
                            }
                        </div>
                        {/* <div style={{padding:'8px'}}>
                            <button onClick={()=>this.beli(this.props.produk.produk_id)} type="submit" className="btn btn-custom btn-block theme-color" style={{borderRadius:'15px'}}>
                                <i className="f7-icons" style={{fontWeight:'bold'}}>cart</i>&nbsp;
                                Beli
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}


export default CardProdukMini;