function UserInfo({ user }) {
    return (
      <div style={{marginTop: "25px", marginBottom: "10px"}}>
        <div style={{fontSize: "xx-large", fontWeight: "bold"}}>Hello, {user !== null ? user.username : "Guest"}!</div>
        <div>
          {
            user === null ? "You're currently playing as a guest. Register and/or log in to save your game progress." :
            "You're currently logged in. Your game progress will be saved."
          }
        </div>
      </div>
    );
  }
  
  export default UserInfo;