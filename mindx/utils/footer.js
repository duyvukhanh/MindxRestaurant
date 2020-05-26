let footerContent = `
<div class="footer-content text-light d-flex justify-content-center align-items-center"
                style="font-family: 'Poppins', sans-serif; font-size: 12px; letter-spacing: 5px;">
                MINDX RESTAURANT<i class="far fa-copyright mx-3"></i> 2020
            </div>
`;

let contactContent = `
<div class="d-flex h-100" style="width: 70%; margin:auto">
                <div class="contact-area-content1" style="flex-grow: 1;flex-basis: 0;">
                    <h1 class="text-light" style="font-family: 'Poppins', sans-serif; letter-spacing: 5px;">CONTACT US
                    </h1>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        <i class="fas fa-map-marker-alt"></i>
                        6th floor, 22C Thanh Cong Str, Ba Dinh, Ha Noi
                    </div>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        <i class="fas fa-phone-alt"></i>
                        024 777 51 999
                    </div>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        <i class="fas fa-envelope"></i>
                        mindx@gmail.com
                    </div>
                    <h1 class="text-light"
                        style="font-family: 'Poppins', sans-serif; letter-spacing: 5px; margin-top: 50px">
                        OPENING TIME</h1>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        09:30 AM – 11:00 PM
                    </div>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        Every Day
                    </div>
                </div>
                <div class="contact-area-content1" style="flex-grow: 1;flex-basis: 0;">
                    <h1 class="text-light" style="font-family: 'Poppins', sans-serif; letter-spacing: 5px;">BRANCHES
                    </h1>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        <i class="fas fa-map-marker-alt"></i>
                        6th floor, 22C Thanh Cong Str, Ba Dinh, Ha Noi
                    </div>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        <i class="fas fa-map-marker-alt"></i>
                        2nd floor, 29T1 Hoang Dao Thuy, Ha Noi
                    </div>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        <i class="fas fa-map-marker-alt"></i>
                        6th floor, 107 Nguyen Phong Sac, Cau Giay, Ha Noi
                    </div>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        <i class="fas fa-map-marker-alt"></i>
                        5th floor, 71 Nguyen Chi Thanh, Ba Dinh, Ha Noi
                    </div>
                    <div class="text-light" style="font-family : 'Montserrat';">
                        <i class="fas fa-map-marker-alt"></i>
                        253 Dien Bien Phu, District 3, Ho Chi Minh City
                    </div>
                </div>
                <div class="contact-area-content2" style="flex-grow: 1;flex-basis: 0;">
                    <h1 class="text-light" style="font-family: 'Poppins', sans-serif; letter-spacing: 5px;">GALLERY</h1>
                    <div class="map-area d-flex">
                        <div class="d-flex" style="flex-basis: 0; flex-grow: 1; flex-direction: column;">
                            <div class="homepage-gallery-item" style="flex-grow: 1; flex-basis: 0;">
                                <div style="background-image: url('../image/gallery/1.jpg')"></div>
                            </div>
                            <div class="homepage-gallery-item" style="flex-grow: 1; flex-basis: 0;">
                                <div style="background-image: url('../image/gallery/2.jpg')"></div>

                            </div>
                            <div class="homepage-gallery-item" style="flex-grow: 1; flex-basis: 0;">
                                <div style="background-image: url('../image/gallery/3.jpg')"></div>

                            </div>
                        </div>
                        <div class="d-flex" style="flex-basis: 0; flex-grow: 1; flex-direction: column;">
                            <div class="homepage-gallery-item" style="flex-grow: 1; flex-basis: 0;">
                                <div style="background-image: url('../image/gallery/4.jpg')"></div>

                            </div>
                            <div class="homepage-gallery-item" style="flex-grow: 1; flex-basis: 0;">
                                <div style="background-image: url('../image/gallery/5.jpg')"></div>
                            </div>
                            <div class="homepage-gallery-item" style="flex-grow: 1; flex-basis: 0;">
                                <div style="background-image: url('../image/gallery/6.jpg')"></div>
                            </div>
                        </div>
                        <div class="d-flex" style="flex-basis: 0; flex-grow: 1; flex-direction: column;">
                            <div class="homepage-gallery-item" style="flex-grow: 1; flex-basis: 0;">
                                <div style="background-image: url('../image/gallery/7.jpg')"></div>
                            </div>
                            <div class="homepage-gallery-item" style="flex-grow: 1; flex-basis: 0;">
                                <div style="background-image: url('../image/gallery/8.jpg')"></div>
                            </div>
                            <div class="homepage-gallery-item" style="flex-grow: 1; flex-basis: 0;">
                                <div style="background-image: url('../image/gallery/9.jpg')"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
`;

let subscribeContent = `
<div class="d-flex align-items-center">
                <div style="font-family: 'Poppins', sans-serif; font-size: 20px; letter-spacing: 6px;">SUBSCRIBE</div>
                <div class="input-group sub-input">
                    <input type="text" class="" placeholder="Email address">
                    <button type="button" class="btn btn-dark">SUBMIT</button>
                </div>
            </div>
`;


document.getElementById("footer").innerHTML = footerContent;
document.getElementById("contact").innerHTML = contactContent;
document.getElementById("subscribe").innerHTML = subscribeContent;
