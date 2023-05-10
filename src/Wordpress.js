import React, { useEffect, useState } from 'react'
import "./wordpress.css"
function Wordpress() {
    
    const [name,setName]=useState()
    const [password,setPassword]=useState()

    const [token,setToken]=useState(false)

    const [content,setContent]=useState("")
    const[title,setTitle]=useState('')
    const [slug,setSlug]=useState('')
    // const [message,setmessage]=useState(null)
// post function

const PostToken=async()=>{
  
console.log(localStorage.getItem("token"))
  let arr=JSON.parse(content) 
console.log(arr)
  let post_content = '';

  arr.forEach(item => {
    post_content += `
    
    <div class='book'>
    <div><a href=${item.url} target="_blank"  rel="noreferrer noopener"><img src=${item.img} alt="${item.title}" class="img" /></a></div>
     
    <div class=image>
    <h3>${item.title}</h3>
    </div>
    <p style='color:green;' class='bookp'>${item.Author}</p>
    <div class="info">
        

              <a href=${item.url} target="_blank" ><button class="button">Buy Now</button>
          </a>
        
      </div>
    </div>
 
    `;
  });
  const res= await fetch("/wp-json/wp/v2/posts",
  {method:"POST",
    headers:{
    'Content-Type':"application/json",
    "accept":'application/json',
    'Authorization':`Bearer ${JSON.parse(localStorage.getItem('token'))}`

  }
  ,
  body:JSON.stringify(
          {
           title: title,
           content: `<div class="maindiv">${post_content}</div>`,
           slug:slug
          }
      // {
      //     username:"admin",
      //     password:"JEuvDZpzJspRP#&hf%00CW2o"
      // }
   
  )
      
  }
    ).then((res)=>{return res.json()}).then((data)=>{
      console.log(data)
      window.location.reload()
    })
}


    // authentication
    const Login=async(e)=>{
      e.preventDefault()
        const res= await fetch("/wp-json/jwt-auth/v1/token",
        {method:"POST",
          headers:{
          'Content-Type':"application/json",
          "accept":'application/json',
          'Access-Control-Allow-Origin':'*'
        //'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Jlc3Rib29raHViLmNvbSIsImlhdCI6MTY3ODA5NDQ2NiwibmJmIjoxNjc4MDk0NDY2LCJleHAiOjE2Nzg2OTkyNjYsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.DOQDU8hD8ytBWdxo1vEwHo02x8-SCVeHWnXZl9XXIQA'
        }
        ,
        body:JSON.stringify(
           
            
            {
              username:name,
              password:password        //"Aj@j5%#HANUMAN"
          }
        ), mode: 'cors'
            
        }
          ).then((res)=>{return res.json()}).then((data)=>{
            // console.log(data.token)
          return data.token
          })
          console.log(res+"ddjjv")
          localStorage.setItem("token",JSON.stringify(res));
          
    }
    useEffect(()=>{
      if(localStorage.getItem("token")){
       setToken(true)
      }else{
        setToken(false)
        // window.location.reload()
      }
    },[])
    
  return (
    <div>
{token?<div> 
  <textarea style={{width:'80%',height:"60vh"}} placeholder="Content ,scraped json data "  onChange={(e)=>{
  setContent(e.target.value)
  console.log(content)
  }}/>
  <br/>
  <div>
  <input  type="text"  onChange={(e)=>setTitle(e.target.value)}  placeholder="Title" style={{width:'80%',height:"5vh",marginBottom:"10px"}}/>
</div>
<div>
  <input  type="text"  onChange={(e)=>setSlug(e.target.value)}  placeholder="Slug" style={{width:'80%',height:"5vh"}}/>
</div>
  <button  className='but' onClick={PostToken}>Post</button>


  </div>
  :
  <div className="login-box">
  <p>Login</p>
  <form  >
    <div className="user-box">
      <input required="" name="" type="text"  onChange={(e)=>setName(e.target.value)}/>
      <label>username</label>
    </div>
    <div className="user-box"> 
      <input required="" name="" type="password"  onChange={(e)=>setPassword(e.target.value)}/>
      <label>Password</label>
    </div>


    <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    <button  onClick={Login}> Submit</button>  
    </a>
  </form>
</div>}

    </div>
  )
}

export default Wordpress


// // "proxy":"http://bestbookhub.com/",