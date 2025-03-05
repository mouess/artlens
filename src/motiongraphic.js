import React from "react";

const motiongraphic = ({data}) =>{

    return(
        <>
        <div>
        <h1>motiongraphic</h1>
        <img src={data?.images?.find(img => img.name === "work1")?.src} 
                        alt="PHOTO" width="600px"
                        style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundAttachment: "fixed",
                            width: "100%",
                            paddingTop: "30px",
                            paddingBottom: "30px",
                            alignItems: "center",
                            textAlign: "center",
                            filter: "brightness(2)",
                        }}
                        />
        </div>
        </>
    )
}
export default motiongraphic