import {Grid} from "@mui/material";


const Profile = () => {
  return <>
      <div className="section">
          <h2>Account Details</h2>
          <div
              style={{
                  padding: '40px',
                  borderRadius: '20px',
                  border: '1px solid #ccc'
              }}
          >
              <Grid container rowSpacing={5}>
                  <Grid size={2}><b>Name</b></Grid>
                  <Grid size={10}>Name</Grid>
                  <Grid size={2}><b>Name</b></Grid>
                  <Grid size={10}>Name</Grid>


              </Grid>
          </div>
      </div>

      <div className="section">
          <h2>Booking History</h2>
      </div>
  </>
};

export default Profile;