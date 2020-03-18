import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser, faStopCircle, faMapMarkedAlt, faPhoneVolume, faCar, faExclamationCircle, faWalking, faPhone } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  // library.add(faLink);
  // library.add(faUser);
  // library.add(faPowerOff);
  // library.add(faStopCircle);
  // library.add(faMapMarkedAlt);
  // library.add(faPhoneVolume);
  // library.add(faCar);
  // library.add(faExclamationCircle);
  // library.add(faWalking);

  library.add(faLink, faUser, faPowerOff, faStopCircle, faMapMarkedAlt, faPhoneVolume, faCar, faExclamationCircle, faWalking);
}

export default initFontAwesome;
