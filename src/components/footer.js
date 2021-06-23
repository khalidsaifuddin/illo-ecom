import React from 'react';


class Footer extends React.Component {
  
  componentWillMount() {
        (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

  render() {
		
  	return (
      <div>
    		<section className="p-0">
           <div className="container-fluid">
           <div className="bottom-section">
              <div className="row">
                 <div className="col-md-12 p-0">
                    <div className="address-bar" style={{background:'linear-gradient(to right, #a1ffce, #faffd1)', display:'block', paddingTop:'16px'}}>
                       {/* <div style={{textAlign:'left'}}>
                          mantab
                       </div> */}
                       <div className="container">
                           <div className="row">
                              <div className="col-sm-6">
                                 <h3 style={{color:'#434343'}}>Support</h3>
                                 <ul style={{paddingLeft:'0px', color:'#434343'}}>
                                    <li><a href="/faq" style={{fontWeight:'normal', color:'#434343'}}>FAQ</a></li>
                                    <li><a href="/mitra" style={{fontWeight:'normal', color:'#434343'}}>Mitra Illo</a></li>
                                    <li><a href="/petunjuk-transaksi" style={{fontWeight:'normal', color:'#434343'}}>Petunjuk Transaksi</a></li>
                                    <li><a href="/syarat-ketentuan" style={{fontWeight:'normal', color:'#434343'}}>Syarat dan Ketentuan</a></li>
                                    <li><a href="/tentang/" style={{fontWeight:'normal', color:'#434343'}}>Tentang Illo</a></li>
                                 </ul>
                              </div>
                              {/* <div className="col-sm-4"> */}
                                 {/* Footer column 2 */}
                              {/* </div> */}
                              <div className="col-sm-6" style={{textAlign:'right'}}>
                                 <h3 style={{color:'#434343'}}>Illo Natural Skincare</h3>
                                 <p style={{color:'#434343'}}>
                                    Jl. Layar no. 10
                                    <br/>
                                    Kota Bandung Jawa Barat - 40293
                                    <br/>
                                    <a href="mailto:info@illoskincare.com">info@illoskincare.com</a>
                                 </p>
                                 <div style={{fontSize:'10px'}}>
                                    Metode Pembayaran
                                 </div>
                                 <img src="/assets/images/vismas.png" style={{width:'160px', marginTop:'8px'}}/>
                                 <img src="/assets/images/ATM_Bersama_2016.png" style={{height:'35px', marginTop:'8px'}}/>
                              </div>
                           </div>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
           </div>
        </section>

        <div className="copyright-section index-footer">
           <p>2021 copyright by Illo</p>
        </div>

        <div className="tap-top">
           <div>
              <i className="fa fa-angle-double-up"></i>
           </div>
        </div>
        <div id="fb-root"></div>
        {/*Your customer chat code*/}
          <div className="fb-customerchat"
              page_id="2123438804574660"
              theme_color="#18e7d3"
              logged_in_greeting="Hi! Welcome to PixelStrap Themes  How can we help you?"
              logged_out_greeting="Hi! Welcome to PixelStrap Themes  How can we help you?">
          </div>
      </div>
  	);
  }
}


export default Footer;