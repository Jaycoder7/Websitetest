import manto from "../../assets/images/manto.png";
import team8866 from "../../assets/images/IA.png";
import close from "../../assets/images/close.png";
import "../../assets/scss/footer.scss";
import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<footer>
			<div className="top">
				<div className="left">
		
					<img src={team8866} alt="" />
				</div>
				<div className="right">
					
				</div>
			</div>
			<div className="bottom">
				<p>
					Copyright 2022 Made by
					<a href="https://iarobotics8866.wixsite.com/my-site">
						Team 3161 Modified by 8866
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
