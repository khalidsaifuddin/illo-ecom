import React from 'react';


class Feature extends React.Component {
   componentDidMount() {
      setTimeout(function () {
         document.querySelector(".loader-wrapper").style = "display: none";
      }, 2000);
   }
   render() {

      return (
         <section id="feature" className="feature">
            <div className="feature-decor">
               <div className="feature-circle1"><img src="assets/images/feature2.png" alt="" /></div>
            </div>
            <div className="container">
               <div className="row">
                  <div className="feature-phone">
                     <img src="assets/images/222.png" className="img-fluid" alt="" />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                     <div className="row">
                        <div className="col-sm-12 mrgn-md-top">
                           <h2 className="title">Fitur<span> Diskuis</span></h2>
                        </div>
                        <div className="col-12 col-md-6">
                           <ul className="feature-style">
                              <li>
                                 <div className="feature-icon">
                                    
                                    <img src="assets/images/icon/5.png" alt="icon" />
                                 </div>
                                 <div className="feature-subtitle">
                                    <h3>Ruang</h3>
                                 </div>
                                 <div>
                                    <p>Seperti ruang kelas pada pembelajaran fisik. Dapatkan kemudahan dalam mengelola angota kelas beserta tugas dan kuisnya</p>
                                 </div>
                              </li>
                              <li>
                                 <div className="feature-icon">
                                    
                                    <img src="assets/images/icon/5.png" alt="icon" />
                                 </div>
                                 <div className="feature-subtitle">
                                    <h3>Kuis</h3>
                                 </div>
                                 <div>
                                    <p>Mengerjakan kuis seperti bermain game! Mudah dan menyenangkan baik untuk guru maupun siswa</p>
                                 </div>
                              </li>
                           </ul>
                        </div>
                        <div className="col-12 col-md-6 sm-m-top">
                           <ul className="feature-style">
                              <li>
                                 <div className="feature-icon">
                                    <img src="assets/images/icon/5.png" alt="icon" />
                                 </div>
                                 <div className="feature-subtitle">
                                    <h3>Materi dan Diskusi</h3>
                                 </div>
                                 <div>
                                    <p>Perlu membagikan materi pelajaran? Atau hanya sekedar berdiskusi antar anggota ruang kelas?</p>
                                 </div>
                              </li>
                              <li>
                                 <div className="feature-icon">
                                    
                                    <img src="assets/images/icon/5.png" alt="icon" />
                                 </div>
                                 <div className="feature-subtitle">
                                    <h3>Fitur Gamifikasi</h3>
                                 </div>
                                 <div>
                                    <p>Peringkat, poin, top rank, dan lain-lain!</p>
                                 </div>
                              </li>
                              <li>
                                 <div className="feature-icon">
                                    
                                    <img src="assets/images/icon/5.png" alt="icon" />
                                 </div>
                                 <div className="feature-subtitle">
                                    <h3>Analisis Kuis</h3>
                                 </div>
                                 <div>
                                    <p>Kemudahan bagi guru dalam mengelola dan menganalisa kusi dan tugas!</p>
                                 </div>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* <div className="container">
               <div className="row">
                  <div className="feature-phone">
                     <img src="assets/images/222.png" className="img-fluid" alt="" />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                     <div className="row">
                        <div className="col-sm-12 mrgn-md-top">
                           <h2 className="title">Fitur<span> Diskuis</span></h2>
                        </div>
                        <div className="col-12 col-md-6">
                           <ul className="feature-style">
                              <li>
                                 <div className="feature-icon">
                                    
                                    <img src="assets/images/icon/5.png" alt="icon" />
                                 </div>
                                 <div className="feature-subtitle">
                                    <h3>Tampilan yang Sederhana</h3>
                                 </div>
                                 <div>
                                    <p>Tampilan yang sangat mudah untuk digunakan baik untuk guru maupun siswa. Sederhana, mudah, dan fokus pada fungsi</p>
                                 </div>
                              </li>
                              <li>
                                 <div className="feature-icon">
                                    
                                    <img src="assets/images/icon/5.png" alt="icon" />
                                 </div>
                                 <div className="feature-subtitle">
                                    <h3>Kaya Fitur</h3>
                                 </div>
                                 <div>
                                    <p>Ada banyak fitur menarik bagi guru maupun siswa seperti ruang diskusi, kuis, media berbagi materi, dan masih banyak lagi </p>
                                 </div>
                              </li>
                           </ul>
                        </div>
                        <div className="col-12 col-md-6 sm-m-top">
                           <ul className="feature-style">
                              <li>
                                 <div className="feature-icon">
                                    <img src="assets/images/icon/5.png" alt="icon" />
                                 </div>
                                 <div className="feature-subtitle">
                                    <h3>Menyenangkan</h3>
                                 </div>
                                 <div>
                                    <p>Serius deh, siapa yang tidak suka dengan belajar yang menyenangkan? Diskuis membuat belajar menjadi tidak membosankan baik bagi guru maupun siswa</p>
                                 </div>
                              </li>
                              <li>
                                 <div className="feature-icon">
                                    
                                    <img src="assets/images/icon/5.png" alt="icon" />
                                 </div>
                                 <div className="feature-subtitle">
                                    <h3>Kearifan Lokal</h3>
                                 </div>
                                 <div>
                                    <p>Aplikasi pembelajaran yang memuat fitur-fitur sesuai dengan kebutuhan guru dan siswa di Indonesia</p>
                                 </div>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div> */}
         </section>
      );
   }
}


export default Feature;