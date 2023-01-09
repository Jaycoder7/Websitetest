import "../assets/scss/aboutus.scss";
import pooria from "../assets/images/pooria.jpeg";
import cuteTeam3161 from "../assets/images/cuteteam3161.svg";
const About = () => {
	return (
		<div className="aboutus">
			<div className="history">
				<h1>History</h1>
				<p>
				Pooria Ahmadi made this app and I modified it	
				</p>
				<p>
					
				</p>
			</div>
			<div className="developers">
				<h1>Developers</h1>
				<div className="people">
					<div className="person">
						<img src={pooria} alt="" />
						<h1>Jyotil Agrawal</h1>
						<p className="role">Founder</p>
						<div className="links">
							<a href="https://github.com/pooriaahmadi/">
								GitHub
							</a>
							<a href="https://www.instagram.com/pooriaahmadi444/">
								Instagram
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="developers">
				<h1>Sponsors</h1>
				<div className="people">
					<div className="person">
						<img src={cuteTeam3161} alt="" />
						<h1>Innovation Robotics</h1>
						<p className="role gold">Gold sponsor</p>
						<div className="links">
							<a href="https://github.com/frc3161/">GitHub</a>
							<a href="https://iarobotics8866.wixsite.com/my-site">Website</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
