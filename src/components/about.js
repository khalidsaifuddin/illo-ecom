import React from 'react';


class About extends React.Component {
   componentDidMount() {
      setTimeout(function () {
         document.querySelector(".loader-wrapper").style = "display: none";
      }, 2000);
   }
   render() {

      return (
         <section id="about" className="about">
            <div className="about-decor">
               <div className="about-circle1"><img src="assets/images/team1.png" alt="team1" /></div>
               <div className="about-circle2"><img src="assets/images/main-banner1.png" alt="banner1" /></div>
            </div>
            <div className="container">
               <div className="row ">
                  <div className="col-md-5">
                     <div className="about-contain">
                        <div>
                           <h2 className="title">Tentang <span>Diskuis</span></h2>
                           <p className="caption-about">Diskuis adalah aplikasi media pembelajaran daring/online kolaboratif yang menyenangkan
                           <br/>
                           <br/>
                           Diskuis mengadopsi konsep gamifikasi untuk kegiatan belajar mengajar antara guru dan siswa baik itu dengan metode <i>online learning</i>, maupun <i>blended learning</i>, Kegiatan belajar mengajar tidak lagi membosankan! </p>
                           <br/>
                           <div className="row sm-mb">
                              <div className="col-6">
                                 <ul className="about-style">
                                    <li className="abt-hover">
                                       <div className="about-icon">
                                          <div className="icon-hover">
                                             <img src="assets/images/icon1.png" alt="easy-to-customized" />
                                          </div>
                                       </div>
                                       <div className="about-text">
                                          <h3>Belajar menyenangkan seperti bermain game</h3>
                                       </div>
                                    </li>
                                    <li className="abt-hover">
                                       <div className="about-icon">
                                          <div className="icon-hover">
                                             <img src="assets/images/icon3.png" alt="easy-to-use" />
                                          </div>
                                       </div>
                                       <div className="about-text">
                                          <h3>Fitur lengkap untuk guru dan siswa</h3>
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                              <div className="col-6">
                                 <ul className="about-style">
                                    <li className="abt-hover">
                                       <div className="about-icon">
                                          <div className="icon-hover">
                                             <img src="assets/images/icon2.png" alt="Awasome-Design" />
                                          </div>
                                       </div>
                                       <div className="about-text">
                                          <h3>Tampilan Sederhana dan dalam bahasa indonesia</h3>
                                       </div>
                                    </li>
                                    <li className="abt-hover">
                                       <div className="about-icon">
                                          <div className="icon-hover">
                                             <img src="assets/images/icon4.png" alt="SEO-Friendly" />
                                          </div>
                                       </div>
                                       <div className="about-text">
                                          <h3>Disesuaikan dengan kebutuhan guru dan siswa di Indonesia</h3>
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                           <div className="top-margin">
                              <button type="button" className="btn btn-custom theme-color theme-color" style={{background:'linear-gradient(to right, #93291E, #F27121)'}}>Baca Selengkapnya</button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-7 d-medium-none">
                     <div className="about-right" style={{background: 'linear-gradient(to right, #93291E, #F27121)'}}>
                        <div className="about-phone">
                           <img src="assets/images/aboutus.png" className="img-fluid" alt="aboutus" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      );
   }
}


export default About;