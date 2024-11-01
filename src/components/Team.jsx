import React from "react";
import "../styles/Team.css";

const teamMembers = [
  {
    name: "Rani Bungay",
    role: "Full Stack Developer",
    image: "../img/Rani.jpg", // Add a path to the member's image
    bio: "Rani is a dedicated Full Stack Developer with a passion for building robust backend systems. With expertise in server-side technologies and database management, he ensures that applications run smoothly and efficiently. Rani thrives on problem-solving and enjoys collaborating with team members to create seamless integrations that enhance user experience.",
  },
  {
    name: "Reuben Erlich",
    role: "Full Stack Developer",
    image: "../img/Reuben.jpg",
    bio: "Reuben is a versatile Full Stack Developer known for his adaptability and collaborative spirit. With experience across both frontend and backend development, he plays a crucial role in bridging gaps within the team, ensuring that projects are delivered on time and meet quality standards. Reuben enjoys tackling challenges and is committed to continuous learning and improvement in the fast-paced tech landscape.",
  },
  {
    name: "Norman Li",
    role: "Full Stack Developer",
    image: "../img/Norman.jpg",
    bio: "Norman is a creative Full Stack Developer who specializes in crafting engaging and user-friendly interfaces. His strong foundation in frontend technologies allows him to bring designs to life, ensuring an intuitive experience for users. Norman is enthusiastic about staying current with industry trends and using innovative approaches to enhance the overall functionality of applications.",
  },
  // Add more team members as needed
];

const TeamMember = ({ member }) => {
  return (
    <div className="team-member">
      <img src={member.image} alt={member.name} className="member-image" />
      <h3>{member.name}</h3>
      <h4>{member.role}</h4>
      <p>{member.bio}</p>
    </div>
  );
};

const Team = () => {
  return (
    <div className="team-container">
      <h2>Meet the Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
