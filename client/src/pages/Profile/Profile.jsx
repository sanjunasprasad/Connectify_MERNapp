import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../services/axios/axios';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'
import  "./profile.css"
import  ProductTwo  from "../../components/User/testpost/ProductTwo";
import Sidebar from '../../components/User/Sidebar/Sidebar'
import SettingIcon from "../../Icons/Settingslogo.png"

export default function Profile() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      axiosInstance
        .get("/userProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.firstName);
          console.log("response from back to userprofilehomepage:",response.data.firstName)
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  },[]);

  const Handleprofilepic = async () => {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: 'Your uploaded picture',
          imageUrl: e.target.result,
          imageAlt: 'The uploaded picture',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div>
          <div className='homesubcontainer'>
              <div className='homesidebar'>
                  <Sidebar />
              </div>

              {/* rightside accountprofile */}
              <div className='Profilerightbar'>
                <div className='subProfilerightbar'>
                  <div >
                    <img src="https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg=" style={{width:"150px" , height:"150px" , objectFit:"cover" , borderRadius:"50%",cursor:"pointer"}} alt="" />
                  </div>
                  <div>
                    <div style={{display:'flex' , alignItems:'center'}}>
                      <p style={{marginLeft:100,fontWeight:1000}}>{user}</p>
                      <button style={{paddingLeft:10 , marginLeft:20 , paddingRight:20 , paddingTop:8 , paddingBottom:8 , borderRadius:10 , border:"none" , cursor:"pointer"}}>Edit profile</button>
                      <img src={SettingIcon} style={{marginLeft:20 , cursor:"pointer"}} alt="" />
                    </div>
                    <div style={{display:'flex' , alignItems:'center'}}>
                      <p style={{marginLeft:100}}>1 Post</p>
                      <p style={{marginLeft:40}}>200k Followers</p>
                      <p style={{marginLeft:40}}>10k Following</p>
                    </div>
                    <div style={{ alignItems:'center'}}>
                      <p style={{marginLeft:100 , marginTop:8 }}>bio</p>
                      <p style={{marginLeft:100 , marginTop:8 }}>lives in</p>
                      <p style={{marginLeft:100 , marginTop:8 }}>profession</p>
                    </div>
                  </div>
              </div>

              {/* <div className='postContainerForProfile'>
                {PostExplore.map((item)=>(
                  <Explorepost item={item}/>
                ))}
              </div> */}

              <div className='postContainerForProfile'>
                  <ProductTwo/>
              </div>

              </div>
          </div>
      </div>
    </div>
  )
}
