import React,{useState, useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import "./rightbar.css"
import { axiosUserInstance }  from "../../../services/axios/axios";
import { setPosts } from '../../../services/redux/slices/postSlice';
import Post from '../Post/Post'

function Rightbar() {

    const dispatch = useDispatch();
    const loggeduser = useSelector(state => state.user.user);
    // console.log("user data from store in rightbar switch",loggeduser)
    const posts = useSelector(state => state.post.posts) || [];
    // const state = useSelector(state => state); 
    // console.log("Current Redux Store State:", state);

    useEffect(() => {
     axiosUserInstance.get('/loadPost')
      .then(response => {
        // console.log("POST RESPONSE##### ",response.data[2])
        dispatch(setPosts(response.data));
        
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []); 

  return (
    <div className='MainRigntBar'>
      <div className='submainrightbar'>
       {/* post area */}
       <div style={{ flex: 1.7, padding: 20 }}>
          {posts.map((postlist, index) => (
            <Post key={index} postlist={postlist} /> 
          ))}
        </div>
        

        {/* suggestion list area */}
        <div style={{flex:2 }}>
          <div style={{marginRight:"20px"}}>
            {/* profile switch */}
            {loggeduser && (
            <div style={{ display: "flex", alignItems: "center" , marginLeft:20 , marginTop:30 , cursor:"pointer"}}>
             <img src={loggeduser.image} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
              <div style={{marginLeft:10}}>
                <p style={{textAlign:'start'}}>{loggeduser.firstName}</p>
                <p style={{marginTop:-4 , textAlign:'start' , color:"#A8A8A8"}}>{loggeduser.email}</p>
              </div>
              <div style={{marginLeft:"100px" , cursor:"pointer"}}>
                <p style={{color:"#0095f6" , fontSize:15 , fontWeight:"500"}}>Switch</p>
              </div>
            </div>
            )}
 
             {/* suggestion list */}
            <div style={{display:"flex"}}>
              <div>
              <p style={{color:"#A8A8A8" , textAlign:'start',marginLeft:'45',marginTop:30 }}>Sugggested for you</p>
              {/* list */}
              <div style={{display:"flex" , alignItems:"center" , marginLeft:20 , marginTop:10}}>
              <img src="https://cdn.britannica.com/45/223045-050-A6453D5D/Telsa-CEO-Elon-Musk-2014.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                <div>
                  <p style={{marginLeft:10 , textAlign:"start"}}>Elon</p>
                  <p style={{marginTop:-5 , color:"#A8A8A8" , marginLeft:10}}>Follow you</p>
                </div>
                <div style={{marginLeft:"130px" , cursor:"pointer"}}>
                  <p style={{color:"#0095f6"}}>Follow</p>
                </div>
              </div>

              <div style={{display:"flex" , alignItems:"center" , marginLeft:20 , marginTop:10}}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmw7aR4yLNQc85YL1r5VptLhSr-fx-gsMgVjyLrtUTYV9AxkfF-__pzCNu50pWZ8-m2dw&usqp=CAU" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                <div>
                  <p style={{marginLeft:10 , textAlign:"start"}}>Bil G</p>
                  <p style={{marginTop:-5 , color:"#A8A8A8" , marginLeft:10}}>Follow you</p>
                </div>
                <div style={{marginLeft:"130px" , cursor:"pointer"}}>
                  <p style={{color:"#0095f6"}}>Follow</p>
                </div>
              </div>

              <div style={{display:"flex" , alignItems:"center" , marginLeft:20 , marginTop:10}}>
              <img src="https://cdn.geekwire.com/wp-content/uploads/2023/05/bigstock-Jeff-Bezos-and-Lauren-Sanchez-438960968.jpeg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                <div>
                  <p style={{marginLeft:10 , textAlign:"start"}}>Jeff</p>
                  <p style={{marginTop:-5 , color:"#A8A8A8" , marginLeft:10}}>Follow you</p>
                </div>
                <div style={{marginLeft:"130px" , cursor:"pointer"}}>
                  <p style={{color:"#0095f6"}}>Follow</p>
                </div>
              </div>

              <div style={{display:"flex" , alignItems:"center" , marginLeft:20 , marginTop:10}}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                <div>
                  <p style={{marginLeft:10 , textAlign:"start"}}>everyone</p>
                  <p style={{marginTop:-5 , color:"#A8A8A8" , marginLeft:10}}>Follow you</p>
                </div>
                <div style={{marginLeft:"130px" , cursor:"pointer"}}>
                  <p style={{color:"#0095f6"}}>Follow</p>
                </div>
              </div>

              <div style={{display:"flex" , alignItems:"center" , marginLeft:20 , marginTop:10}}>
              <img src="https://images.gamewatcherstatic.com/image/file/1/82/120641/Stray-Doc_s-Lab-Weapon-Location-2.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                <div>
                  <p style={{marginLeft:10 , textAlign:"start"}}>Lilmiquela</p>
                  <p style={{marginTop:-5 , color:"#A8A8A8" , marginLeft:10}}>Follow you</p>
                </div>
                <div style={{marginLeft:"130px" , cursor:"pointer"}}>
                  <p style={{color:"#0095f6"}}>Follow</p>
                </div>
              </div>
              {/* end of list */}

            </div>  
          </div>


          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Rightbar