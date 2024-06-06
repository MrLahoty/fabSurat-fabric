import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/fabsurat_fabric";
  };

  const joinWhatsAppGroup = () => {
    window.open("https://chat.whatsapp.com/CNHjXO1ZgLODaQcHMStFFk", "_blank");
  };

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              alt="Founder"
            />
            <h6>Welcome to FabSurat By House Of Fashion</h6>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <h6>
              This is a sample website For FabSurat
            </h6>
          </div>
          <div className="aboutSectionContainer2">
            <h2>Join Our Instagram Page</h2>
          <a href="https://instagram.com/fabsurat_fabric" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>   
          <Typography component="h2">Join Our WhatsApp Group</Typography>
            <WhatsAppIcon
              className="whatsappSvgIcon"
              onClick={joinWhatsAppGroup}
            />  
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
