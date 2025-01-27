import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaAppStore, FaInstagram, FaSnapchat, FaWhatsapp, FaYoutube } from "react-icons/fa";
import '@fortawesome/fontawesome-free/css/all.css';
import "./Footer.css";

const Footer = () => {

  const [instagramColor, setInstagramColor] = useState("#2c2c2c");
  const [whatsappColor, setWhatsappColor] = useState("#2c2c2c");
  const [instagramTextColor, setInstagramTextColor] = useState("#2c2c2c");
  const [whatsappTextColor, setWhatsappTextColor] = useState("#2c2c2c");
  const [youtubeColor, setYoutubeColor] = useState("#2c2c2c");
  const [youtubeTextColor, setYoutubeTextColor] = useState("#2c2c2c");
  const [snapchatColor, setSnapchatColor] = useState("#2c2c2c");
  const [snapchatTextColor, setSnapchatTextColor] = useState("#2c2c2c");
  const [mojColor, setMojColor] = useState("#2c2c2c");
  const [mojTextColor, setMojTextColor] = useState("#2c2c2c");

  const phoneNumber = "+917003798513";
  const emailAddress = "officialfabsurat@gmail.com";
  const addressUrl = "https://maps.app.goo.gl/qEM4PxPP3q62CjKD7";
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isForgotPasswordPage = location.pathname === "/password/forgot";
  const isResetPasswordPage = location.pathname === "/password/reset/:token";

  if (isLoginPage || isForgotPasswordPage || isResetPasswordPage) {
    return null;
  }

  return (

    <footer id="footer">

    <div className="leftFooter">

      <h5>Contact Information</h5>
      <a href={`tel:${phoneNumber}`} className="leftFooter-link ">
        <p>
          <i className="fas fa-phone"></i> {phoneNumber}
        </p>
      </a>
      <a href={`mailto:${emailAddress}`} className="leftFooter-link ">
        <p>
          <i className="fas fa-envelope"></i> {emailAddress}
        </p>
      </a>
      <a href={addressUrl} target="_blank" rel="noopener noreferrer" className="leftFooter-link ">
        <p>
          <i className="fas fa-map-marker-alt"></i>Shop No. 1013-14, Block A, 1st Floor, Global Textile Market, Sahara Darwaja, Surat, Gujarat, 395002
        </p>
      </a>
    </div>
  
    <div className="midFooter">
    <a href="/" className="logoss">
          <p>F A B S U R A T</p>
      </a>

      <div className="footer-links">
      <a href="/PrivacyPolicy"><i className="fas fa-shield-alt"></i> Privacy Policy</a>
      <a href="/Return&Refund"><i className="fas fa-undo-alt"></i> Return/Refund Policy</a>
      <a href="/Shipping&Payment"><i className="fas fa-credit-card"></i> Shipping & Payment Policy</a>
      <a href="/Terms&Condition"><i className="fas fa-file-contract"></i> Terms & Conditions</a>
      <a href="/about"><i className="fas fa-info-circle"></i> About Us</a>
      <a href="/contact"><i className="fas fa-envelope"></i> Contact Us</a>
      </div>

       <div className="svgs"> 
        <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-google_pay" style={{ marginRight: "5px" }}><title id="pi-google_pay">Google Pay</title><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity=".07"/><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"/><path d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z" fill="#5F6368"/><path d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z" fill="#4285F4"/><path d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z" fill="#34A853"/><path d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z" fill="#FBBC04"/><path d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z" fill="#EA4335"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img" width="38" height="24" aria-labelledby="pi-master" style={{ marginRight: "5px" }}><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><circle fill="#EB001B" cx="15" cy="12" r="7"/><circle fill="#F79E1B" cx="23" cy="12" r="7"/><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img" width="38" height="24" aria-labelledby="pi-visa" style={{ marginRight: "5px" }}><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" role="img" width="38" height="24" aria-labelledby="pi-rupay" style={{ marginRight: "5px" }}><title id="pi-rupay">Rupay</title><g fill="none" fill-rule="evenodd"><path fill="#FFFFFF" d="M0 0h100v60H0z"/><g fill-rule="nonzero"><path fill="#097A44" d="M76.765 37.755l4.117-15.243L85 30.37z"/><path fill="#F46F20" d="M74.212 37.797l4.117-15.223 4.118 7.858z"/>
        <path fill="#302F82" d="M53.438 22.183a4.12 4.12 0 00-3.212-1.152H44.05L40.035 35.04h3.603l1.36-4.752h2.531a7.004 7.004 0 003.912-1.029 6.027 6.027 0 002.306-3.538 3.639 3.639 0 00-.309-3.538zm-6.609 1.934h2.306c.404-.048.81.062 1.133.308.226.226.144.72 0 1.09-.117.509-.408.96-.824 1.276a2.49 2.49 0 01-1.441.411h-2.12l.946-3.085zM29.7 23.829a3.372 3.372 0 00-.412-1.255 2.676 2.676 0 00-1.194-1.09 5.666 5.666 0 00-2.223-.37h-6.753L15 34.998h3.562l1.482-5.184h2.574c.967 0 1.194.206 1.235.267.041.062.185.309 0 1.337l-.33 1.235a6.886 6.886 0 00-.226 1.213V35h3.685l.247-.885-.226-.164s-.144-.103-.124-.412a6.85 6.85 0 01.268-1.152l.206-.864c.27-.73.34-1.517.206-2.283a1.81 1.81 0 00-.535-.844 4.117 4.117 0 001.4-1.11c.5-.604.871-1.305 1.09-2.058.145-.452.209-.925.186-1.398zm-3.83 1.707a1.728 1.728 0 01-1.029 1.234c-.424.141-.87.204-1.317.185h-2.636l.783-2.736h2.944c.373-.029.748.035 1.09.186.104 0 .433.144.166 1.028v.103zM35.96 30a4.339 4.339 0 01-.618 1.378 2.06 2.06 0 01-1.791.885c-.7 0-.741-.288-.782-.412-.03-.362.02-.727.144-1.07l1.832-6.397h-3.48l-1.77 6.171a6.167 6.167 0 00-.309 2.716c.165.864.824 1.872 2.903 1.872a5.022 5.022 0 001.503-.206 5.17 5.17 0 001.235-.596l-.164.617h3.335l3.027-10.553h-3.377L35.96 30zm26.62 2.263l1.297-4.485c.495-1.707-.144-2.489-.761-2.86a5.665 5.665 0 00-2.82-.678 5.912 5.912 0 00-4.119 1.399 5.656 5.656 0 00-1.42 2.263l-.185.535h3.314v-.227c.12-.285.295-.543.515-.76.33-.252.74-.376 1.153-.35.325-.03.652.026.947.164v.37c0 .124 0 .309-.515.473-.32.107-.652.176-.988.206l-.906.103a8.24 8.24 0 00-2.573.658 4.401 4.401 0 00-2.368 2.86 2.57 2.57 0 00.35 2.51 2.903 2.903 0 002.306.905 5.006 5.006 0 002.203-.515l.823-.473v.679h3.52l.269-.987-.268-.144a1.254 1.254 0 010-.453c0-.514.144-.885.226-1.193zm-6.011-.206c.1-.364.356-.666.7-.823a4.47 4.47 0 011.173-.308l.597-.103.618-.144v.144a2.55 2.55 0 01-1.05 1.543 2.966 2.966 0 01-1.482.432.7.7 0 01-.515-.165 1.13 1.13 0 01-.041-.576zm16.285-7.57l-3.48 6.171v-6.171h-3.705l.803 10.553-.247.39c-.12.204-.281.38-.474.515a1.33 1.33 0 01-.494.165h-1.4l-.803 2.818h1.709a4.12 4.12 0 002.656-.7c1-1.07 1.877-2.25 2.614-3.517l6.527-10.286-3.706.062z"/></g></g></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" role="img" width="38" height="24" aria-labelledby="pi-paytm" style={{marginRight: "5px"}}><title id="pi-paytm">Paytm</title><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0h100v60H0z"/><g fill-rule="nonzero"><path fill="#22346C" d="M41.834 31.599v4.771c.046.824-.53 1.548-1.327 1.67h-4.844a3.239 3.239 0 01-2.57-.908 3.398 3.398 0 01-1.019-2.579 27.518 27.518 0 01.108-3.817c.227-1.558 1.494-2.739 3.032-2.826h2.135a.55.55 0 00.514-.2.58.58 0 00.096-.553.618.618 0 00-.052-.464.594.594 0 00-.36-.288h-3.194c-.682 0-.825-.147-.825-.863v-2.037a.56.56 0 01.091-.418.537.537 0 01.357-.224h4.288a3.319 3.319 0 012.592 1.114c.662.742.974 1.743.853 2.74.143 1.67.125 3.285.125 4.882zm-5.956 2.459a.62.62 0 00.556.66h1.095a.584.584 0 00.467-.168.613.613 0 00.178-.474v-2.074c0-.55-.287-.66-1.291-.66-1.005 0-.951.183-1.005.679v2.037zm17.188-5.01v5.157a3.725 3.725 0 01-.858 2.678 3.56 3.56 0 01-2.462 1.267h-4.395c-.61 0-.754-.128-.754-.77v-2.313a.56.56 0 01.117-.443.534.534 0 01.404-.2h3.588a.566.566 0 00.467-.155.595.595 0 00.179-.468.614.614 0 00-.148-.44.587.587 0 00-.408-.202H47c-1.909.062-3.51-1.462-3.588-3.414V23.67a.586.586 0 01.467-.679h2.404c.61 0 .753.184.753.826v4.772c0 .826.18.99.987.99h.09c1.112 0 1.202-.09 1.202-1.21V23.67a.673.673 0 01.095-.743.636.636 0 01.712-.174h2.171c.21-.04.425.028.575.182a.67.67 0 01.179.589c.018 1.982.018 3.707.018 5.524zm-28.455 4.68v3.56c0 .844-.108.936-.933.936H21.56a.53.53 0 01-.502-.147.559.559 0 01-.144-.514V23.67a.513.513 0 01.395-.587h6.225c1.583.038 2.86 1.336 2.907 2.955a33.076 33.076 0 010 4.57c0 1.756-1.387 3.183-3.104 3.193H24.61v-.074zm0-3.818h1.543a.58.58 0 00.574-.569v-2a.584.584 0 00-.502-.642h-1.58v3.193l-.035.018z"/>
        <path fill="#24B8EB" d="M68.334 23.67a3.88 3.88 0 015.13.184c.66-.372 1.351-.685 2.064-.936a3.667 3.667 0 013.159.706 3.849 3.849 0 011.434 2.964v10.7c0 .66-.162.826-.807.826H77.25a.619.619 0 01-.586-.172.652.652 0 01-.167-.6v-9.616a1.114 1.114 0 00-.391-.988 1.057 1.057 0 00-1.027-.186c-.523.058-.91.526-.879 1.064v9.91a.568.568 0 01-.448.661h-2.566a.53.53 0 01-.447-.13.557.557 0 01-.18-.439v-9.965a.885.885 0 00-.521-1.01 2.422 2.422 0 00-1.274 0 .887.887 0 00-.466.973v9.562c0 .88-.108 1.01-1.005 1.01h-1.794c-.646 0-.754-.148-.754-.808V23.67c0-.77.108-.862.826-.862h1.955a.744.744 0 01.604.235.782.782 0 01.204.627zm-9.743 3.01H57.21a.583.583 0 01-.576-.149.615.615 0 01-.16-.585V23.67a.568.568 0 01.449-.66h.18a3.574 3.574 0 003.121-1.835 3.628 3.628 0 011.04-1.047c.431-.293.754 0 .79.496v2.33h1.256c.21-.04.425.029.575.183a.67.67 0 01.179.589v2.238a.652.652 0 01-.168.6.619.619 0 01-.586.171h-1.184v10.7c0 .77-.126.88-.843.899h-1.956a.6.6 0 01-.598-.16.634.634 0 01-.155-.61c.017-3.433.017-10.608.017-10.865v-.019z"/></g></g></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" width="38" height="24" style={{marginRight: "5px"}}>
        <g fill="none" fill-rule="evenodd">
          <path fill="#FFF" d="M0 0h100v60H0z"/><title id="pi-MobiKwik">MobiKwik</title>
           <g fill-rule="nonzero">
        <path fill="#26BCBC" d="M69.839 24.617a5.945 5.945 0 00-1.764.175c-.441.087-.865.296-1.323.4-.38.064-.762.105-1.147.122.124-1.742.212-3.484.353-5.227a1.726 1.726 0 00-.335-1.324 1.769 1.769 0 00-1.2-.68 13.164 13.164 0 00-1.887 0v-.713a1.298 1.298 0 00-.443-1.153 1.335 1.335 0 00-1.216-.276l-1.235.191-12.348 2.039v12.335a6.792 6.792 0 01-.353 1.586c-.141.54-.3 1.097-.459 1.742a.276.276 0 000 .244l6.616-12.77a1.894 1.894 0 012.205-1.081c.886.185 1.51.97 1.482 1.864v16.9a1.914 1.914 0 01-1.914 1.718c-.991 0-1.82-.744-1.914-1.718V30.28h-.142l-5.15 9.757c-.2.383-.412.749-.636 1.097a1.935 1.935 0 01-2.134.784 1.745 1.745 0 01-1.324-1.742V25.175h-.229l-9.561 17.928a1.974 1.974 0 01-1.66 1.177 1.984 1.984 0 01-1.827-.902 1.93 1.93 0 01-.041-2.017 393.904 393.904 0 003.157-5.82l8.68-16.499-11.15 1.742A2.496 2.496 0 0029 22.422v22.79a1.764 1.764 0 001.764 1.15h26.973a1.972 1.972 0 002.117-1.604l.106-.4h1.94a1.434 1.434 0 001.324-.68c.227-.358.388-.753.476-1.167.141-.767.194-1.568.282-2.352.306-2.811.606-5.628.9-8.45a.329.329 0 01.092-.246.337.337 0 01.243-.103c.459 0 .882-.157 1.323-.244a7.995 7.995 0 003.281-1.307 3.47 3.47 0 001.517-3.136 1.884 1.884 0 00-1.499-2.056zm-5.945-4.53c-.176 1.168-.247 2.37-.37 3.485-.212 2.056-.406 4.112-.618 6.185l-.635 6.15a788.794 788.794 0 01-.582 5.227c-.03.35-.226.665-.53.848-.303.182-.677.21-1.005.076L62.518 18.1c.339.242.663.504.97.784a1.3 1.3 0 01.406 1.185v.017zM68.25 28.8a1.525 1.525 0 01-1.089-.488 1.487 1.487 0 01-.393-1.115c0-.818.672-1.48 1.5-1.48a1.516 1.516 0 011.517 1.515 1.517 1.517 0 01-1.535 1.498v.07zm.988-1.603a.964.964 0 01-.952.94.947.947 0 01-.953-.94c0-.52.426-.94.953-.94.526 0 .952.42.952.94z"/>
        <path fill="#00AAA8" d="M31.4 44.427a1.964 1.964 0 01-1.3-1.258c-.2-.603-.09-1.264.294-1.773.952-2.004 1.993-3.938 3.016-5.854l10.144-19.253a1.984 1.984 0 012.54-1.063 2.003 2.003 0 00-2.628.994L33.04 35.664c-1.06 1.986-2.117 3.936-3.14 5.906a1.95 1.95 0 00.185 2.352 2.01 2.01 0 002.337.488 1.982 1.982 0 01-1.093 0l.07.017zM53.185 21.22a1.876 1.876 0 011.905-.993 1.895 1.895 0 00-2.029.958c-1.429 2.736-3.722 7.353-5.15 10.245l5.274-10.21zm1.764 19.653a1.911 1.911 0 01-1.923-1.9v-8.71h-.212.106v8.833c0 1.058.869 1.916 1.94 1.916 1.072 0 1.941-.858 1.941-1.916v-.174a1.886 1.886 0 01-.55 1.383 1.935 1.935 0 01-1.39.568h.088zm1.8-18.904a1.72 1.72 0 010 .192v-.192zM44.876 41.901a1.745 1.745 0 01-1.323-1.742V25.175h-.212v15.158c.02.822.588 1.533 1.394 1.742a1.957 1.957 0 001.905-.523 1.942 1.942 0 01-1.764.349z"/>
      </g>
    </g>
  </svg>
  </div>

  <div className="copyrights">
      <h6> &copy; {new Date().getFullYear()} FabSurat. All rights reserved.</h6>
  </div>
</div>

<div className="footer-social-icon">
  <h5>Follow Us</h5>
  <a
    href="https://instagram.com/fabsurat_fabric"
    onMouseEnter={() => {
      setInstagramColor("#eb4034");
      setInstagramTextColor("#eb4034");
    }}
    onMouseLeave={() => {
      setInstagramColor("#2c2c2c");
      setInstagramTextColor("#2c2c2c");
    }}
    target="_blank" rel="noopener noreferrer"
    style={{ color: instagramTextColor }}
  >
    <FaInstagram style={{ color: instagramColor, marginRight: "3px" }} />
    Instagram
  </a>
  <a
    href="https://chat.whatsapp.com/CNHjXO1ZgLODaQcHMStFFk"
    onMouseEnter={() => {
      setWhatsappColor("green");
      setWhatsappTextColor("green");
    }}
    onMouseLeave={() => {
      setWhatsappColor("#2c2c2c");
      setWhatsappTextColor("#2c2c2c");
    }}
    target="_blank" rel="noopener noreferrer"
    style={{ color: whatsappTextColor }}
  >
    <FaWhatsapp style={{ color: whatsappColor, marginLeft: "2px" }} />
    WhatsApp
  </a>
  <a
    href="https://www.youtube.com/@fabsurat_fabric"
    onMouseEnter={() => {
      setYoutubeColor("#FF0000");
      setYoutubeTextColor("#FF0000");
    }}
    onMouseLeave={() => {
      setYoutubeColor("#2c2c2c");
      setYoutubeTextColor("#2c2c2c");
    }}
    target="_blank" rel="noopener noreferrer"
    style={{ color: youtubeTextColor }}
  >
    <FaYoutube style={{ color: youtubeColor, marginRight: "7px" }} />
    YouTube
  </a>
  <a
    href="https://www.snapchat.com/add/fabsurat?share_id=tFRAN8MIVSw&locale=en-IN"
    onMouseEnter={() => {
      setSnapchatColor("rgb(255, 255, 0)"); // Lighter yellow
      setSnapchatTextColor("rgba(10, 10, 5, 0.8)"); // Lighter yellow
    }}
    onMouseLeave={() => {
      setSnapchatColor("#2c2c2c");
      setSnapchatTextColor("#2c2c2c");
    }}
    target="_blank" rel="noopener noreferrer"
    style={{ color: snapchatTextColor }}
  >
    <FaSnapchat style={{ color: snapchatColor, marginRight: "7px" }} />
    Snapchat
  </a>
  <a
    href="https://mojapp.in/@fabsurat?referrer=UXaYIxl-1Hnx5pF" 
    onMouseEnter={() => {
      setMojColor("#FF4500");
      setMojTextColor("#FF4500");
    }}
    onMouseLeave={() => {
      setMojColor("#2c2c2c");
      setMojTextColor("#2c2c2c");
    }}
    target="_blank" rel="noopener noreferrer"
    style={{ color: mojTextColor }}
  >
    <FaAppStore style={{ color: mojColor, marginRight: "7px", marginLeft: "-40px" }} />
    Moj
  </a>
  </div>

</footer>

  );
};

export default Footer;