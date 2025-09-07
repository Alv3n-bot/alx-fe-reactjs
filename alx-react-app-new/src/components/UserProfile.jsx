const UserProfile = (props) => {
  return (
    <div style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "15px",
        margin: "15px",
        backgroundColor: "#f9f9f9",
      }}>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
