import React from 'react';
import axios from "axios";
import { useRef,useState,useEffect } from 'react'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Password = () => {
    const [data,setData]=useState({site:"",username:"",password:""});
    const [savePassword,setSavePassword]=useState([]);
    useEffect(() => {
      axios.get("http://localhost:5000/passwords")
      .then((response) => setSavePassword(response.data))
      .catch((error) => console.error("Error fetching data:", error));
    }, []);
    function handleAdd(){
      axios.post("http://localhost:5000/passwords", data)
      .then(() => {
        setSavePassword([...savePassword, data]);
        setData({ site: "", username: "", password: "" });
        toast.success("Password added successfully");
      })
      .catch((error) => console.error("Error adding password:", error));
    }
    function handleChange(e){
        setData({...data,[e.target.name]:e.target.value});
    }
    const [isHidden,setIsHidden]=useState(true);
    function handleClick(){
        setIsHidden(!isHidden);
    }
    function handleCopy(item){
      navigator.clipboard.writeText(item);
    }
    function handleDelete(itemToDelete) {
      axios.delete(`http://localhost:5000/passwords/${itemToDelete._id}`)
      .then(() => {
        setSavePassword(savePassword.filter((pass) => pass._id !== itemToDelete._id));
        toast.success("Password deleted successfully");
      })
      .catch((error) => console.error("Error deleting password:", error));
    }
    
    function handleEdit(itemEdit){
      setData({ site: itemEdit.site, username: itemEdit.username, password: itemEdit.password });
    handleDelete(itemEdit); 
    }
  return (
    <div className="flex p-2 min-w-[720px] max-w-[720px] min-h-[610px] max-h-[610px]  justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
  <div className="bg-white min-w-[710px] max-w-[710px] min-h-[600px] max-h-[600px] shadow-2xl rounded-3xl p-10 flex flex-col">
    <div className="text-black flex flex-col gap-6 items-center justify-center mb-10">
      <h1 className="text-3xl font-semibold text-indigo-700 mb-4">PassManage</h1>
      
      <div className="w-full space-y-4">
        <input
          onChange={handleChange}
          value={data.site}
          name="site"
          className="w-full p-4 rounded-xl border-2 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Enter Website URL"
        />
        <div className="flex gap-6">
          <input
            onChange={handleChange}
            value={data.username}
            name="username"
            className="w-1/2 p-4 rounded-xl border-2 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Enter Username"
          />
          <div className="relative w-1/2">
            <input
              onChange={handleChange}
              value={data.password}
              name="password"
              className="w-full p-4 rounded-xl border-2 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type={isHidden ? "password" : "text"}
              placeholder="Enter Password"
            />
            <img
              onClick={handleClick}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              width={20}
              src={isHidden ? "../../public/hide.png" : "../../public/show.png"}
              alt="toggle visibility"
            />
          </div>
        </div>
        
        <button
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 rounded-xl hover:bg-indigo-700 focus:outline-none active:scale-95 active:opacity-105"
        >
          Add Password
        </button>
      </div>
    </div>
    
   <div className=" max-h-[900px] max-w-[1000px] overflow-auto scrollbar-hide">
   <table class="table-auto w-full border-collapse border border-gray-300 text-sm text-left shadow-lg rounded-lg overflow-hidden">
  <thead class="bg-indigo-600 text-white">
    <tr>
      <th class="px-6 py-4">Website URL</th>
      <th class="px-6 py-4">Username</th>
      <th class="px-6 py-4">Password</th>
      <th class="px-6 py-4">Actions</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200">
  
  
  {savePassword.map((item, index) => {
  return (
    <tr key={index} className="hover:bg-indigo-50 transition-colors">
     
      <td class="px-6 py-4">
      <div className='flex items-center gap-3'>
        <a href={item.site} target="_blank"><span>{item.site}</span></a>
        <img onClick={()=>{handleCopy(item.site);
           toast.success("Copied to clipboard");
        }}className="w-5 h-5 cursor-pointer" src='../../public/copy_10573585.png'/>
      </div>
      </td>
      <td class="px-6 py-4">
      <div className='flex items-center gap-3'>
        <span>{item.username}</span>
        <img onClick={()=>{handleCopy(item.username);
          toast.success("Copied to clipboard");
        }}className="w-5 h-5 cursor-pointer" src='../../public/copy_10573585.png'/>
      </div>
      </td>
      <td class="px-6 py-4">
      <div className='flex items-center gap-3'>
        <span>{item.password}</span>
        <img onClick={()=>{handleCopy(item.password);
           toast.success("Copied to clipboard");
        }}className="w-5 h-5 cursor-pointer" src='../../public/copy_10573585.png'/>
      </div>
      </td>
      <td>
        <div className='flex gap-7'>
        <img onClick={()=>handleDelete(item)} className='h-7 w-7 cursor-pointer' src="../../public/bin.png" alt="Delete" />
        <img onClick={()=>handleEdit(item)} className='h-7 w-7 cursor-pointer'src="../../public/editing.png" alt="Edit"/>
        </div>
        
      </td>
   
  </tr>
  )
})}
    
    
    
  </tbody>
</table>

   </div>

    </div>
    <ToastContainer 
        style={{
          top: "50px",   
          right: "30px", 
        }}
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="light"
      />
  </div>

  
  )
}

export default Password
