import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUserMinus, faPowerOff, faUser, faStopCircle, faMapMarkedAlt, faPhoneVolume, faCar, faExclamationCircle, faWalking, faPhone } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  
  library.add(faLink, faUserMinus, faUser, faPowerOff, faStopCircle, faMapMarkedAlt, faPhoneVolume, faCar, faExclamationCircle, faWalking);
}

export default initFontAwesome;
