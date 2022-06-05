import React from "react";
import { Grid, Typography } from "@mui/material"

export default function Home(params) {
    return (
        <Grid container sx={{ alignItems: "center", justifyContent: "center", mt: 20 }}>
                <Typography variant="h1" sx={{ fontFamily: "Nunito", fontWeight: "normal" }}>Let's start with Artha ...</Typography><br />
                <Grid container sx={{ width: "75%", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="body2" sx={{ fontFamily: "Nunito", mt: 5 }}>In simple words, Artha can be well described as an inventory management software that
                        can play a vital role for shaping a business as it stores the transaction details of every item as well
                        as keep records of customer details which reduces a huge amount of time and effort. By the help
                        of artificial intelligence, Artha will allow its client to analyze the data for determining whether
                        their business is in profit or in loss as well as study the peak selling hour of a specific item. One
                        of the advantages of Artha is that it can be implemented in any kind of business such as foods,
                        clothes and so on</Typography>
            </Grid>     </Grid>
    )
}