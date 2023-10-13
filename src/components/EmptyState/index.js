import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import EmptyImg from "../../assets/images/empty_data.png"

const EmptyState = () => {
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      style={{ height: 175 }}
      direction="column"
    >
      <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
      <Typography
        style={{
          opacity: 0.3,
          textAlign: "center",
          fontSize: 11,
          marginTop: 10,
        }}
      >
        Empty
      </Typography>
    </Grid>
  )
}

export default EmptyState